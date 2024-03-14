export interface InsertDeviceTokenParams {
  accountId: string
}

export interface IinsertDeviceToken {
  perform: (params: InsertDeviceTokenParams, token: string) => Promise<void>
  getToken: () => Promise<string>
}
