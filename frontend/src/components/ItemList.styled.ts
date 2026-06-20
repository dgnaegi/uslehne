import styled from 'styled-components'

export const Section = styled.section`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.spacing.xxl} ${theme.spacing.xl}`};
`

export const SectionTitle = styled.h2`
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

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`

export const Card = styled.article`
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

export const CardTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

export const CardDescription = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textMuted};
`

export const Badge = styled.span`
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

export const Message = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.95rem;
`
