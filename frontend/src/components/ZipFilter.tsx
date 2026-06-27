import { useState, useRef } from 'react'
import { FilterBar, Chip, ChipRemove, ZipInput, AddButton } from './ZipFilter.styled'

interface Props {
  zips: string[]
  onZipsChange: (zips: string[]) => void
}

export function ZipFilter({ zips, onZipsChange }: Props) {
  const [inputVal, setInputVal] = useState('')
  const [showInput, setShowInput] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  function commit() {
    const z = inputVal.trim()
    if (z && !zips.includes(z)) onZipsChange([...zips, z])
    setInputVal('')
    setShowInput(false)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') commit()
    if (e.key === 'Escape') {
      setInputVal('')
      setShowInput(false)
    }
  }

  return (
    <FilterBar>
      {zips.map((zip) => (
        <Chip key={zip}>
          {zip}
          <ChipRemove onClick={() => onZipsChange(zips.filter((z) => z !== zip))}>✕</ChipRemove>
        </Chip>
      ))}
      {showInput ? (
        <ZipInput
          ref={inputRef}
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={commit}
          placeholder="PLZ…"
          autoFocus
        />
      ) : (
        <AddButton onClick={() => setShowInput(true)}>＋ PLZ</AddButton>
      )}
    </FilterBar>
  )
}
