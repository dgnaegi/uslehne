import styled from 'styled-components'
import type { OfferType } from '../api/types'

export const Card = styled.article`
  position: relative;
  border: ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadow};
  aspect-ratio: 16 / 9;
  cursor: pointer;
  text-decoration: none;
  display: block;
  transition:
    transform 0.1s,
    box-shadow 0.1s;

  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: ${({ theme }) => theme.shadowMd};
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`

export const CardImage = styled.div<{ $type: OfferType }>`
  position: absolute;
  inset: 0;
  background: ${({ theme, $type }) =>
    $type === 'LEND' ? theme.colors.pastelYellow : theme.colors.pastelMint};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3.5rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`

export const CardOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${({ theme }) => theme.spacing.md};
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.72) 40%);
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

export const CardTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: white;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
`

export const CardMeta = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
`

export const TypeBadge = styled.span<{ $type: OfferType }>`
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ theme, $type }) =>
    $type === 'GIVE' ? theme.colors.pastelMint : theme.colors.accent};
  color: ${({ theme }) => theme.colors.primary};
  align-self: flex-start;
`
