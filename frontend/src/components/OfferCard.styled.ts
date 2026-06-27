import styled from 'styled-components'
import type { OfferType } from '../api/types'

export const Card = styled.article`
  position: relative;
  height: 100dvh;
  width: 100%;
  overflow: hidden;
  cursor: pointer;
  text-decoration: none;
  display: block;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  background: ${({ theme }) => theme.colors.primary};

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.accent};
    outline-offset: -3px;
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
  font-size: 5rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
  }
`

export const CardOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${({ theme }) => `${theme.spacing.xxl} ${theme.spacing.lg} ${theme.spacing.xl}`};
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.55) 35%, rgba(0, 0, 0, 0.82));
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`

export const TypeBadge = styled.span<{ $type: OfferType }>`
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 3px 10px;
  border-radius: 999px;
  background: ${({ theme, $type }) =>
    $type === 'GIVE' ? theme.colors.pastelMint : theme.colors.accent};
  color: ${({ theme }) => theme.colors.primary};
  align-self: flex-start;
`

export const CardTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 800;
  color: white;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
  line-height: 1.2;
`

export const CardMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.82rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.85);
  gap: ${({ theme }) => theme.spacing.sm};
`

export const CardZip = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.88rem;
  font-weight: 700;
  color: white;
`

export const CardOwner = styled.span`
  font-size: 0.8rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.75);
`
