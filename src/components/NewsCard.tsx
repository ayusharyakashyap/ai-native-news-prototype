import { useState } from 'react'
import type { ArticleQaItem, NewsInsight, RankedArticle } from '../types'

interface NewsCardProps {
  rankedArticle: RankedArticle
  insight?: NewsInsight
  onOpenBriefing: () => void
  onAskQuestion: (articleId: string, question: string) => Promise<string>
  history: ArticleQaItem[]
}

export function NewsCard({ rankedArticle, insight, onOpenBriefing, onAskQuestion, history }: NewsCardProps) {
  const { article } = rankedArticle
  const [question, setQuestion] = useState('')
  const [isAsking, setIsAsking] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')

  const submitQuestion = async (rawQuestion?: string) => {
    const nextQuestion = (rawQuestion ?? question).trim()
    if (!nextQuestion) {
      setStatusMessage('Please type a question first.')
      return
    }

    setIsAsking(true)
    setStatusMessage('')

    try {
      const answer = await onAskQuestion(article.id, nextQuestion)
      if (answer.trim()) {
        setQuestion('')
      }
      setStatusMessage('Answer generated.')
    } catch {
      setStatusMessage('Could not generate an answer right now. Try again.')
    } finally {
      setIsAsking(false)
    }
  }

  return (
    <article className={`news-card ${insight ? '' : 'pending'}`}>
      <div className="news-header">
        <div>
          <p className="card-eyebrow">{rankedArticle.decisionLens}</p>
          <p className="source">{article.source} • {new Date(article.publishedAt).toLocaleDateString()}</p>
        </div>
        <span className="priority-pill">{rankedArticle.priorityLabel}</span>
      </div>

      <div className="headline-row">
        <h3>{article.title}</h3>
        <a className="inline-link" href={article.url} target="_blank" rel="noreferrer">Source</a>
      </div>

      <p className="deck-copy">{article.deck}</p>

      <div className="insight-block highlight">
        <p className="block-title">Why this ranked for you</p>
        <div className="reason-list">
          {rankedArticle.rankingReasons.map((reason) => (
            <div key={reason.label} className="reason-item">
              <strong>{reason.label}</strong>
              <p>{reason.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {insight ? (
        <>
          <p className="summary">{insight.summary}</p>

          <div className="meta-row">
            <span className={`badge sentiment ${insight.sentiment.toLowerCase()}`}>{insight.sentiment}</span>
            <span className={`badge impact ${insight.impactLevel.toLowerCase()}`}>Impact: {insight.impactLevel}</span>
            <span className="signal-chip">Signal: {insight.signalStrength.label} ({insight.signalStrength.score})</span>
            <span className="trend">Trend: {insight.trend === 'up' ? '↑' : insight.trend === 'down' ? '↓' : '→'}</span>
          </div>

          <div className="insight-block">
            <p className="block-title">Evidence pulled from source</p>
            <div className="evidence-list compact">
              {article.evidence.map((item) => (
                <div key={item.label} className="evidence-item">
                  <strong>{item.label}</strong>
                  <p>{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="insight-block">
            <p className="block-title">Key takeaways</p>
            <ul>
              {insight.keyInsights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="insight-block accent">
            <p className="block-title">Why this matters to you</p>
            <p>{insight.whyItMatters}</p>
          </div>

          <div className="insight-block">
            <p className="block-title">Next move</p>
            <p>{insight.opportunity}</p>
          </div>

          <div className="prompt-row">
            {insight.followUpPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                className="prompt-chip"
                onClick={() => void submitQuestion(prompt)}
                disabled={isAsking}
              >
                {prompt}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="loading-block">
          <p className="block-title">Briefing in progress</p>
          <p>We already ranked this story for you. The evidence-backed summary and prompts are drafting now.</p>
        </div>
      )}

      <div className="card-actions">
        <button type="button" className="ghost-btn" onClick={onOpenBriefing} disabled={!insight}>
          {insight ? 'Open Full Briefing' : 'Drafting Briefing...'}
        </button>
      </div>

      <div className="qa-box">
        <p className="block-title">Ask AI about this brief</p>
        <div className="qa-input-row">
          <input
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="Ask a decision-focused follow-up..."
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !isAsking) {
                event.preventDefault()
                void submitQuestion()
              }
            }}
          />
          <button type="button" onClick={() => void submitQuestion()} disabled={isAsking || !question.trim()}>
            {isAsking ? 'Thinking...' : 'Ask'}
          </button>
        </div>
        {statusMessage && <p className="qa-status">{statusMessage}</p>}
        {history.length > 0 && (
          <div className="qa-history">
            {history.slice(-2).map((item, index) => (
              <div key={`${item.question}-${index}`} className="qa-item">
                <p><strong>Q:</strong> {item.question}</p>
                <p><strong>A:</strong> {item.answer}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
