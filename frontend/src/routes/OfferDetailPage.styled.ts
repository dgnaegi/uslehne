import styled, { keyframes } from 'styled-components'
import type { OfferType } from '../api/types'

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
`

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
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => `${theme.spacing.xs} 0`};
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: ${({ theme }) => theme.colors.text};

  &::before {
    content: '←';
    font-size: 1rem;
    line-height: 1;
    display: inline-block;
    transition: transform 0.18s ease-out;
  }

  &:hover {
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  &:hover::before {
    transform: translateX(-4px);
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
  border-top: ${({ theme }) => theme.border};
  border-bottom: ${({ theme }) => theme.border};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  width: 100vw;
  position: relative;
  left: 50%;
  margin-left: -50vw;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: zoom-in;
    transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  @media (hover: hover) {
    &:hover img {
      transform: scale(1.03);
    }
  }
`

export const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  animation: ${fadeUp} 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.05s both;
`

export const MetaRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textMuted};
  font-weight: 600;
  flex-wrap: wrap;
  text-transform: uppercase;
  letter-spacing: 0.04em;

  & > span {
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }
`

export const ActionRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`

export const TypeBadge = styled.span<{ $type: OfferType }>`
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  background: ${({ theme, $type }) =>
    $type === 'GIVE' ? theme.colors.pastelMint : theme.colors.accent};
  align-self: flex-start;
`
