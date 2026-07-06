import styled from 'styled-components'

export const REVEAL_WIDTH = 64

export const SwipeWrapper = styled.div`
  position: relative;
  overflow: hidden;
`

export const SwipeContent = styled.div<{ $offset: number; $animated: boolean }>`
  width: 100%;
  transform: translateX(${({ $offset }) => $offset}px);
  transition: ${({ $animated }) => ($animated ? 'transform 0.2s ease' : 'none')};
  background: ${({ theme }) => theme.colors.background};
`

export const DeleteReveal = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: ${REVEAL_WIDTH}px;
  background: ${({ theme }) => theme.colors.danger};
  display: flex;
  align-items: center;
  justify-content: center;
`

export const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  &:active {
    background: rgba(0, 0, 0, 0.15);
  }
`
