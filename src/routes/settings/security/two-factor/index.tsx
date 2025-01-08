import { createFileRoute } from '@tanstack/react-router'

import { useState } from 'react'
import QRCode from 'react-qr-code'
import { authClient } from '../../../../lib/auth-client'

export const Route = createFileRoute('/settings/security/two-factor/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [password, setPassword] = useState('')
  const [totpURI, setTotpURI] = useState('')
  const [verifyCode, setVerifyCode] = useState('')
  const [backupCodes, setBackupCodes] = useState<string[]>([])
  const enable2fa = async () => {
    const { data } = await authClient.twoFactor.enable({
      password,
    })

    setTotpURI(data?.totpURI ?? '')
    setBackupCodes(data?.backupCodes ?? [])
  }

  const verify2fa = async () => {
    const { data } = await authClient.twoFactor.verifyTotp({
      code: verifyCode,
    })
  }
  return (
    <div>
      <div>
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
        <button className='btn' onClick={enable2fa}>Enable Two Factor Auth</button>
      </div>

      {totpURI ? <QRCode value={totpURI} /> : null}

      <div>
        <div>Verify Code</div>
        <div>
          <input onChange={(e) => setVerifyCode(e.target.value)} />
        </div>
        <button onClick={verify2fa}>Verify</button>
      </div>
    </div>
  )
}
