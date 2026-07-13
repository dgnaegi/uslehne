import styled from 'styled-components'

export const Feed = styled.div<{ $loading?: boolean }>`
  position: fixed;
  inset: 0;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  -webkit-overflow-scrolling: touch;
  opacity: ${({ $loading }) => ($loading ? 0.35 : 1)};
  transition: opacity 0.15s;
`

export const Empty = styled.p`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 ${({ theme }) => theme.spacing.md};
  text-align: center;
  color: ${({ theme }) => theme.colors.textMuted};
  font-weight: 600;
  font-size: 1.1rem;
`

export const SpinnerCenter = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
