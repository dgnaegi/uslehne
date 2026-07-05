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
    outline: 4px solid ${({ theme }) => theme.colors.accent};
    outline-offset: -4px;
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

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
  }
`

/* Hard cut-off gradient — graphic, Swiss rather than soft Instagram style */
export const CardOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${({ theme }) => `${theme.spacing.xxl} ${theme.spacing.lg} ${theme.spacing.xl}`};
  background: linear-gradient(transparent 0%, rgba(0, 0, 0, 0.45) 35%, rgba(0, 0, 0, 0.93) 70%);
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`

export const TypeBadge = styled.span<{ $type: OfferType }>`
  font-size: 0.58rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 4px 10px;
  background: ${({ theme, $type }) =>
    $type === 'GIVE' ? theme.colors.pastelMint : theme.colors.accent};
  color: ${({ theme }) => theme.colors.primary};
  align-self: flex-start;
  /* strictly rectangular — no border-radius */
`

export const CardTitle = styled.h3`
  font-size: clamp(1.6rem, 6vw, 2.6rem);
  font-weight: 900;
  color: white;
  line-height: 1.05;
  letter-spacing: -0.02em;
  text-transform: uppercase;
`

export const CardMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.8rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.75);
  gap: ${({ theme }) => theme.spacing.sm};
`

export const CardZip = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.82rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: 0.04em;
  text-transform: uppercase;
`

export const CardOwner = styled.span`
  font-size: 0.78rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.65);
  letter-spacing: 0.02em;
`
