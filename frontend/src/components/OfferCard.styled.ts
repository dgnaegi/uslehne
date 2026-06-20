import styled from 'styled-components'

export const Card = styled.article`
  background: ${({ theme }) => theme.colors.surface};
  border: ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadow};
  transition: transform 0.1s, box-shadow 0.1s;
  cursor: pointer;

  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: ${({ theme }) => theme.shadowMd};
  }
`

export const ImageArea = styled.div<{ $color: string }>`
  background: ${({ $color }) => $color};
  border-bottom: ${({ theme }) => theme.border};
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
  font-weight: 700;
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
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textMuted};
`

export const Badge = styled.span<{ $type: 'category' | 'status' }>`
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ theme, $type }) =>
    $type === 'category' ? theme.colors.accent : theme.colors.surface};
`
