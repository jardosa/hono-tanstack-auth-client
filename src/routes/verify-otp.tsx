import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react';

export const Route = createFileRoute('/verify-otp')({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      email: search.email ?? "",
    };
  },
})

function RouteComponent() {
  const searchParams = Route.useSearch();

  const [otp, setOtp] = useState('')

  const onSubmit = async () => {
    console.log(otp, searchParams)
  }

  return <div>
    <input onChange={(e) => setOtp(e.target.value)} />
    <button onClick={onSubmit}>Submit</button>
  </div>
}
