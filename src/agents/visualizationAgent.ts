import type { ImpactLevel, NewsArticle, Sentiment } from '../types'

export function detectSentiment(article: NewsArticle): Sentiment {
  const text = `${article.deck} ${article.content}`.toLowerCase()
  const positiveSignals = ['stronger', 'outperformed', 'supportive', 'growth', 'improved', 'accelerated', 'healthier']
  const negativeSignals = ['volatility', 'risk', 'selective', 'cautious', 'pressure', 'constraint']

  const positiveScore = positiveSignals.filter((signal) => text.includes(signal)).length
  const negativeScore = negativeSignals.filter((signal) => text.includes(signal)).length

  if (positiveScore > negativeScore) {
    return 'Positive'
  }

  if (negativeScore > positiveScore) {
    return 'Negative'
  }

  return 'Neutral'
}

export function detectImpactLevel(article: NewsArticle): ImpactLevel {
  if (
    article.category === 'Economy'
    || article.category === 'Policy'
    || article.tags.some((tag) => ['RBI', 'Budget', 'Markets'].includes(tag))
  ) {
    return 'High'
  }

  if (article.tags.some((tag) => ['AI', 'Startups', 'Infrastructure', 'Semiconductors'].includes(tag))) {
    return 'Medium'
  }

  return 'Low'
}

export function detectTrend(sentiment: Sentiment): 'up' | 'down' | 'flat' {
  if (sentiment === 'Positive') {
    return 'up'
  }

  if (sentiment === 'Negative') {
    return 'down'
  }

  return 'flat'
}
