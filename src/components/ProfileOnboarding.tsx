import { useState } from 'react'
import type {
  ExperienceLevel,
  FocusHorizon,
  NewsPace,
  PrimaryGoal,
  RiskAppetite,
  UserProfile,
  UserRole,
} from '../types'

const roles: UserRole[] = ['Student', 'Investor', 'Founder', 'Professional']
const interests = ['Stocks', 'Startups', 'Economy', 'Tech', 'Policy', 'AI']
const riskLevels: RiskAppetite[] = ['Low', 'Medium', 'High']
const primaryGoals: PrimaryGoal[] = ['Wealth Building', 'Career Learning', 'Business Strategy', 'Daily Awareness']
const experienceLevels: ExperienceLevel[] = ['Beginner', 'Intermediate', 'Advanced']
const newsPaces: NewsPace[] = ['Quick Bites', 'Balanced', 'Deep Dives']
const focusHorizons: FocusHorizon[] = ['Short-term', 'Medium-term', 'Long-term']

interface ProfileOnboardingProps {
  onComplete: (profile: UserProfile) => void
  initialProfile?: UserProfile
}

export function ProfileOnboarding({ onComplete, initialProfile }: ProfileOnboardingProps) {
  const [role, setRole] = useState<UserRole>(initialProfile?.role ?? 'Student')
  const [selectedInterests, setSelectedInterests] = useState<string[]>(initialProfile?.interests ?? ['Economy'])
  const [riskAppetite, setRiskAppetite] = useState<RiskAppetite>(initialProfile?.riskAppetite ?? 'Medium')
  const [primaryGoal, setPrimaryGoal] = useState<PrimaryGoal>(initialProfile?.primaryGoal ?? 'Daily Awareness')
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>(initialProfile?.experienceLevel ?? 'Beginner')
  const [newsPace, setNewsPace] = useState<NewsPace>(initialProfile?.newsPace ?? 'Balanced')
  const [focusHorizon, setFocusHorizon] = useState<FocusHorizon>(initialProfile?.focusHorizon ?? 'Medium-term')

  const toggleInterest = (interest: string) => {
    setSelectedInterests((current) =>
      current.includes(interest)
        ? current.filter((item) => item !== interest)
        : [...current, interest],
    )
  }

  const submit = () => {
    onComplete({
      role,
      interests: selectedInterests,
      riskAppetite,
      primaryGoal,
      experienceLevel,
      newsPace,
      focusHorizon,
    })
  }

  return (
    <div className="page profile-page">
      <div className="panel">
        <p className="kicker">My ET • Personalized Newsroom</p>
        <h1>Build Your Decision Briefing</h1>
        <p className="subtext">Give us 30 seconds. We will rank the newsroom, explain why stories matter to you, and turn articles into decision briefs.</p>

        <div className="field-block">
          <label>Role</label>
          <div className="chip-row">
            {roles.map((item) => (
              <button
                key={item}
                type="button"
                className={`chip ${role === item ? 'active' : ''}`}
                onClick={() => setRole(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="field-block">
          <label>Interests</label>
          <div className="chip-row">
            {interests.map((item) => (
              <button
                key={item}
                type="button"
                className={`chip ${selectedInterests.includes(item) ? 'active' : ''}`}
                onClick={() => toggleInterest(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="field-block">
          <label>Risk Appetite</label>
          <div className="chip-row">
            {riskLevels.map((item) => (
              <button
                key={item}
                type="button"
                className={`chip ${riskAppetite === item ? 'active' : ''}`}
                onClick={() => setRiskAppetite(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="field-block">
          <label>Primary Goal</label>
          <div className="chip-row">
            {primaryGoals.map((item) => (
              <button
                key={item}
                type="button"
                className={`chip ${primaryGoal === item ? 'active' : ''}`}
                onClick={() => setPrimaryGoal(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="field-block">
          <label>Experience Level</label>
          <div className="chip-row">
            {experienceLevels.map((item) => (
              <button
                key={item}
                type="button"
                className={`chip ${experienceLevel === item ? 'active' : ''}`}
                onClick={() => setExperienceLevel(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="field-block">
          <label>Briefing Style</label>
          <div className="chip-row">
            {newsPaces.map((item) => (
              <button
                key={item}
                type="button"
                className={`chip ${newsPace === item ? 'active' : ''}`}
                onClick={() => setNewsPace(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="field-block">
          <label>Decision Horizon</label>
          <div className="chip-row">
            {focusHorizons.map((item) => (
              <button
                key={item}
                type="button"
                className={`chip ${focusHorizon === item ? 'active' : ''}`}
                onClick={() => setFocusHorizon(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <button type="button" className="primary-btn" onClick={submit} disabled={!selectedInterests.length}>
          Build My Briefing
        </button>
      </div>
    </div>
  )
}
