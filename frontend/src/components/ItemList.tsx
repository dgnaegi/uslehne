import { useEffect, useState } from 'react'
import styled from 'styled-components'

interface Item {
  id: number
  title: string
  description: string | null
  createdAt: string
}

const Section = styled.section`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.spacing.xxl} ${theme.spacing.xl}`};
`

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.text};

  &::after {
    content: '';
    display: block;
    width: 40px;
    height: 3px;
    background: ${({ theme }) => theme.colors.accent};
    margin-top: ${({ theme }) => theme.spacing.sm};
    border-radius: 2px;
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`

const Card = styled.article`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radiusLg};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadow};
  transition: box-shadow 0.2s, transform 0.2s;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadowMd};
    transform: translateY(-2px);
  }
`

const CardTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const CardDescription = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textMuted};
`

const Badge = styled.span`
  display: inline-block;
  font-size: 0.7rem;
  background: ${({ theme }) => theme.colors.accent}22;
  color: ${({ theme }) => theme.colors.accent};
  border-radius: 999px;
  padding: 2px 10px;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`

const Message = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.95rem;
`

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
