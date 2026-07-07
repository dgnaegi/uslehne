import styled, { keyframes } from 'styled-components'
import { media } from '../theme'

const ringPulse = keyframes`
  0%   { box-shadow: 0 0 0 0px rgba(255, 214, 0, 0.8); }
  70%  { box-shadow: 0 0 0 7px rgba(255, 214, 0, 0); }
  100% { box-shadow: 0 0 0 0px rgba(255, 214, 0, 0); }
`

export const Nav = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${({ theme }) => theme.zIndex.header};
  height: ${({ theme }) => theme.headerHeight};
  padding: 0 ${({ theme }) => theme.spacing.md};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.background};
  border-bottom: ${({ theme }) => theme.border};
`

export const LogoGroup = styled.div`
  display: none;

  ${media.sm} {
    display: flex;
    flex-direction: column;
    gap: 1px;
    flex-shrink: 0;
  }
`

export const Logo = styled.span`
  font-family: ${({ theme }) => theme.font};
  font-size: 1.1rem;
  font-weight: 900;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  line-height: 1;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
`

export const LogoClaim = styled.span`
  display: none;
`

export const BackHome = styled.span`
  font-size: 0.78rem;
  font-weight: 700;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.primary};
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  white-space: nowrap;
  letter-spacing: 0.06em;
  text-transform: uppercase;

  &:hover {
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`

export const SearchWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`

export const SearchInput = styled.input`
  width: 100%;
  height: ${({ theme }) => theme.spacing.xl};
  padding: 0 ${({ theme }) => theme.spacing.sm};
  border: none;
  border-bottom: 2px solid rgba(26, 26, 26, 0.2);
  font-size: 1rem;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  outline: none;
  transition: border-color 0.12s;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus {
    border-bottom-color: ${({ theme }) => theme.colors.primary};
  }
`

export const GuestAuthBtn = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  border: ${({ theme }) => theme.border};
  font-size: 0.7rem;
  font-weight: 800;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.accent};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  white-space: nowrap;
  flex-shrink: 0;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition:
    background 0.1s,
    color 0.1s;

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.primary};
  }
`

export const AboutBtn = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  cursor: pointer;
  flex-shrink: 0;
  transition: opacity 0.1s;

  &:hover {
    opacity: 0.6;
  }
`

export const NotifDot = styled.span`
  position: absolute;
  top: 2px;
  right: 2px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.accent};
  pointer-events: none;
  animation: ${ringPulse} 1.8s ease-out infinite;
`
