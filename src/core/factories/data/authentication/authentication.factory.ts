import { type IAuthentication } from '../../../../data/protocols/usecases/authentication.protocol'
import { Authentication } from '../../../../data/usecases/authentication'
import { makeHttpClient } from '../../infra/adapters/http.client.factory'

export const makeAuthentication = (): IAuthentication => {
  const url = 'http://10.0.2.2:8080/api/auth/login'
  const httpClient = makeHttpClient()
  const authentication = new Authentication(url, httpClient)
  return authentication
}
