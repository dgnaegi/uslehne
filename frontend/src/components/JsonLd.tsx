import { useEffect } from 'react'

export function JsonLd({ json }: { json: string }) {
  useEffect(() => {
    const el = document.createElement('script')
    el.type = 'application/ld+json'
    el.text = json
    document.head.appendChild(el)
    return () => {
      document.head.removeChild(el)
    }
  }, [json])

  return null
}
