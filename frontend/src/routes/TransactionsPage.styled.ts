import styled from 'styled-components'

export const TabBar = styled.div`
  display: flex;
  gap: 0;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  border: ${({ theme }) => theme.border};
  width: fit-content;
`

export const Tab = styled.button<{ $active: boolean }>`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  border: none;
  border-right: ${({ theme, $active: _ }) => theme.border};
  background: ${({ theme, $active }) => ($active ? theme.colors.primary : 'transparent')};
  color: ${({ theme, $active }) => ($active ? theme.colors.accent : theme.colors.text)};
  font-weight: 800;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition:
    background 0.1s ease-out,
    color 0.1s ease-out;

  &:last-child {
    border-right: none;
  }

  &:hover:not(:disabled) {
    background: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.accent)};
    color: ${({ theme, $active }) => ($active ? theme.colors.accent : theme.colors.primary)};
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`

export const TxCard = styled.div`
  border: ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  box-shadow: ${({ theme }) => theme.shadow};
`

export const TxTitle = styled.h3`
  font-weight: 800;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`

export const TxMeta = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textMuted};
  font-weight: 600;
  letter-spacing: 0.03em;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`

export const TxContact = styled.p`
  font-size: 0.88rem;
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  letter-spacing: 0.02em;
`

export const TxContactLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 1rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: underline;
  text-underline-offset: 3px;
  letter-spacing: 0.02em;

  &:hover {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`

export const RateRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};

  button {
    font-size: 0.75rem;
    padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  }
`

export const TxActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`
