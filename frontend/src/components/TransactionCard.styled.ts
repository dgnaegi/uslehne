import styled, { keyframes } from 'styled-components'

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
`

export const TxCard = styled.div`
  border: ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  box-shadow: ${({ theme }) => theme.shadow};
  animation: ${fadeUp} 0.22s ease both;
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

export const TxContact = styled.p<{ $mt?: boolean }>`
  font-size: 0.88rem;
  font-weight: 600;
  margin-top: ${({ theme, $mt }) => ($mt ? theme.spacing.sm : '0')};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  letter-spacing: 0.02em;
`

export const TxContactBox = styled.div`
  border: ${({ theme }) => theme.border};
  border-left: 4px solid ${({ theme }) => theme.colors.accent};
  background: ${({ theme }) => theme.colors.pastelYellow};
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

export const TxContactBoxLabel = styled.p`
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`

export const TxContactAction = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  text-decoration: none;
  border: ${({ theme }) => theme.border};

  &:hover {
    opacity: 0.85;
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
