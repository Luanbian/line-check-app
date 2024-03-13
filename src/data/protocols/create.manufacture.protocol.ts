export interface ManufactureParams {
  manufacture: string
}

export interface ICreateManufacture {
  perform: (data: ManufactureParams, token: string) => Promise<void>
}
