import axios from 'axios'
import { type httpPostParams } from '../../data/protocols/http/http.post.client.protocol'

export class HttpClientAdapter {
  async post (params: httpPostParams): Promise<void> {
    await axios(params.url)
  }
}
