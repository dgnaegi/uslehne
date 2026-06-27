import styled from 'styled-components'
import type { OfferType } from '../api/types'

export const DetailWrapper = styled.main`
  max-width: 860px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
  padding-top: calc(${({ theme }) => theme.headerHeight} + ${({ theme }) => theme.spacing.lg});

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.md};
    padding-top: calc(${({ theme }) => theme.headerHeight} + ${({ theme }) => theme.spacing.md});
  }
`

export const BackLink = styled.button`
  background: none;
  border: none;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => `${theme.spacing.xs} 0`};
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: 0.03em;

  &::before {
    content: '←';
    font-size: 1.1rem;
    line-height: 1;
  }

  &:hover {
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`

export const ImageBlock = styled.div`
  overflow: hidden;
  aspect-ratio: 16 / 9;
  max-height: 70vh;
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
    cursor: zoom-in;
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
