export interface httpPostParams {
  url: string
}

export interface IHttpPostClient {
  post: (params: httpPostParams) => Promise<void>
}
