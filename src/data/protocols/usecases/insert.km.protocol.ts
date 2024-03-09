export interface InsertKmParams {
  init: number
  final: number
}

export interface IinsertKm {
  perform: (params: InsertKmParams, workId: string, accountId: string, token: string) => Promise<void>
}
