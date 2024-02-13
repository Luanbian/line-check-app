export enum HttpStatusCode {
  ok = 200,
  created = 201,
  noContent = 204,
  unathorized = 401 | 403,
  badRequest = 400
}

export interface HttpResponse {
  statusCode: HttpStatusCode
  body?: unknown
}
