import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { authClient } from '../lib/auth-client'

export const Route = createFileRoute('/signout')({
  component: RouteComponent,
  beforeLoad: async () => {
    await authClient.signOut()
  }
})

function RouteComponent() {
  return <div>Hello "/signout"!</div>
}
