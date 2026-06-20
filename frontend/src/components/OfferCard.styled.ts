import styled from 'styled-components'

export const Card = styled.article`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
  overflow: hidden;
  transition: box-shadow 0.15s, transform 0.15s;
  cursor: pointer;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadowMd};
    transform: translateY(-2px);
  }
`

export const ImageArea = styled.div`
  background: ${({ theme }) => theme.colors.background};
  height: ${({ theme }) => theme.spacing.xxl};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
`

export const Body = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

export const Title = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`

export const Meta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing.xs};
`

export const Location = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textMuted};
`

export const Badge = styled.span<{ $type: 'category' | 'type' }>`
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: ${({ theme }) => `2px ${theme.spacing.sm}`};
  border-radius: 999px;
  background: ${({ theme, $type }) =>
    $type === 'category'
      ? `${theme.colors.accent}18`
      : `${theme.colors.primary}10`};
  color: ${({ theme, $type }) =>
    $type === 'category' ? theme.colors.accent : theme.colors.textMuted};
`
