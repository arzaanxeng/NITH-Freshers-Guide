// Structural checks that don't need the network — catches broken
// references introduced when adding/editing domains, resources,
// roadmaps, or NITH clubs. Run this before verify-links (which does
// need the network and is slow) so obvious content bugs fail fast.

import { allDomains } from '../src/data/domains'
import { allResources } from '../src/data/resources'
import { goalRoadmaps } from '../src/data/roadmaps'
import { nithClubs } from '../src/data/nith'

const errors: string[] = []
const warnings: string[] = []

const domainIds = new Set(allDomains.map((d) => d.id))

// 1. Duplicate IDs (breaks routing / React keys / search de-dup)
function checkDuplicates(items: { id: string }[], label: string) {
  const seen = new Set<string>()
  for (const item of items) {
    if (seen.has(item.id)) errors.push(`Duplicate ${label} id: "${item.id}"`)
    seen.add(item.id)
  }
}
checkDuplicates(allDomains, 'domain')
checkDuplicates(allResources, 'resource')
checkDuplicates(goalRoadmaps, 'roadmap')
checkDuplicates(nithClubs, 'NITH club')

// 2. Every resource must point at a domain that actually exists
for (const res of allResources) {
  if (!domainIds.has(res.domain)) {
    errors.push(`Resource "${res.id}" references unknown domain "${res.domain}"`)
  }
  if (!res.url || !res.url.startsWith('http')) {
    errors.push(`Resource "${res.id}" has a missing/invalid url: "${res.url}"`)
  }
}

// 3. Every roadmap must point at a domain that actually exists
for (const roadmap of goalRoadmaps) {
  if (!domainIds.has(roadmap.domainId)) {
    errors.push(`Roadmap "${roadmap.id}" references unknown domain "${roadmap.domainId}"`)
  }
  if (roadmap.phases.length === 0) {
    warnings.push(`Roadmap "${roadmap.id}" has no phases`)
  }
}

// 4. Every domain should have at least one resource, or it's a dead end
// for anyone who lands on that page
for (const domain of allDomains) {
  const hasResources = allResources.some((r) => r.domain === domain.id)
  if (!hasResources) warnings.push(`Domain "${domain.id}" has zero resources`)
  if (domain.roadmapSteps.length === 0) warnings.push(`Domain "${domain.id}" has no roadmap steps`)
  if (domain.projectIdeas.length === 0) warnings.push(`Domain "${domain.id}" has no project ideas`)
}

// 5. Resources marked verified should have a lastVerified date, and vice versa
for (const res of allResources) {
  if (res.verified && !res.lastVerified) {
    warnings.push(`Resource "${res.id}" is marked verified but has no lastVerified date`)
  }
}

console.log('\nNITH FRESHER\'S GUIDE')
console.log('DATA INTEGRITY CHECK')
console.log('──────────────────────────────────────────────────')
console.log(`Domains: ${allDomains.length} | Resources: ${allResources.length} | Roadmaps: ${goalRoadmaps.length} | NITH entries: ${nithClubs.length}`)
console.log('──────────────────────────────────────────────────\n')

if (warnings.length > 0) {
  console.log(`⚠ ${warnings.length} warning(s):`)
  warnings.forEach((w) => console.log(`  - ${w}`))
  console.log('')
}

if (errors.length > 0) {
  console.error(`✗ ${errors.length} error(s):`)
  errors.forEach((e) => console.error(`  - ${e}`))
  console.error('\n🚨 Data integrity check failed.\n')
  process.exit(1)
} else {
  console.log('🎉 All structural checks passed.\n')
  process.exit(0)
}
