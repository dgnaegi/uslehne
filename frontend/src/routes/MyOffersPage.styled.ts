import styled from 'styled-components'

export const TopBar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

export const OfferRow = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.md};
  border: ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.colors.surface};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  transition:
    border-color 0.15s ease-out,
    background 0.15s ease-out;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    background: ${({ theme }) => theme.colors.muted};
  }
`

export const OfferRowBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: ${({ theme }) => theme.spacing.xs};
`

export const OfferRowTitle = styled.h3`
  font-weight: 800;
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`

export const OfferRowMeta = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  align-items: center;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
`
