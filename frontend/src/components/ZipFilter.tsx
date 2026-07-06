import { useState, useRef } from 'react'
import type { OfferType } from '../api/types'
import { IconX, IconPlus } from '../icons'
import {
  FilterBar,
  Tagline,
  ChipsRow,
  Chip,
  ChipRemove,
  ZipInput,
  AddButton,
  TypeFilterGroup,
  TypeBtn,
} from './ZipFilter.styled'

interface Props {
  zips: string[]
  onZipsChange: (zips: string[]) => void
  offerType: OfferType | null
  onOfferTypeChange: (type: OfferType | null) => void
}

export function ZipFilter({ zips, onZipsChange, offerType, onOfferTypeChange }: Props) {
  const [inputVal, setInputVal] = useState('')
  const [showInput, setShowInput] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  function handleTypeClick(type: OfferType) {
    onOfferTypeChange(offerType === type ? null : type)
  }

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
      <Tagline>uslehne.ch — unkommerziell jetzt &amp; für immer</Tagline>
      <ChipsRow>
        {zips.map((zip) => (
          <Chip key={zip}>
            {zip}
            <ChipRemove onClick={() => onZipsChange(zips.filter((z) => z !== zip))}>
              <IconX size={10} />
            </ChipRemove>
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
          <AddButton onClick={() => setShowInput(true)}>
            <IconPlus size={13} /> PLZ
          </AddButton>
        )}
        <TypeFilterGroup>
          <TypeBtn
            $active={offerType === 'LEND'}
            onClick={() => handleTypeClick('LEND')}
          >
            Verleihen
          </TypeBtn>
          <TypeBtn
            $active={offerType === 'GIVE'}
            onClick={() => handleTypeClick('GIVE')}
          >
            Schenken
          </TypeBtn>
        </TypeFilterGroup>
      </ChipsRow>
    </FilterBar>
  )
}
