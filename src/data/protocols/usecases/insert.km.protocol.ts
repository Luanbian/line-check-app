export interface InsertKmParams {
  initialKm: number
  finalKm: number
}

export interface IinsertKm {
  perform: (params: InsertKmParams, workId: string, accountId: string, token: string) => Promise<void>
}
