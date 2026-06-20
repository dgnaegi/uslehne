import styled from 'styled-components'

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  padding: ${({ theme }) => theme.spacing.md};
`

export const DialogBox = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radiusLg};
  box-shadow: ${({ theme }) => theme.shadowMd};
  padding: ${({ theme }) => theme.spacing.xl};
  width: 100%;
  max-width: 480px;
`

export const DialogTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 800;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

export const ButtonRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
`
