import styled, { keyframes } from 'styled-components'

const panelIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
`

export const Fab = styled.button`
  position: fixed;
  bottom: ${({ theme }) => theme.spacing.lg};
  right: ${({ theme }) => theme.spacing.lg};
  width: 48px;
  height: 48px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.accent};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 150;
  transition: background 0.15s ease-out;

  &:hover {
    background: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }
`

export const Panel = styled.div`
  position: fixed;
  bottom: calc(${({ theme }) => theme.spacing.lg} + 48px + ${({ theme }) => theme.spacing.sm});
  right: ${({ theme }) => theme.spacing.lg};
  width: 280px;
  background: ${({ theme }) => theme.colors.surface};
  border: ${({ theme }) => theme.border};
  padding: ${({ theme }) => theme.spacing.md};
  z-index: 150;
  animation: ${panelIn} 0.15s ease-out both;
`

export const PanelTitle = styled.h3`
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

export const BugTextArea = styled.textarea`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  border: ${({ theme }) => theme.border};
  font-size: 0.9rem;
  font-family: inherit;
  background: ${({ theme }) => theme.colors.surface};
  resize: vertical;
  min-height: 90px;
  outline: none;
  box-sizing: border-box;

  &:focus-visible {
    border-color: ${({ theme }) => theme.colors.accent};
  }
`

export const PanelActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${({ theme }) => theme.spacing.sm};
`

export const SuccessMsg = styled.p`
  font-size: 0.85rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.success};
  text-align: center;
  padding: ${({ theme }) => theme.spacing.md} 0;
`
