import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { authClient } from '../lib/auth-client'

export const Route = createFileRoute('/signin')({
  component: RouteComponent,
})

function RouteComponent() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(true)

  const signInWithEmail = async () => {
    const { data, error } = await authClient.signIn.email({
      email,
      password,
      rememberMe,
      callbackURL: 'http://localhost:3001/'
    })
  }

  return <div>
    <input type="text" onChange={(e) => setEmail(e.target.value)} />
    <input type="password" onChange={(e) => setPassword(e.target.value)} />
    <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />

    <button onClick={signInWithEmail}>Sign In</button>
  </div>
}
