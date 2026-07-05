import { useRef, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { SearchWrapper, SearchInput, ClearButton } from './SearchBar.styled'

interface Props {
  onSearch: (q: string) => void
}

const DEBOUNCE_MS = 300

export function SearchBar({ onSearch }: Props) {
  const { t } = useTranslation('offers')
  const [value, setValue] = useState('')
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => onSearch(value.trim()), DEBOUNCE_MS)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [value, onSearch])

  function handleClear() {
    setValue('')
    onSearch('')
  }

  return (
    <SearchWrapper>
      <SearchInput
        type="search"
        aria-label={t('searchPlaceholder')}
        placeholder={t('searchPlaceholder')}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {value && (
        <ClearButton onClick={handleClear} aria-label="Clear search">
          ✕
        </ClearButton>
      )}
    </SearchWrapper>
  )
}
