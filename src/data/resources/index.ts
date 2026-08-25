import { Resource } from '../types'
import { aiMlResources } from './aiMlResources'
import { webDevResources } from './webDevResources'
import { dsaResources } from './dsaResources'
import { dataScienceResources } from './dataScienceResources'
import { cybersecurityResources } from './cybersecurityResources'
import { devopsResources } from './devopsResources'
import { systemsResources } from './systemsResources'
import { appDevResources } from './appDevResources'
import { openSourceResources } from './openSourceResources'
import { electronicsResources } from './electronicsResources'
import { roboticsResources } from './roboticsResources'
import { iotResources } from './iotResources'
import { vlsiResources } from './vlsiResources'
import { powerElectricalResources } from './powerElectricalResources'
import { controlAutomationResources } from './controlAutomationResources'
import { specializedResources } from './specializedResources'

export const allResources: Resource[] = [
  ...aiMlResources,
  ...webDevResources,
  ...dsaResources,
  ...dataScienceResources,
  ...cybersecurityResources,
  ...devopsResources,
  ...systemsResources,
  ...appDevResources,
  ...openSourceResources,
  ...electronicsResources,
  ...roboticsResources,
  ...iotResources,
  ...vlsiResources,
  ...powerElectricalResources,
  ...controlAutomationResources,
  ...specializedResources,
]

export const getResourcesByDomain = (domainId: string): Resource[] => {
  return allResources.filter(r => r.domain === domainId)
}

export {
  aiMlResources,
  webDevResources,
  dsaResources,
  dataScienceResources,
  cybersecurityResources,
  devopsResources,
  systemsResources,
  appDevResources,
  openSourceResources,
  electronicsResources,
  roboticsResources,
  iotResources,
  vlsiResources,
  powerElectricalResources,
  controlAutomationResources,
  specializedResources,
}
