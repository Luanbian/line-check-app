import axios from 'axios'
import { type IHttpPostClient, type httpPostParams } from '../../data/protocols/http/http.post.client.protocol'
import { type HttpResponse } from '../../@types/http.response'

export class HttpClientAdapter implements IHttpPostClient {
  async post (params: httpPostParams): Promise<HttpResponse> {
    const httpResponse = await axios.post(params.url, params.body)
    return {
      statusCode: httpResponse.status,
      body: httpResponse.data
    }
  }
}