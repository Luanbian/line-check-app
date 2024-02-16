export interface UpdateLineCheckParams {
  workId: string
  accountId: string
  marker: LinecheckOptions
  token: string
}

export type LinecheckOptions = 'STARTJOURNEYREAL' | 'STARTLINEREAL' | 'ENDLINEREAL'

export interface IUpdateLineCheck {
  perform: (params: UpdateLineCheckParams) => Promise<void>
}
