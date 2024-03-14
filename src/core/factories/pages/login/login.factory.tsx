import React from 'react'
import Login from '../../../../presentation/pages/login/login'
import { makeAuthentication } from '../../data/authentication/authentication.factory'
import { makeDecodeToken } from '../../infra/adapters/decode.token.factory'
import { makeLocalStorage } from '../../infra/adapters/local.storage.factory'
import { makeNotification } from '../../infra/adapters/notification.factory'

export const makeLogin: React.FC = () => {
  const authenticator = makeAuthentication()
  const decodeToken = makeDecodeToken()
  const localStorage = makeLocalStorage()
  const notification = makeNotification()
  return (
    <Login
      authentication={ authenticator }
      decodeToken={ decodeToken }
      localStorage={ localStorage }
      notification={ notification }
    />
  )
}
