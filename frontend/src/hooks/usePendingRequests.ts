import { useState, useEffect } from 'react'
import { transactionApi } from '../api/endpoints'
import { useAuth } from '../auth/AuthContext'

export function usePendingRequests(): number {
  const { user } = useAuth()
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!user) {
      setCount(0)
      return
    }

    let cancelled = false

    async function fetch() {
      try {
        const res = await transactionApi.list('incoming')
        if (!cancelled) {
          setCount(
            res.transactions.filter(
              (t) => t.status === 'PENDING' || (t.status === 'ACCEPTED' && !t.ownerConfirmed),
            ).length,
          )
        }
      } catch {
        // silently ignore — badge is non-critical
      }
    }

    fetch()
    const interval = setInterval(fetch, 30_000)
    return () => {
      cancelled = true
      clearInterval(interval)
    }
  }, [user])

  return count
}
