import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { authClient } from '../lib/auth-client'

export const Route = createFileRoute('/reset-password')({
  component: RouteComponent,
})

function RouteComponent() {
  const [newPassword, setNewPassword] = useState('')
  const navigate = useNavigate()
  const handleOnSuccess = () => {
    navigate({ to: '/signin', search: { redirect: '' } })
  }
  const onSubmit = async () => {
    const { data, error } = await authClient.resetPassword({
      newPassword,
    }, {
      onSuccess: () => {
        handleOnSuccess()
      }
    });
  }
  return <div>
    <div>New Password</div>
    <input type='password' onChange={(e) => setNewPassword(e.target.value)} />
    <button onClick={onSubmit}>Submit</button>

  </div>
}
