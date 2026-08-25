export type ResourceType =
  | 'youtube'
  | 'playlist'
  | 'course'
  | 'blog'
  | 'documentation'
  | 'github'
  | 'practice'
  | 'project'

export type LinkType =
  | 'video'
  | 'playlist'
  | 'channel'
  | 'documentation'
  | 'repository'
  | 'course'
  | 'article'
  | 'practice'

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced'

export type DomainCategory = 'software' | 'hardware' | 'specialized'

export interface Resource {
  id: string
  title: string
  creator: string
  domain: string
  topic: string
  type: ResourceType
  linkType?: LinkType
  level: DifficultyLevel
  description: string
  url: string
  fallbackUrl?: string
  duration?: string
  free?: boolean
  verified?: boolean
  lastVerified?: string
  official?: boolean
  tags?: string[]
  officialDocUrl?: string
  isPrimary?: boolean
}

export interface TechnologyItem {
  name: string
  description: string
  docUrl: string
}

export interface ProjectIdea {
  title: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  description: string
  techStack: string[]
}

export interface RoadmapStep {
  step: number
  title: string
  duration: string
  topics: string[]
  keyMilestone: string
}

export interface Domain {
  id: string
  name: string
  category: DomainCategory
  shortDescription: string
  fullDescription: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  timeline: string
  goodFor: string[]
  prerequisites: string[]
  coreTechnologies: TechnologyItem[]
  dontStartIf: string[]
  roadmapSteps: RoadmapStep[]
  projectIdeas: ProjectIdea[]
  primaryCreatorSpotlight?: {
    name: string
    reason: string
    recommendedStart: string
  }
}

export interface RoadmapPhase {
  phase: number
  name: string
  timeline: string
  summary: string
  topics: string[]
  milestoneProject: string
  pitfallsToAvoid: string[]
}

export interface GoalRoadmap {
  id: string
  title: string
  domainId: string
  targetRole: string
  duration: string
  description: string
  phases: RoadmapPhase[]
}

export interface ChecklistItem {
  id: string
  label: string
  detail?: string
  categoryTag?: string
}

export interface ChecklistGroup {
  id: string
  title: string
  description: string
  category: 'starter' | 'domain' | 'semester'
  items: ChecklistItem[]
}

export interface FlowchartStage {
  id: string
  stepNumber: number
  title: string
  subtitle: string
  iconName: string
  items: ChecklistItem[]
}

export interface RealityPrinciple {
  id: string
  title: string
  tagline: string
  seniorQuote: string
  theTrap: string
  theReality: string
  actionableAdvice: string
  category: 'learning' | 'projects' | 'placements' | 'mindset'
}

export interface NithClub {
  id: string
  name: string
  fullName?: string
  type: 'departmental_team' | 'technical_society' | 'annual_event'
  department?: string
  description: string
  focusAreas: string[]
  keyEvents: string[]
  howToJoin: string
  seniorTip: string
  officialLink?: string
  officialUrl?: string
  sourceUrl?: string
  lastVerified?: string
}
