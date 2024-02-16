export interface UpdateLineCheckParams {
  workId: string
  accountId: string
  marker: 'STARTJOURNEYREAL' | 'STARTLINEREAL' | 'ENDJOURNEYREAL'
  token: string
}

export interface IUpdateLineCheck {
  perform: (params: UpdateLineCheckParams) => Promise<void>
}
