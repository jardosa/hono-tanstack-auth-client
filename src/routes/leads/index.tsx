import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { betterFetch } from '@better-fetch/fetch'
import { authClient } from '../../lib/auth-client'
import axios from 'axios'

export const Route = createFileRoute('/leads/')({
  component: RouteComponent,
})

function RouteComponent() {

  const { data } = useQuery({
    queryKey: ['leads',],
    queryFn: async () => {

      const data = await axios.get('http://localhost:3000/api/lead', { withCredentials: true })

      return data
    }
  })

  return <div>Hello "/leads/"!</div>
}
