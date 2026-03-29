import { useEffect, useMemo, useState } from 'react'
import { answerNewsQuestionAgent, fetchNewsAgent, generateInsightsAgent, personalizeNewsFeed } from './agents'
import { BriefingView } from './components/BriefingView'
import { NewsCard } from './components/NewsCard'
import { ProfileOnboarding } from './components/ProfileOnboarding'
import { clearProfile, loadProfile, saveProfile } from './utils/storage'
import type { ArticleQaItem, NewsInsight, RankedArticle, UserProfile } from './types'

const MAX_VISIBLE_BRIEFS = 8

interface FeedSection {
  lens: string
  summary: string
  items: RankedArticle[]
}

function App() {
  const [profile, setProfile] = useState<UserProfile | null>(() => loadProfile())
  const [feed, setFeed] = useState<RankedArticle[]>([])
  const [insights, setInsights] = useState<Record<string, NewsInsight>>({})
  const [qaHistory, setQaHistory] = useState<Record<string, ArticleQaItem[]>>({})
  const [isPreparingFeed, setIsPreparingFeed] = useState(false)
  const [isGeneratingInsights, setIsGeneratingInsights] = useState(false)
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null)

  useEffect(() => {
    if (!profile) {
      return
    }

    let isCancelled = false

    const run = async () => {
      setIsPreparingFeed(true)
      setIsGeneratingInsights(false)
      setFeed([])
      setInsights({})
      setQaHistory({})
      setSelectedArticleId(null)

      try {
        const fetchedArticles = await fetchNewsAgent()
        if (isCancelled) {
          return
        }

        const personalized = personalizeNewsFeed(profile, fetchedArticles)
        const curated = curateTopBriefs(personalized)
        setFeed(curated)
        setIsPreparingFeed(false)

        if (!curated.length) {
          return
        }

        setIsGeneratingInsights(true)
        const pendingIds = new Set(curated.map(({ article }) => article.id))

        curated.forEach(({ article }) => {
          void generateInsightsAgent(article, profile)
            .then((insight) => {
              if (isCancelled) {
                return
              }

              setInsights((previous) => ({
                ...previous,
                [article.id]: insight,
              }))
            })
            .finally(() => {
              pendingIds.delete(article.id)
              if (!isCancelled && pendingIds.size === 0) {
                setIsGeneratingInsights(false)
              }
            })
        })
      } catch {
        if (!isCancelled) {
          setIsPreparingFeed(false)
          setIsGeneratingInsights(false)
        }
      }
    }

    void run()

    return () => {
      isCancelled = true
    }
  }, [profile])

  const feedSections = useMemo<FeedSection[]>(() => {
    const grouped = new Map<string, FeedSection>()

    feed.forEach((item) => {
      const existing = grouped.get(item.decisionLens)
      if (existing) {
        existing.items.push(item)
        return
      }

      grouped.set(item.decisionLens, {
        lens: item.decisionLens,
        summary: item.lensSummary,
        items: [item],
      })
    })

    return Array.from(grouped.values())
  }, [feed])

  const selectedFeedItem = useMemo(
    () => feed.find((item) => item.article.id === selectedArticleId) ?? null,
    [feed, selectedArticleId],
  )

  const selectedInsight = selectedFeedItem ? insights[selectedFeedItem.article.id] : null
  const readyInsightCount = Object.keys(insights).length
  const leadBrief = feed[0] ?? null

  const completeOnboarding = (nextProfile: UserProfile) => {
    saveProfile(nextProfile)
    setProfile(nextProfile)
  }

  const resetProfile = () => {
    clearProfile()
    setProfile(null)
    setFeed([])
    setInsights({})
    setQaHistory({})
    setSelectedArticleId(null)
  }

  const askQuestion = async (articleId: string, question: string) => {
    if (!profile) {
      return 'Profile not found. Please refresh and build your briefing again.'
    }

    const article = feed.find((item) => item.article.id === articleId)?.article
    if (!article) {
      return 'Could not locate the selected article. Please try another brief.'
    }

    let answer = ''

    try {
      answer = await answerNewsQuestionAgent(article, profile, question)
    } catch {
      answer = `I could not reach the AI endpoint right now. For your ${profile.role.toLowerCase()} profile, keep watching ${article.tags[0]} and reassess once the next concrete update lands.`
    }

    if (!answer.trim()) {
      answer = `For your ${profile.role.toLowerCase()} profile, this matters because it can change near-term decisions around ${article.tags[0]}. Watch ${article.entities[0]} and reassess when the next evidence point arrives.`
    }

    setQaHistory((previous) => ({
      ...previous,
      [articleId]: [...(previous[articleId] ?? []), { question, answer }],
    }))

    return answer
  }

  if (!profile) {
    return <ProfileOnboarding onComplete={completeOnboarding} />
  }

  return (
    <main className="page">
      <header className="top-bar">
        <div>
          <p className="kicker">My ET • Decision Briefing Engine</p>
          <h1>Personalized Intelligence Briefing</h1>
          <p className="subtext">
            Role: {profile.role} • Goal: {profile.primaryGoal} • Horizon: {profile.focusHorizon} • Risk: {profile.riskAppetite}
          </p>
        </div>
        <div className="top-actions">
          <button type="button" className="ghost-btn" onClick={resetProfile}>Edit Profile</button>
        </div>
      </header>

      <section className="briefing-hero">
        <div className="briefing-intro">
          <p className="section-eyebrow">Today&apos;s newsroom, tuned to you</p>
          <h2>{leadBrief ? leadBrief.decisionLens : 'Building your briefing'}</h2>
          <p>
            {leadBrief
              ? leadBrief.lensSummary
              : 'We are ranking the feed, pulling evidence, and drafting actionable briefings instead of generic article cards.'}
          </p>
          {leadBrief && (
            <div className="lead-brief">
              <span className="lead-pill">Lead brief</span>
              <p>{leadBrief.article.title}</p>
            </div>
          )}
        </div>

        <div className="hero-stats">
          <div className="stat-card">
            <span>Decision lenses</span>
            <strong>{feedSections.length}</strong>
          </div>
          <div className="stat-card">
            <span>Briefs ready</span>
            <strong>{readyInsightCount}/{feed.length || 0}</strong>
          </div>
          <div className="stat-card">
            <span>Live status</span>
            <strong>{isPreparingFeed ? 'Ranking' : isGeneratingInsights ? 'Drafting' : 'Ready'}</strong>
          </div>
        </div>
      </section>

      {isPreparingFeed && (
        <section className="status-banner">
          <p>Ranking stories against your profile and grouping them into decision briefs...</p>
        </section>
      )}

      {!isPreparingFeed && isGeneratingInsights && (
        <section className="status-banner subtle">
          <p>Briefs are loading progressively. You can already read ranked stories while the deeper analysis finishes.</p>
        </section>
      )}

      {!isPreparingFeed && selectedFeedItem && selectedInsight ? (
        <BriefingView
          rankedArticle={selectedFeedItem}
          insight={selectedInsight}
          onClose={() => setSelectedArticleId(null)}
        />
      ) : (
        <div className="feed-sections">
          {feedSections.map((section) => (
            <section className="feed-section" key={section.lens}>
              <div className="feed-section-header">
                <div>
                  <p className="section-eyebrow">Decision lens</p>
                  <h2>{section.lens}</h2>
                </div>
                <p>{section.summary}</p>
              </div>

              <div className="feed-grid">
                {section.items.map((item) => (
                  <NewsCard
                    key={item.article.id}
                    rankedArticle={item}
                    insight={insights[item.article.id]}
                    onOpenBriefing={() => setSelectedArticleId(item.article.id)}
                    onAskQuestion={askQuestion}
                    history={qaHistory[item.article.id] ?? []}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </main>
  )
}

function curateTopBriefs(items: RankedArticle[]) {
  if (items.length <= MAX_VISIBLE_BRIEFS) {
    return items
  }

  const picked: RankedArticle[] = []
  const usedLens = new Set<string>()

  for (const item of items) {
    if (!usedLens.has(item.decisionLens)) {
      picked.push(item)
      usedLens.add(item.decisionLens)
    }

    if (picked.length >= Math.min(4, MAX_VISIBLE_BRIEFS)) {
      break
    }
  }

  for (const item of items) {
    if (picked.some((existing) => existing.article.id === item.article.id)) {
      continue
    }
    picked.push(item)
    if (picked.length >= MAX_VISIBLE_BRIEFS) {
      break
    }
  }

  return picked
}

export default App
