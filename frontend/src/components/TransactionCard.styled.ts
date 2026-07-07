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
