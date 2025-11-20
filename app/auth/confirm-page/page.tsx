'use client'

import { useEffect, useState, Suspense } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter, useSearchParams } from 'next/navigation'

function ConfirmContent() {
  const [status, setStatus] = useState('Initializing auth...')
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  useEffect(() => {
    const handleInvite = async () => {
      // 1. Extract the "next" destination from the standard query params (?)
      const next = searchParams.get('next') ?? '/'

      // 2. Manually parse the Hash (#) because server-side code cannot see it
      // and sometimes the Supabase client ignores it if configured for PKCE.
      const hash = window.location.hash.substring(1) // Remove the '#'
      const params = new URLSearchParams(hash)

      const accessToken = params.get('access_token')
      const refreshToken = params.get('refresh_token')
      const type = params.get('type') // usually 'invite' or 'recovery'

      if (!accessToken) {
        // If there is no hash, maybe Supabase already handled it? Check session.
        const { data: { session } } = await supabase.auth.getSession()
        if (session) {
          router.replace(next)
          return
        }
        setStatus('Error: No access token found in URL.')
        return
      }

      setStatus('Token found. Verifying session...')

      // 3. Force Supabase to set the session using the tokens we found
      const { error } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken || '',
      })

      if (error) {
        setStatus(`Error setting session: ${error.message}`)
        console.error(error)
      } else {
        setStatus('Session active. Redirecting...')
        // 4. Session is set, cookie is (hopefully) synced. Go to password page.
        router.replace(next)
      }
    }

    handleInvite()
  }, [router, searchParams, supabase])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-2xl font-bold">Processing Invite</h1>
      <p className="text-muted-foreground font-mono text-sm">{status}</p>
    </div>
  )
}

export default function ConfirmPage() {
  return (
    <Suspense fallback={<div className="p-10">Loading...</div>}>
      <ConfirmContent />
    </Suspense>
  )
}
