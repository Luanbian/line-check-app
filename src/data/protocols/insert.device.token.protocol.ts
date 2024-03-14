export interface InsertDeviceTokenParams {
  accountId: string
  deviceToken: string
}

export interface IinsertDeviceToken {
  perform: (params: InsertDeviceTokenParams, token: string) => Promise<void>
}
