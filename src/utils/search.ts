import { allDomains } from '../data/domains'
import { allResources } from '../data/resources'
import { goalRoadmaps } from '../data/roadmaps'
import { nithClubs } from '../data/nith'

export interface SearchResultItem {
  id: string
  title: string
  subtitle: string
  category: 'domain' | 'resource' | 'roadmap' | 'nith'
  url: string
  targetId?: string
  tags?: string[]
}

const MAX_RESULTS = 15

const clip = (text: string, max: number) => (text.length > max ? `${text.slice(0, max).trimEnd()}…` : text)

/**
 * Scores how well `tokens` match a record's fields. Every token must match
 * somewhere (so "react roadmap" narrows instead of matching nothing), and
 * matches in the title count far more than matches in descriptions.
 * `fields` is ordered most-important first.
 */
const score = (tokens: string[], fields: (string | undefined)[]): number => {
  const hay = fields.map((f) => (f ?? '').toLowerCase())
  let total = 0
  for (const token of tokens) {
    let best = 0
    hay.forEach((h, i) => {
      if (!h.includes(token)) return
      const weight = Math.max(1, 10 - i * 3) // field 0 → 10, 1 → 7, 2 → 4, rest → 1
      const startsWord = h.startsWith(token) || h.includes(` ${token}`)
      best = Math.max(best, weight + (startsWord ? 3 : 0) + (i === 0 && h === token ? 5 : 0))
    })
    if (best === 0) return 0
    total += best
  }
  return total
}

export const searchAllItems = (query: string): SearchResultItem[] => {
  const tokens = query.trim().toLowerCase().split(/\s+/).filter(Boolean)
  if (tokens.length === 0) return []

  const scored: { item: SearchResultItem; s: number }[] = []

  for (const domain of allDomains) {
    const s = score(tokens, [
      domain.name,
      domain.coreTechnologies.map((t) => t.name).join(' '),
      domain.category,
      domain.shortDescription,
    ])
    if (s > 0) {
      scored.push({
        s: s + 2, // domains get a small edge: they're the main way into the guide
        item: {
          id: `domain-${domain.id}`,
          title: domain.name,
          subtitle: `${domain.category.toUpperCase()} • ${domain.difficulty} • ${clip(domain.shortDescription, 75)}`,
          category: 'domain',
          url: `/domain/${domain.id}`,
          targetId: domain.id,
        },
      })
    }
  }

  for (const resource of allResources) {
    const s = score(tokens, [
      resource.title,
      resource.creator,
      (resource.tags ?? []).join(' '),
      resource.topic,
      resource.domain,
    ])
    if (s > 0) {
      scored.push({
        s,
        item: {
          id: `resource-${resource.id}`,
          title: resource.title,
          subtitle: `Resource by ${resource.creator} (${resource.type.toUpperCase()}) • ${resource.domain}`,
          category: 'resource',
          url: resource.url,
          tags: resource.tags,
        },
      })
    }
  }

  for (const roadmap of goalRoadmaps) {
    const s = score(tokens, [roadmap.title, roadmap.targetRole, roadmap.description])
    if (s > 0) {
      scored.push({
        s,
        item: {
          id: `roadmap-${roadmap.id}`,
          title: roadmap.title,
          subtitle: `Roadmap: ${roadmap.targetRole} (${roadmap.duration})`,
          category: 'roadmap',
          // open the matching roadmap, not always the first tab
          url: `/roadmaps?roadmap=${roadmap.id}`,
        },
      })
    }
  }

  for (const club of nithClubs) {
    const s = score(tokens, [club.name, club.fullName, club.focusAreas.join(' '), club.description])
    if (s > 0) {
      scored.push({
        s,
        item: {
          id: `nith-${club.id}`,
          title: club.fullName || club.name,
          subtitle: `NITH ${club.type.replace(/_/g, ' ').toUpperCase()} • ${clip(club.description, 70)}`,
          category: 'nith',
          url: `/nith-ecosystem`,
        },
      })
    }
  }

  return scored
    .sort((a, b) => b.s - a.s)
    .slice(0, MAX_RESULTS)
    .map((x) => x.item)
}
