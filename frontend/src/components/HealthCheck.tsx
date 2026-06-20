import { useState } from 'react'
import { Section, Button, Status } from './HealthCheck.styled'

interface HealthResponse {
  status: string
  db: string
  timestamp: string
}

export function HealthCheck() {
  const [result, setResult] = useState<HealthResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function check() {
    setLoading(true)
    setError(null)
    try {
      const r = await fetch('/api/v1/health')
      if (!r.ok) throw new Error(`HTTP ${r.status}`)
      setResult(await r.json() as HealthResponse)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed')
      setResult(null)
    } finally {
      setLoading(false)
    }
  }

  const ok = result?.status === 'ok' && result?.db === 'connected'

  return (
    <Section>
      <Button onClick={check} $loading={loading} disabled={loading}>
        {loading ? 'Checking…' : 'Health Check'}
      </Button>
      {result && <Status $ok={ok}>✓ API {result.status} · DB {result.db}</Status>}
      {error && <Status $ok={false}>✗ {error}</Status>}
    </Section>
  )
}
