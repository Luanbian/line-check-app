import axios, { type AxiosResponse } from 'axios'
import { type IHttpClient, type httpParams } from '../../data/protocols/http/http.post.client.protocol'
import { type HttpResponse } from '../../@types/http.response'

export class HttpClientAdapter implements IHttpClient {
  async request (params: httpParams): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse
    try {
      axiosResponse = await axios.request({
        url: params.url,
        method: params.method,
        data: params.body
      })
    } catch (error) {
      axiosResponse = (error as any).response
    }
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }
}
