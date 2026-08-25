import { Domain } from '../types'
import { softwareDomains } from './softwareDomains'
import { hardwareDomains } from './hardwareDomains'
import { specializedDomains } from './specializedDomains'

export const allDomains: Domain[] = [
  ...softwareDomains,
  ...hardwareDomains,
  ...specializedDomains,
]

export const getDomainById = (id: string): Domain | undefined => {
  return allDomains.find(d => d.id === id)
}

export { softwareDomains, hardwareDomains, specializedDomains }
