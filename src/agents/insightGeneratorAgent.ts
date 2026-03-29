import type {
  NewsArticle,
  NewsInsight,
  RelatedCoverageItem,
  SignalStrength,
  UserProfile,
} from '../types'
import { explainWhyItMatters } from './personalizationAgent'
import { detectImpactLevel, detectSentiment, detectTrend } from './visualizationAgent'

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY

export async function generateInsightsAgent(article: NewsArticle, profile: UserProfile): Promise<NewsInsight> {
  const llmResult = OPENAI_API_KEY
    ? await generateWithLlm(article, profile).catch(() => null)
    : null

  const sentiment = detectSentiment(article)
  const impactLevel = detectImpactLevel(article)

  return {
    articleId: article.id,
    summary: llmResult?.summary ?? generateSummary(article, profile),
    keyInsights: llmResult?.keyInsights ?? generateKeyInsights(article),
    whyItMatters: llmResult?.whyItMatters ?? explainWhyItMatters(profile, article),
    futureOutlook: llmResult?.futureOutlook ?? generateOutlook(article),
    sentiment,
    impactLevel,
    signalStrength: buildSignalStrength(article, impactLevel),
    trend: detectTrend(sentiment),
    opportunity: generateOpportunity(profile),
    eli15: llmResult?.eli15 ?? generateEli15(article),
    storyArc: buildStoryArc(article),
    followUpPrompts: buildFollowUpPrompts(article, profile),
  }
}

export async function answerNewsQuestionAgent(
  article: NewsArticle,
  profile: UserProfile,
  question: string,
): Promise<string> {
  if (OPENAI_API_KEY) {
    const aiAnswer = await answerQuestionWithLlm(article, profile, question).catch(() => null)
    if (aiAnswer) {
      return aiAnswer
    }
  }

  return `For your ${profile.role.toLowerCase()} profile, the practical read is: ${explainWhyItMatters(profile, article)} If you only track one thing next, watch ${article.entities[0]} and whether the evidence around ${article.tags[0]} strengthens over the next 1-2 reporting cycles.`
}

function generateSummary(article: NewsArticle, profile: UserProfile) {
  const styleLead =
    profile.newsPace === 'Quick Bites'
      ? 'Quick brief:'
      : profile.newsPace === 'Deep Dives'
        ? 'Decision brief:'
        : 'Personalized read:'

  return `${styleLead} ${article.deck} ${article.evidence[0]?.value ?? 'The update is material enough to watch closely.'}`
}

function generateKeyInsights(article: NewsArticle) {
  return article.evidence.map(({ label, value }) => `${label}: ${value}`)
}

function generateOutlook(article: NewsArticle) {
  return `If the current pattern holds, ${article.topic.toLowerCase()} should stay important for the next 1-2 quarters, with execution quality deciding whether the theme strengthens or fades.`
}

function generateOpportunity(profile: UserProfile) {
  if (profile.role === 'Investor') {
    return `Convert this into a watchlist note: what confirms the trend, what breaks it, and which related names or sectors should move onto your radar.`
  }

  if (profile.role === 'Founder') {
    return `Translate the signal into one operating move this week: sharpen your narrative, update buyer messaging, or revisit pipeline assumptions.`
  }

  if (profile.role === 'Student') {
    return `Turn this story into a one-minute explanation you could use in an interview or class discussion, then connect it to one business framework.`
  }

  return `Use the brief to update one planning assumption, one stakeholder conversation, and one item on your next review agenda.`
}

function generateEli15(article: NewsArticle) {
  return `Imagine you are following a tournament table. ${article.topic} is the team you care about, and this article tells you whether it just gained momentum, lost balance, or stayed steady and why that matters next.`
}

function buildSignalStrength(article: NewsArticle, impactLevel: NewsInsight['impactLevel']): SignalStrength {
  let score = 42
  const reasons: string[] = []
  const hoursOld = Math.max(1, (Date.now() - new Date(article.publishedAt).getTime()) / (1000 * 60 * 60))

  if (hoursOld <= 12) {
    score += 18
    reasons.push('Fresh coverage from the last 12 hours.')
  } else if (hoursOld <= 36) {
    score += 10
    reasons.push('Recent enough to shape near-term decisions.')
  } else {
    reasons.push('Better suited as context than a breaking trigger.')
  }

  if (impactLevel === 'High') {
    score += 16
    reasons.push('Touches high-impact policy, rate, or market allocation decisions.')
  } else if (impactLevel === 'Medium') {
    score += 9
    reasons.push('Meaningful for sector or business planning, even if not market-wide.')
  } else {
    score += 4
    reasons.push('Narrower in immediate scope, so this is more of a watch signal.')
  }

  if (article.evidence.length >= 3) {
    score += 8
    reasons.push('Backed by multiple concrete evidence points in the story.')
  }

  if (article.relatedCoverage.length >= 2) {
    score += 8
    reasons.push('Part of an ongoing coverage arc rather than a one-off headline.')
  }

  if (article.entities.length >= 3) {
    score += 5
    reasons.push('Several stakeholder groups are affected, increasing decision relevance.')
  }

  const boundedScore = Math.min(95, Math.max(35, Math.round(score)))

  return {
    score: boundedScore,
    label: boundedScore >= 80 ? 'High conviction' : boundedScore >= 62 ? 'Actionable' : 'Monitor',
    reasons: reasons.slice(0, 3),
  }
}

function buildStoryArc(article: NewsArticle): RelatedCoverageItem[] {
  return [
    ...article.relatedCoverage,
    {
      date: article.publishedAt.slice(0, 10),
      headline: article.title,
      source: article.source,
      takeaway: article.deck,
      url: article.url,
    },
  ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}

function buildFollowUpPrompts(article: NewsArticle, profile: UserProfile) {
  if (profile.role === 'Investor') {
    return [
      `What would confirm this signal before I act?`,
      `Which sectors or companies should I watch because of ${article.tags[0]}?`,
      `What is the downside case if this trend reverses?`,
    ]
  }

  if (profile.role === 'Founder') {
    return [
      `How should this change my product or GTM narrative?`,
      `What customer behavior should I watch next because of this update?`,
      `How would I explain this trend to investors or my team?`,
    ]
  }

  if (profile.role === 'Student') {
    return [
      `Can you explain this using a simple business framework?`,
      `What interview-ready takeaway should I remember from this story?`,
      `What business terms in this article should I understand better?`,
    ]
  }

  return [
    `What decision should a business leader revisit because of this story?`,
    `What should I monitor over the next two weeks?`,
    `What is the clearest practical takeaway from this update?`,
  ]
}

async function generateWithLlm(article: NewsArticle, profile: UserProfile) {
  const prompt = `You are helping turn business news into a decision briefing.\nArticle title: ${article.title}\nArticle deck: ${article.deck}\nArticle body: ${article.content}\nEvidence points: ${article.evidence.map((item) => `${item.label}: ${item.value}`).join(' | ')}\nUser profile: role=${profile.role}, interests=${profile.interests.join(', ')}, risk=${profile.riskAppetite}, goal=${profile.primaryGoal}, experience=${profile.experienceLevel}, pace=${profile.newsPace}, horizon=${profile.focusHorizon}.\nReturn:\n1. One short personalized summary\n2. Three evidence-grounded key insights as bullet points\n3. One paragraph on why this matters to this user\n4. One forward-looking sentence\n5. One ELI15 explanation\nStay concrete and do not invent facts.`

  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4.1-mini',
      input: prompt,
      temperature: 0.2,
    }),
  })

  if (!response.ok) {
    throw new Error('LLM request failed')
  }

  const data = await response.json()
  const outputText: string = data.output_text ?? ''
  const lines = outputText
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

  const keyInsights = lines
    .filter((line) => line.startsWith('-') || line.startsWith('•'))
    .slice(0, 3)
    .map((line) => line.replace(/^[-•]\s*/, '').trim())

  return {
    summary: lines[0] ?? '',
    keyInsights,
    whyItMatters: lines.find((line) => /matters|because|for you/i.test(line)) ?? '',
    futureOutlook: lines.find((line) => /outlook|watch|next/i.test(line)) ?? '',
    eli15: lines.find((line) => /eli15|15|simple|like you.?re 15/i.test(line)) ?? '',
  }
}

async function answerQuestionWithLlm(
  article: NewsArticle,
  profile: UserProfile,
  question: string,
): Promise<string> {
  const prompt = `Article title: ${article.title}\nArticle body: ${article.content}\nEvidence: ${article.evidence.map((item) => item.value).join(' | ')}\nUser: role=${profile.role}, interests=${profile.interests.join(', ')}, risk=${profile.riskAppetite}, goal=${profile.primaryGoal}, experience=${profile.experienceLevel}, pace=${profile.newsPace}, horizon=${profile.focusHorizon}\nQuestion: ${question}\nAnswer in no more than four short lines. Stay evidence-grounded and practical.`

  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4.1-mini',
      input: prompt,
      temperature: 0.2,
    }),
  })

  if (!response.ok) {
    throw new Error('Q&A request failed')
  }

  const data = await response.json()
  return data.output_text || ''
}
