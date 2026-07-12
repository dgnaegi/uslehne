import styled from 'styled-components'
import { filterControlCss } from './FilterControl.styled'

export const Wrapper = styled.div`
  position: relative;
  flex-shrink: 0;
`

export const Trigger = styled.button<{ $active: boolean; $open: boolean }>`
  ${filterControlCss}
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};

  svg {
    flex-shrink: 0;
    transition: transform 0.15s;
    transform: rotate(${({ $open }) => ($open ? '180deg' : '0deg')});
  }
`

export const Menu = styled.div`
  position: absolute;
  top: calc(100% + ${({ theme }) => theme.spacing.xs});
  right: 0;
  z-index: ${({ theme }) => theme.zIndex.dropdown};
  display: flex;
  flex-direction: column;
  width: max-content;
  min-width: 100%;
  background: ${({ theme }) => theme.colors.background};
  border: ${({ theme }) => theme.border};
`

export const OptionBtn = styled.button<{ $selected: boolean }>`
  background: ${({ theme, $selected }) => ($selected ? theme.colors.primary : 'none')};
  color: ${({ theme, $selected }) => ($selected ? theme.colors.accent : theme.colors.text)};
  border: none;
  text-align: left;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s;

  @media (hover: hover) {
    &:hover {
      background: ${({ theme, $selected }) =>
        $selected ? theme.colors.primary : theme.colors.accent};
    }
  }
`
