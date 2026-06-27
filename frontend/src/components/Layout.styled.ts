import styled from 'styled-components'
import type { OfferType } from '../api/types'
import { media } from '../theme'

export const PageWrapper = styled.main`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
  padding-top: calc(${({ theme }) => theme.headerHeight} + ${({ theme }) => theme.spacing.lg});

  ${media.maxSm} {
    padding: ${({ theme }) => theme.spacing.md};
    padding-top: calc(${({ theme }) => theme.headerHeight} + ${({ theme }) => theme.spacing.md});
  }
`

export const PageTitle = styled.h1`
  font-size: 1.8rem;
  font-weight: 800;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

export const Button = styled.button<{ $variant?: 'primary' | 'secondary' | 'danger' }>`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  font-weight: 700;
  font-size: 0.9rem;
  border: ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius};
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: ${({ theme, $variant }) =>
    $variant === 'danger'
      ? theme.colors.danger
      : $variant === 'secondary'
        ? theme.colors.surface
        : theme.colors.accent};
  color: ${({ theme }) => theme.colors.primary};
  box-shadow: ${({ theme }) => theme.shadow};
  transition:
    transform 0.1s,
    box-shadow 0.1s;
  text-decoration: none;
  display: inline-block;

  &:hover:not(:disabled) {
    transform: translate(-2px, -2px);
    box-shadow: ${({ theme }) => theme.shadowMd};
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  border: ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius};
  font-size: 1rem;
  background: ${({ theme }) => theme.colors.surface};

  &:focus-visible {
    outline: none;
    box-shadow: ${({ theme }) => theme.shadow};
  }
`

export const Textarea = styled.textarea`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  border: ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius};
  font-size: 1rem;
  background: ${({ theme }) => theme.colors.surface};
  resize: vertical;
  min-height: 100px;

  &:focus-visible {
    outline: none;
    box-shadow: ${({ theme }) => theme.shadow};
  }
`

export const Select = styled.select`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  border: ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius};
  font-size: 1rem;
  background: ${({ theme }) => theme.colors.surface};
  cursor: pointer;

  &:focus-visible {
    outline: none;
    box-shadow: ${({ theme }) => theme.shadow};
  }
`

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

// Row of action buttons with consistent spacing
export const FormActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
  margin-top: ${({ theme }) => theme.spacing.xs};
`

// Centered container for auth-prompt / empty-state screens
export const AuthPrompt = styled.div`
  text-align: center;
  padding-top: ${({ theme }) => theme.spacing.xxl};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`

export const Label = styled.label`
  font-weight: 600;
  font-size: 0.9rem;
`

export const ErrorMsg = styled.p`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.85rem;
  font-weight: 600;
`

export const Badge = styled.span<{ $type?: OfferType | 'status' }>`
  font-size: 0.65rem;
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
