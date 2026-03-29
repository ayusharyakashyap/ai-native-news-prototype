export type UserRole = 'Student' | 'Investor' | 'Founder' | 'Professional'
export type RiskAppetite = 'Low' | 'Medium' | 'High'
export type PrimaryGoal = 'Wealth Building' | 'Career Learning' | 'Business Strategy' | 'Daily Awareness'
export type ExperienceLevel = 'Beginner' | 'Intermediate' | 'Advanced'
export type NewsPace = 'Quick Bites' | 'Balanced' | 'Deep Dives'
export type FocusHorizon = 'Short-term' | 'Medium-term' | 'Long-term'
export type Sentiment = 'Positive' | 'Neutral' | 'Negative'
export type ImpactLevel = 'Low' | 'Medium' | 'High'

export interface UserProfile {
  role: UserRole
  interests: string[]
  riskAppetite: RiskAppetite
  primaryGoal: PrimaryGoal
  experienceLevel: ExperienceLevel
  newsPace: NewsPace
  focusHorizon: FocusHorizon
}

export interface SourceEvidence {
  label: string
  value: string
}

export interface RelatedCoverageItem {
  date: string
  headline: string
  source: string
  takeaway: string
  url: string
}

export interface NewsArticle {
  id: string
  title: string
  deck: string
  source: string
  url: string
  publishedAt: string
  category: string
  tags: string[]
  content: string
  topic: string
  entities: string[]
  evidence: SourceEvidence[]
  relatedCoverage: RelatedCoverageItem[]
}

export interface RankingReason {
  label: string
  detail: string
}

export interface RankedArticle {
  article: NewsArticle
  score: number
  priorityLabel: string
  decisionLens: string
  lensSummary: string
  rankingReasons: RankingReason[]
}

export interface SignalStrength {
  score: number
  label: string
  reasons: string[]
}

export interface NewsInsight {
  articleId: string
  summary: string
  keyInsights: string[]
  whyItMatters: string
  futureOutlook: string
  sentiment: Sentiment
  impactLevel: ImpactLevel
  signalStrength: SignalStrength
  trend: 'up' | 'down' | 'flat'
  opportunity: string
  eli15: string
  storyArc: RelatedCoverageItem[]
  followUpPrompts: string[]
}

export interface ArticleQaItem {
  question: string
  answer: string
}
