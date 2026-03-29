import type { UserProfile } from '../types'

const PROFILE_KEY = 'ai_native_news_profile'

export function saveProfile(profile: UserProfile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile))
}

export function loadProfile(): UserProfile | null {
  const raw = localStorage.getItem(PROFILE_KEY)
  if (!raw) {
    return null
  }

  try {
    const parsed = JSON.parse(raw) as Partial<UserProfile>
    return {
      role: parsed.role ?? 'Student',
      interests: parsed.interests ?? ['Economy'],
      riskAppetite: parsed.riskAppetite ?? 'Medium',
      primaryGoal: parsed.primaryGoal ?? 'Daily Awareness',
      experienceLevel: parsed.experienceLevel ?? 'Beginner',
      newsPace: parsed.newsPace ?? 'Balanced',
      focusHorizon: parsed.focusHorizon ?? 'Medium-term',
    }
  } catch {
    localStorage.removeItem(PROFILE_KEY)
    return null
  }
}

export function clearProfile() {
  localStorage.removeItem(PROFILE_KEY)
}
