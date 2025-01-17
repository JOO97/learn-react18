import { useEffect } from 'react'

export function useKey(key, action) {
  useEffect(() => {
    function cb(e) {
      e.code.toLowerCase() === key.toLowerCase() && action()
    }
    document.addEventListener('keydown', cb)

    return () => document.removeEventListener('keydown', cb)
  }, [key, action])
}
