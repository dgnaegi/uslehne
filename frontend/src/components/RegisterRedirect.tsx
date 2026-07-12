import { useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

export function RegisterRedirect() {
  const [params] = useSearchParams()
  const invite = params.get('invite')
  const navigate = useNavigate()
  const { openAuthModal } = useAuth()

  useEffect(() => {
    openAuthModal()
    navigate(invite ? `/offers?invite=${invite}` : '/offers', { replace: true })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return null
}
