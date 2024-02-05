import { type IHttpPostClient } from '../../../../data/protocols/http/http.post.client.protocol'
import { HttpClientAdapter } from '../../../../infra/adapters/http.client.adapter'

export const makeHttpClient = (): IHttpPostClient => {
  return new HttpClientAdapter()
}
