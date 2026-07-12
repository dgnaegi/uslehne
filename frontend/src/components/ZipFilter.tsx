import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import type { OfferCategory, OfferType } from '../api/types'
import { OFFER_CATEGORIES } from '../api/types'
import { IconX, IconPlus } from '../icons'
import {
  FilterBar,
  MainRow,
  ChipsRow,
  Chip,
  ChipRemove,
  ZipInput,
  AddButton,
} from './ZipFilter.styled'
import { TypeFilterGroup, TypeBtn, CategorySelect } from './ZipFilterControls.styled'

interface Props {
  zips: string[]
  onZipsChange: (zips: string[]) => void
  offerType: OfferType | null
  onOfferTypeChange: (type: OfferType | null) => void
  category: OfferCategory | null
  onCategoryChange: (category: OfferCategory | null) => void
  compact?: boolean
}

export function ZipFilter({
  zips,
  onZipsChange,
  offerType,
  onOfferTypeChange,
  category,
  onCategoryChange,
  compact = false,
}: Props) {
  const { t } = useTranslation('offers')
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
    <FilterBar $compact={compact}>
      <MainRow>
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
          <CategorySelect
            $active={category !== null}
            value={category ?? ''}
            onChange={(e) => onCategoryChange((e.target.value as OfferCategory) || null)}
            aria-label={t('category')}
          >
            <option value="">{t('filterAllCategories')}</option>
            {OFFER_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {t(`categories.${c}`)}
              </option>
            ))}
          </CategorySelect>
          <TypeBtn $active={offerType === 'LEND'} onClick={() => handleTypeClick('LEND')}>
            leihen
          </TypeBtn>
          <TypeBtn $active={offerType === 'GIVE'} onClick={() => handleTypeClick('GIVE')}>
            schenken
          </TypeBtn>
        </TypeFilterGroup>
      </MainRow>
      {zips.length > 0 && (
        <ChipsRow>
          {zips.map((zip) => (
            <Chip key={zip}>
              {zip}
              <ChipRemove onClick={() => onZipsChange(zips.filter((z) => z !== zip))}>
                <IconX size={10} />
              </ChipRemove>
            </Chip>
          ))}
        </ChipsRow>
      )}
    </FilterBar>
  )
}
