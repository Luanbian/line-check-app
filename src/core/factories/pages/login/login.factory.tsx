import React from 'react'
import Login from '../../../../presentation/pages/login/login'
import { makeAuthentication } from '../../data/authentication/authentication.factory'

export const makeLogin: React.FC = () => {
  const authenticator = makeAuthentication()
  return (
    <Login
      authentication={ authenticator }
    />
  )
}
