import styled from 'styled-components'

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.modal};
  background: rgba(0, 0, 0, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  touch-action: none;
`

export const CloseBtn = styled.button`
  position: fixed;
  top: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
  z-index: ${({ theme }) => theme.zIndex.modal + 1};
  background: rgba(0, 0, 0, 0.55);
  border: none;
  color: white;
  font-size: 1.4rem;
  line-height: 1;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(6px);

  &:hover {
    background: rgba(0, 0, 0, 0.78);
  }
`

export const Img = styled.img<{ $scale: number }>`
  max-width: 100vw;
  max-height: 100dvh;
  object-fit: contain;
  display: block;
  transform-origin: center center;
  /* scale + translate applied via style prop */
  will-change: transform;
  user-select: none;
  -webkit-user-drag: none;
  touch-action: none;
  cursor: ${({ $scale }) => ($scale > 1 ? 'grab' : 'zoom-in')};
`
