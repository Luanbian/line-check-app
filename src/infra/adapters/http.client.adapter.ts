import axios, { type AxiosResponse } from 'axios'
import { type IHttpPostClient, type httpPostParams } from '../../data/protocols/http/http.post.client.protocol'
import { type HttpResponse } from '../../@types/http.response'

export class HttpClientAdapter implements IHttpPostClient {
  async post (params: httpPostParams): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse
    try {
      axiosResponse = await axios.request({
        url: params.url,
        method: 'POST',
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
