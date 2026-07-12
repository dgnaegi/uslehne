import styled, { keyframes } from 'styled-components'
import { NotifDot } from './Header.styled'

const slideDown = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to   { opacity: 1; transform: translateY(0); }
`

export const HamburgerWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-shrink: 0;
`

export const HamburgerBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary};
  line-height: 1;
  padding: ${({ theme }) => theme.spacing.xs};
  display: flex;
  align-items: center;
  justify-content: center;
`

export const MobileMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  height: calc(100dvh - ${({ theme }) => theme.headerHeight});
  background: ${({ theme }) => theme.colors.surface};
  border-top: ${({ theme }) => theme.border};
  z-index: ${({ theme }) => theme.zIndex.mobileMenu};
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  animation: ${slideDown} 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;

  ${NotifDot} {
    position: static;
    margin-left: auto;
    flex-shrink: 0;
  }

  a,
  button {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};
    padding: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing.xl}`};
    font-size: 1rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.text};
    background: none;
    border: none;
    border-bottom: ${({ theme }) => theme.border};
    width: 100%;
    text-align: left;
    cursor: pointer;
    transition:
      background 0.1s,
      color 0.1s;

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      background: ${({ theme }) => theme.colors.accent};
    }
  }
`
