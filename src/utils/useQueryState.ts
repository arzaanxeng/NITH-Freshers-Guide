import { useCallback, useState } from 'react'

/**
 * Keeps simple string filters in the URL query (?q=react&level=beginner) so
 * a filtered view can be shared, bookmarked, and survives a reload.
 * Uses replaceState, so typing in a filter doesn't spam browser history.
 * Values equal to their default are left out of the URL.
 */
export function useQueryState<T extends Record<string, string>>(defaults: T) {
  const [state, setState] = useState<T>(() => {
    const params = new URLSearchParams(window.location.search)
    const initial = { ...defaults }
    for (const key of Object.keys(defaults)) {
      const v = params.get(key)
      if (v !== null) (initial as Record<string, string>)[key] = v
    }
    return initial
  })

  const update = useCallback(
    (patch: Partial<T>) => {
      setState((prev) => {
        const next = { ...prev, ...patch }
        const params = new URLSearchParams(window.location.search)
        for (const key of Object.keys(defaults)) {
          const v = next[key]
          if (v === defaults[key] || v === '') params.delete(key)
          else params.set(key, v)
        }
        const qs = params.toString()
        window.history.replaceState(window.history.state, '', `${window.location.pathname}${qs ? `?${qs}` : ''}`)
        return next
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  const reset = useCallback(() => update({ ...defaults }), [update]) // eslint-disable-line react-hooks/exhaustive-deps

  return [state, update, reset] as const
}
