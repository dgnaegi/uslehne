import styled, { keyframes } from 'styled-components'

export const Feed = styled.div`
  position: fixed;
  inset: 0;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  -webkit-overflow-scrolling: touch;
`

export const Empty = styled.p`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textMuted};
  font-weight: 600;
  font-size: 1.1rem;
`

const spin = keyframes`
  to { transform: rotate(360deg); }
`

export const SpinnerOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.overlay};
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background};
`

export const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid ${({ theme }) => theme.colors.border};
  border-top-color: ${({ theme }) => theme.colors.accent};
  border-radius: 50%;
  animation: ${spin} 0.7s linear infinite;
`
