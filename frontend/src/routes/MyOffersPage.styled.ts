import styled from 'styled-components'

export const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

export const OfferRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md};
  border: ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ theme }) => theme.colors.surface};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  box-shadow: ${({ theme }) => theme.shadow};
`

export const OfferRowTitle = styled.h3`
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`

export const OfferRowMeta = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  align-items: center;
  font-size: 0.85rem;
`
