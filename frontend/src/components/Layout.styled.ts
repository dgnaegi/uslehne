import styled, { keyframes } from 'styled-components'
import type { OfferType } from '../api/types'
import { media } from '../theme'

const pageIn = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
`

export const PageWrapper = styled.main`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
  padding-top: calc(${({ theme }) => theme.headerHeight} + ${({ theme }) => theme.spacing.lg});
  animation: ${pageIn} 0.28s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;

  ${media.maxSm} {
    padding: ${({ theme }) => theme.spacing.md};
    padding-top: calc(${({ theme }) => theme.headerHeight} + ${({ theme }) => theme.spacing.md});
  }
`

export const PageTitle = styled.h1`
  font-size: clamp(1.6rem, 4vw, 2.4rem);
  font-weight: 900;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

export const Button = styled.button<{ $variant?: 'primary' | 'secondary' | 'danger' }>`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  font-weight: 800;
  font-size: 0.8rem;
  border: ${({ theme }) => theme.border};
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  background: ${({ theme, $variant }) =>
    $variant === 'danger'
      ? theme.colors.danger
      : $variant === 'secondary'
        ? theme.colors.surface
        : theme.colors.accent};
  color: ${({ theme, $variant }) => ($variant === 'danger' ? '#ffffff' : theme.colors.primary)};
  transition:
    background 0.15s ease-out,
    color 0.15s ease-out,
    transform 0.1s ease-out;
  text-decoration: none;
  display: inline-block;

  &:active:not(:disabled) {
    transform: scale(0.96);
  }

  &:hover:not(:disabled) {
    background: ${({ theme, $variant }) =>
      $variant === 'danger'
        ? '#b71c1c'
        : $variant === 'secondary'
          ? theme.colors.accent
          : theme.colors.primary};
    color: ${({ theme, $variant }) =>
      $variant === 'danger'
        ? '#ffffff'
        : $variant === 'secondary'
          ? theme.colors.primary
          : theme.colors.accent};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`

export const AuthPrompt = styled.div`
  text-align: center;
  padding-top: ${({ theme }) => theme.spacing.xxl};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`

export const Badge = styled.span<{ $type?: OfferType | 'status' }>`
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border: ${({ theme }) => theme.border};
  background: ${({ theme, $type }) =>
    $type === 'GIVE' ? theme.colors.pastelMint : theme.colors.accent};
  align-self: flex-start;
`
