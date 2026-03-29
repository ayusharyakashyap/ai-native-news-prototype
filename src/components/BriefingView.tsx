import type { NewsInsight, RankedArticle } from '../types'

interface BriefingViewProps {
  rankedArticle: RankedArticle
  insight: NewsInsight
  onClose: () => void
}

export function BriefingView({ rankedArticle, insight, onClose }: BriefingViewProps) {
  const { article } = rankedArticle
  const fullContextPoints = article.content
    .split('. ')
    .map((part) => part.trim())
    .filter(Boolean)

  return (
    <div className="briefing-view">
      <div className="briefing-header">
        <div>
          <p className="kicker">{rankedArticle.decisionLens}</p>
          <h2>{article.title}</h2>
          <p className="briefing-summary">{insight.summary}</p>
        </div>
        <div className="briefing-actions">
          <a className="ghost-btn link-btn" href={article.url} target="_blank" rel="noreferrer">Open Source</a>
          <button type="button" className="ghost-btn" onClick={onClose}>Back to Feed</button>
        </div>
      </div>

      <div className="briefing-stats">
        <div className="stat-card">
          <span>Priority</span>
          <strong>{rankedArticle.priorityLabel}</strong>
        </div>
        <div className="stat-card">
          <span>Signal strength</span>
          <strong>{insight.signalStrength.label} ({insight.signalStrength.score})</strong>
        </div>
        <div className="stat-card">
          <span>Impact</span>
          <strong>{insight.impactLevel}</strong>
        </div>
      </div>

      <div className="briefing-grid">
        <section className="briefing-card">
          <h4>Decision Brief</h4>
          <p className="briefing-deck">{article.deck}</p>
          <div className="reason-list">
            {fullContextPoints.map((point, index) => (
              <div key={`${point}-${index}`} className="reason-item">
                <p>{point.endsWith('.') ? point : `${point}.`}</p>
              </div>
            ))}
          </div>
          <p><strong>Coverage tags:</strong> {article.tags.join(', ')}</p>
          <p><strong>What to watch next:</strong> {insight.futureOutlook}</p>
          <p><strong>Recommended move:</strong> {insight.opportunity}</p>
        </section>

        <section className="briefing-card">
          <h4>Why It Ranked For You</h4>
          <div className="reason-list">
            {rankedArticle.rankingReasons.map((reason) => (
              <div key={reason.label} className="reason-item">
                <strong>{reason.label}</strong>
                <p>{reason.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="briefing-card">
          <h4>Evidence From Coverage</h4>
          <div className="evidence-list">
            {article.evidence.map((item) => (
              <div key={item.label} className="evidence-item">
                <strong>{item.label}</strong>
                <p>{item.value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="briefing-card">
          <h4>Related Coverage Arc</h4>
          <ol className="story-arc">
            {insight.storyArc.map((point) => (
              <li key={`${point.date}-${point.headline}`}>
                <p className="arc-date">{point.date}</p>
                <a href={point.url} target="_blank" rel="noreferrer">{point.headline}</a>
                <p>{point.source}</p>
                <p>{point.takeaway}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="briefing-card">
          <h4>Signal Strength Explained</h4>
          <div className="reason-list">
            {insight.signalStrength.reasons.map((reason) => (
              <div key={reason} className="reason-item">
                <p>{reason}</p>
              </div>
            ))}
          </div>
          <p><strong>Explain like I&apos;m 15:</strong> {insight.eli15}</p>
        </section>

        <section className="briefing-card">
          <h4>Entities And Next Questions</h4>
          <div className="entity-row">
            {article.entities.map((entity) => (
              <span className="badge neutral" key={entity}>{entity}</span>
            ))}
          </div>
          <div className="prompt-row static">
            {insight.followUpPrompts.map((prompt) => (
              <span key={prompt} className="prompt-chip static">{prompt}</span>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
