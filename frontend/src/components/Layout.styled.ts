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
    color 0.15s ease-out;
  text-decoration: none;
  display: inline-block;

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

export const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  border: ${({ theme }) => theme.border};
  font-size: 1rem;
  background: ${({ theme }) => theme.colors.surface};
  outline: none;
  transition: border-color 0.12s ease-out;

  &:focus-visible {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
  }
`

export const Textarea = styled.textarea`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  border: ${({ theme }) => theme.border};
  font-size: 1rem;
  background: ${({ theme }) => theme.colors.surface};
  resize: vertical;
  min-height: 100px;
  outline: none;
  transition: border-color 0.12s ease-out;

  &:focus-visible {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
  }
`

export const Select = styled.select`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  padding-right: 36px;
  border: ${({ theme }) => theme.border};
  font-size: 1rem;
  background: ${({ theme }) => theme.colors.surface};
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%231a1a1a' stroke-width='2' fill='none' stroke-linecap='square'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  appearance: none;
  cursor: pointer;
  outline: none;
  transition: border-color 0.12s ease-out;

  &:focus-visible {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
  }
`

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

export const FormActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
  margin-top: ${({ theme }) => theme.spacing.xs};
`

export const AuthPrompt = styled.div`
  text-align: center;
  padding-top: ${({ theme }) => theme.spacing.xxl};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`

export const Label = styled.label`
  font-weight: 700;
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`

export const ErrorMsg = styled.p`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.03em;
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
