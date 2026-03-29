import { mockNews } from '../data/mockNews'
import type { NewsArticle } from '../types'

export async function fetchNewsAgent(): Promise<NewsArticle[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockNews
}
