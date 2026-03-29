import type { NewsArticle, RankedArticle, RankingReason, UserProfile } from '../types'

interface WeightedReason extends RankingReason {
  weight: number
}

const roleWeights: Record<UserProfile['role'], Record<string, number>> = {
  Investor: {
    Markets: 5,
    Economy: 5,
    Policy: 4,
    Tech: 4,
    Startups: 3,
  },
  Student: {
    Economy: 4,
    Tech: 4,
    Policy: 3,
    Startups: 3,
    Markets: 2,
  },
  Founder: {
    Startups: 5,
    Tech: 4,
    Economy: 3,
    Policy: 3,
    Markets: 2,
  },
  Professional: {
    Economy: 4,
    Markets: 4,
    Policy: 4,
    Tech: 3,
    Startups: 3,
  },
}

const goalWeights: Record<UserProfile['primaryGoal'], Record<string, number>> = {
  'Wealth Building': {
    Markets: 3,
    Economy: 3,
    Policy: 2,
    Tech: 2,
    Startups: 1,
  },
  'Career Learning': {
    Economy: 2,
    Tech: 2,
    Startups: 2,
    Policy: 2,
    Markets: 1,
  },
  'Business Strategy': {
    Startups: 3,
    Tech: 2,
    Policy: 2,
    Economy: 2,
    Markets: 1,
  },
  'Daily Awareness': {
    Economy: 2,
    Policy: 2,
    Markets: 2,
    Tech: 1,
    Startups: 1,
  },
}

export function personalizeNewsFeed(profile: UserProfile, articles: NewsArticle[]): RankedArticle[] {
  return articles
    .map((article) => {
      const { score, reasons } = scoreArticle(profile, article)

      return {
        article,
        score,
        priorityLabel: getPriorityLabel(score),
        decisionLens: getDecisionLens(profile, article),
        lensSummary: getDecisionLensSummary(profile, article),
        rankingReasons: reasons
          .sort((a, b) => b.weight - a.weight)
          .slice(0, 3)
          .map(({ label, detail }) => ({ label, detail })),
      }
    })
    .sort((a, b) => b.score - a.score)
}

function scoreArticle(profile: UserProfile, article: NewsArticle) {
  let score = 0
  const reasons: WeightedReason[] = []

  const roleWeight = roleWeights[profile.role][article.category] ?? 1
  score += roleWeight
  reasons.push({
    label: 'Role fit',
    detail: `${article.category} coverage is a strong match for a ${profile.role.toLowerCase()} profile.`,
    weight: roleWeight,
  })

  const goalWeight = goalWeights[profile.primaryGoal][article.category] ?? 0
  score += goalWeight
  if (goalWeight > 0) {
    reasons.push({
      label: 'Goal alignment',
      detail: `This story supports your goal of ${profile.primaryGoal.toLowerCase()} instead of serving as generic awareness.`,
      weight: goalWeight,
    })
  }

  const searchableText = [article.category, article.topic, ...article.tags, ...article.entities].join(' ').toLowerCase()
  const matchingInterests = profile.interests.filter((interest) => searchableText.includes(interest.toLowerCase()))
  const interestWeight = matchingInterests.length * 2.2
  score += interestWeight
  if (matchingInterests.length > 0) {
    reasons.push({
      label: 'Interest match',
      detail: `Direct overlap with your selected interests: ${matchingInterests.join(', ')}.`,
      weight: interestWeight,
    })
  }

  const hoursOld = Math.max(1, (Date.now() - new Date(article.publishedAt).getTime()) / (1000 * 60 * 60))
  const recencyBonus = Math.max(0, 14 - Math.floor(hoursOld))
  const recencyWeight = recencyBonus * getRecencyMultiplier(profile.focusHorizon)
  score += recencyWeight
  if (recencyWeight > 0.8) {
    reasons.push({
      label: 'Fresh signal',
      detail: `Published recently enough to matter for your ${profile.focusHorizon.toLowerCase()} decision horizon.`,
      weight: recencyWeight,
    })
  }

  if (profile.riskAppetite === 'High' && ['Tech', 'Markets', 'Startups'].includes(article.category)) {
    score += 1.1
    reasons.push({
      label: 'Risk appetite',
      detail: 'Higher-volatility themes are moved up because your profile accepts more variance.',
      weight: 1.1,
    })
  }

  if (profile.riskAppetite === 'Low' && ['Economy', 'Policy'].includes(article.category)) {
    score += 1.1
    reasons.push({
      label: 'Risk appetite',
      detail: 'Macro and policy updates rank higher because they support lower-risk decision making.',
      weight: 1.1,
    })
  }

  if (profile.experienceLevel === 'Beginner' && ['Economy', 'Policy'].includes(article.category)) {
    score += 0.8
    reasons.push({
      label: 'Learning curve',
      detail: 'This article offers clean business context without needing specialist market jargon.',
      weight: 0.8,
    })
  }

  if (profile.experienceLevel === 'Advanced' && ['Tech', 'Markets', 'Startups'].includes(article.category)) {
    score += 0.8
    reasons.push({
      label: 'Depth match',
      detail: 'You asked for higher-context material, so this more strategic theme ranks up.',
      weight: 0.8,
    })
  }

  if (profile.newsPace === 'Quick Bites' && article.evidence.length >= 3) {
    score += 0.6
    reasons.push({
      label: 'Briefing style',
      detail: 'This story compresses well into a fast evidence-led brief.',
      weight: 0.6,
    })
  }

  if (profile.newsPace === 'Deep Dives' && article.relatedCoverage.length >= 2) {
    score += 0.9
    reasons.push({
      label: 'Briefing depth',
      detail: 'There is enough surrounding coverage to support a deeper guided briefing.',
      weight: 0.9,
    })
  }

  return {
    score: Number(score.toFixed(1)),
    reasons,
  }
}

function getRecencyMultiplier(horizon: UserProfile['focusHorizon']) {
  if (horizon === 'Short-term') {
    return 0.45
  }

  if (horizon === 'Long-term') {
    return 0.18
  }

  return 0.28
}

function getPriorityLabel(score: number) {
  if (score >= 11) {
    return 'Immediate brief'
  }

  if (score >= 8.2) {
    return 'Worth watching'
  }

  return 'Background context'
}

function getDecisionLens(profile: UserProfile, article: NewsArticle) {
  if (profile.role === 'Investor') {
    if (['Economy', 'Policy'].includes(article.category)) {
      return 'Macro & Rate Radar'
    }

    if (article.category === 'Tech') {
      return 'Sector Rotation Watch'
    }

    return 'Portfolio Watchlist'
  }

  if (profile.role === 'Founder') {
    if (['Startups', 'Tech'].includes(article.category)) {
      return 'Growth & GTM Signals'
    }

    return 'Operating Environment'
  }

  if (profile.role === 'Student') {
    if (['Economy', 'Policy'].includes(article.category)) {
      return 'Concepts in Motion'
    }

    return 'Career Learning Radar'
  }

  if (['Economy', 'Policy'].includes(article.category)) {
    return 'Executive Context'
  }

  return 'Opportunity Scan'
}

function getDecisionLensSummary(profile: UserProfile, article: NewsArticle) {
  const lens = getDecisionLens(profile, article)

  if (lens === 'Macro & Rate Radar') {
    return 'Use these stories to calibrate timing, risk, and allocation before making portfolio moves.'
  }

  if (lens === 'Sector Rotation Watch') {
    return 'These are directional sector signals rather than broad market summaries.'
  }

  if (lens === 'Portfolio Watchlist') {
    return 'Keep these on a structured watchlist so action follows confirmation, not hype.'
  }

  if (lens === 'Growth & GTM Signals') {
    return 'These briefs connect market motion to product, fundraising, and buyer behavior.'
  }

  if (lens === 'Operating Environment') {
    return 'These updates change the conditions your company has to operate inside.'
  }

  if (lens === 'Concepts in Motion') {
    return `This is where ${article.category.toLowerCase()} becomes easier to explain, remember, and reuse in interviews.`
  }

  if (lens === 'Career Learning Radar') {
    return 'Track these stories to build practical business fluency, not just awareness.'
  }

  if (lens === 'Executive Context') {
    return 'These are the macro signals most likely to influence planning assumptions and stakeholder conversations.'
  }

  return 'These stories are useful because they hint at where attention should move next.'
}

export function explainWhyItMatters(profile: UserProfile, article: NewsArticle): string {
  if (profile.role === 'Investor') {
    return `This can reshape timing, sector allocation, or confirmation signals around ${article.tags[0]}. For your ${profile.focusHorizon.toLowerCase()} horizon, treat it as an input to a watchlist decision rather than a headline to react to immediately.`
  }

  if (profile.role === 'Founder') {
    return `This changes how you should read demand, product timing, or fundraising narrative in ${article.topic.toLowerCase()}. The practical question is not "is this interesting" but "what should change in roadmap, messaging, or buyer targeting because of it?"`
  }

  if (profile.role === 'Student') {
    return `This helps you convert abstract business theory into a real operating example. It is especially useful for ${profile.primaryGoal.toLowerCase()} because it shows how companies and markets react when ${article.topic.toLowerCase()} shifts.`
  }

  return `This matters because it changes the business context around ${article.category.toLowerCase()} decisions. We tuned the brief for a ${profile.experienceLevel.toLowerCase()} reader who prefers ${profile.newsPace.toLowerCase()} and makes ${profile.focusHorizon.toLowerCase()} calls.`
}
