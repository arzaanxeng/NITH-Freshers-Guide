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

export const searchAllItems = (query: string): SearchResultItem[] => {
  const cleanQuery = query.trim().toLowerCase()
  if (!cleanQuery) return []

  const results: SearchResultItem[] = []

  // Search Domains
  for (const domain of allDomains) {
    const match =
      domain.name.toLowerCase().includes(cleanQuery) ||
      domain.shortDescription.toLowerCase().includes(cleanQuery) ||
      domain.category.toLowerCase().includes(cleanQuery) ||
      domain.coreTechnologies.some(t => t.name.toLowerCase().includes(cleanQuery))

    if (match) {
      results.push({
        id: `domain-${domain.id}`,
        title: domain.name,
        subtitle: `${domain.category.toUpperCase()} • ${domain.difficulty} • ${domain.shortDescription.slice(0, 75)}...`,
        category: 'domain',
        url: `/domain/${domain.id}`,
        targetId: domain.id,
      })
    }
  }

  // Search Resources
  for (const resource of allResources) {
    const match =
      resource.title.toLowerCase().includes(cleanQuery) ||
      resource.creator.toLowerCase().includes(cleanQuery) ||
      resource.topic.toLowerCase().includes(cleanQuery) ||
      resource.domain.toLowerCase().includes(cleanQuery) ||
      (resource.tags && resource.tags.some(t => t.toLowerCase().includes(cleanQuery)))

    if (match) {
      results.push({
        id: `resource-${resource.id}`,
        title: resource.title,
        subtitle: `Resource by ${resource.creator} (${resource.type.toUpperCase()}) • ${resource.domain}`,
        category: 'resource',
        url: resource.url,
        tags: resource.tags,
      })
    }
  }

  // Search Roadmaps
  for (const roadmap of goalRoadmaps) {
    const match =
      roadmap.title.toLowerCase().includes(cleanQuery) ||
      roadmap.targetRole.toLowerCase().includes(cleanQuery) ||
      roadmap.description.toLowerCase().includes(cleanQuery)

    if (match) {
      results.push({
        id: `roadmap-${roadmap.id}`,
        title: roadmap.title,
        subtitle: `Roadmap: ${roadmap.targetRole} (${roadmap.duration})`,
        category: 'roadmap',
        url: `/roadmaps`,
      })
    }
  }

  // Search NITH Ecosystem
  for (const club of nithClubs) {
    const match =
      club.name.toLowerCase().includes(cleanQuery) ||
      (club.fullName && club.fullName.toLowerCase().includes(cleanQuery)) ||
      club.description.toLowerCase().includes(cleanQuery) ||
      club.focusAreas.some(f => f.toLowerCase().includes(cleanQuery))

    if (match) {
      results.push({
        id: `nith-${club.id}`,
        title: club.fullName || club.name,
        subtitle: `NITH ${club.type.replace('_', ' ').toUpperCase()} • ${club.description.slice(0, 70)}...`,
        category: 'nith',
        url: `/nith-ecosystem`,
      })
    }
  }

  return results.slice(0, 12)
}
