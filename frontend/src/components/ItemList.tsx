import { useEffect, useState } from 'react'
import { Section, SectionTitle, Grid, Card, CardTitle, CardDescription, Badge, Message } from './ItemList.styled'

interface Item {
  id: number
  title: string
  description: string | null
  createdAt: string
}

export function ItemList() {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/v1/items')
      .then((r) => {
        if (!r.ok) throw new Error('Failed to load items')
        return r.json() as Promise<Item[]>
      })
      .then(setItems)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <Section>
      <SectionTitle>Einträge</SectionTitle>
      {loading && <Message>Laden…</Message>}
      {error && <Message style={{ color: 'red' }}>{error}</Message>}
      {!loading && !error && items.length === 0 && (
        <Message>Noch keine Einträge vorhanden.</Message>
      )}
      <Grid>
        {items.map((item) => (
          <Card key={item.id}>
            <Badge>#{item.id}</Badge>
            <CardTitle>{item.title}</CardTitle>
            {item.description && <CardDescription>{item.description}</CardDescription>}
          </Card>
        ))}
      </Grid>
    </Section>
  )
}
