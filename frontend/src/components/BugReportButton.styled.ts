import styled, { keyframes } from 'styled-components'

const panelIn = keyframes`
  from { opacity: 0; transform: scale(0.97); }
  to   { opacity: 1; transform: scale(1); }
`

export const Fab = styled.button`
  position: fixed;
  bottom: ${({ theme }) => theme.spacing.xxl};
  right: ${({ theme }) => theme.spacing.lg};
  width: 32px;
  height: 32px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.accent};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${({ theme }) => theme.zIndex.fab};
  transition: background 0.15s ease-out;

  &:hover {
    background: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }
`

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: ${({ theme }) => theme.zIndex.fab - 1};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.lg};
`

export const Panel = styled.div`
  width: 100%;
  max-width: 360px;
  background: ${({ theme }) => theme.colors.surface};
  border: ${({ theme }) => theme.border};
  padding: ${({ theme }) => theme.spacing.md};
  animation: ${panelIn} 0.15s ease-out both;
`

export const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

export const PanelTitle = styled.h3`
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textMuted};
  display: flex;
  align-items: center;
  padding: 0;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }
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
