import styled from 'styled-components'
import type { OfferType } from '../api/types'

export const DetailWrapper = styled.main`
  max-width: 860px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
`

export const BackLink = styled.button`
  background: none;
  border: none;
  font-weight: 700;
  cursor: pointer;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding: 0;
  &:hover {
    text-decoration: underline;
  }
`

export const ImageBlock = styled.div`
  overflow: hidden;
  height: 60vh;
  min-height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.pastelYellow};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  font-size: 6rem;
  /* break out of the DetailWrapper padding to span full viewport width */
  width: 100vw;
  position: relative;
  left: 50%;
  margin-left: -50vw;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

export const MetaRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textMuted};
  font-weight: 600;
  flex-wrap: wrap;
`

export const ActionRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`

export const TypeBadge = styled.span<{ $type: OfferType }>`
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ theme, $type }) =>
    $type === 'GIVE' ? theme.colors.pastelMint : theme.colors.accent};
  align-self: flex-start;
`
