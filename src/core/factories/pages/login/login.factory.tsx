import React from 'react'
import Login from '../../../../presentation/pages/login/login'
import { HttpClientAdapter } from '../../../../infra/adapters/http.client.adapter'
import { Authentication } from '../../../../data/usecases/authentication'

export const makeLogin: React.FC = () => {
  const url = 'http://10.0.2.2:8080/api/auth/login'
  const httpClient = new HttpClientAdapter()
  const authenticator = new Authentication(url, httpClient)
  return (
    <Login
      authentication={ authenticator }
    />
  )
}
