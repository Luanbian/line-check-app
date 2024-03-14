import React from 'react'
import Login from '../../../../presentation/pages/login/login'
import { makeAuthentication } from '../../data/authentication/authentication.factory'
import { makeDecodeToken } from '../../infra/adapters/decode.token.factory'
import { makeLocalStorage } from '../../infra/adapters/local.storage.factory'

export const makeLogin: React.FC = () => {
  const authenticator = makeAuthentication()
  const decodeToken = makeDecodeToken()
  const localStorage = makeLocalStorage()
  return (
    <Login
      authentication={ authenticator }
      decodeToken={ decodeToken }
      localStorage={ localStorage }
    />
  )
}
