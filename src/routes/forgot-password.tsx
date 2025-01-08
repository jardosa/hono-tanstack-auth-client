import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { authClient } from '../lib/auth-client'
import { useState } from 'react'

export const Route = createFileRoute('/forgot-password')({
  component: RouteComponent,
})

function RouteComponent() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const sendResetPasswordOTP = async () => {
    await authClient.forgetPassword({
      email,
      redirectTo: "http://localhost:3001/reset-password"
    }, {
      onError(error) {
        setError('An error has occurred while sending reset password')

      },
      onSuccess() {
        setSuccess("If the email exists in our database, you'll receive an email.")
      }
    })
  }
  return <div>
    {error && <div>
      <div>
        {error}
      </div>
      <button onClick={() => setError('')}>Clear Error</button>
    </div>
    }
    <div>
      <div>Email Address</div>
      <input onChange={(e) => setEmail(e.target.value)} />
    </div>
    <button onClick={sendResetPasswordOTP}>Send Password Rest Link</button>
  </div>
}
