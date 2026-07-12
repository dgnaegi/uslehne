import { useEffect, useRef, useState } from 'react'
import { IconChevronDown } from '../icons'
import { Wrapper, Trigger, Menu, OptionBtn } from './Dropdown.styled'

export interface DropdownOption {
  value: string
  label: string
}

interface Props {
  label: string
  options: DropdownOption[]
  value: string | null
  onChange: (value: string | null) => void
  clearLabel?: string
}

export function Dropdown({ label, options, value, onChange, clearLabel }: Props) {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function handlePointerDown(e: MouseEvent | TouchEvent) {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false)
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('touchstart', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('touchstart', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  function select(v: string | null) {
    onChange(v)
    setOpen(false)
  }

  return (
    <Wrapper ref={wrapperRef}>
      <Trigger
        type="button"
        $active={value !== null}
        $open={open}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {label}
        <IconChevronDown size={12} />
      </Trigger>
      {open && (
        <Menu role="listbox">
          {clearLabel && (
            <OptionBtn
              type="button"
              role="option"
              aria-selected={value === null}
              $selected={value === null}
              onClick={() => select(null)}
            >
              {clearLabel}
            </OptionBtn>
          )}
          {options.map((o) => (
            <OptionBtn
              key={o.value}
              type="button"
              role="option"
              aria-selected={value === o.value}
              $selected={value === o.value}
              onClick={() => select(o.value)}
            >
              {o.label}
            </OptionBtn>
          ))}
        </Menu>
      )}
    </Wrapper>
  )
}
