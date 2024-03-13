import { type IHttpClient } from '../../../../infra/protocols/http.post.client.protocol'
import { HttpClientAdapter } from '../../../../infra/adapters/http.client.adapter'

export const makeHttpClient = (): IHttpClient => {
  return new HttpClientAdapter()
}
