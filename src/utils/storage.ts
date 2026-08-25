const CHECKLIST_STORAGE_KEY = 'nith_guide_checklists_v1'

export const getSavedChecklistItems = (): Record<string, boolean> => {
  try {
    const saved = localStorage.getItem(CHECKLIST_STORAGE_KEY)
    return saved ? JSON.parse(saved) : {}
  } catch (err) {
    console.error('Failed to read checklist state from localStorage:', err)
    return {}
  }
}

export const saveChecklistItem = (itemId: string, isChecked: boolean): Record<string, boolean> => {
  try {
    const current = getSavedChecklistItems()
    const updated = { ...current, [itemId]: isChecked }
    localStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify(updated))
    return updated
  } catch (err) {
    console.error('Failed to save checklist item to localStorage:', err)
    return {}
  }
}

export const clearChecklistProgress = (): void => {
  try {
    localStorage.removeItem(CHECKLIST_STORAGE_KEY)
  } catch (err) {
    console.error('Failed to clear checklist progress:', err)
  }
}
