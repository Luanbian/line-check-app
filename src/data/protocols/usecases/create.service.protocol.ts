export interface ServiceParams {
  service: string
}

export interface ICreateService {
  perform: (data: ServiceParams, token: string) => Promise<void>
}
