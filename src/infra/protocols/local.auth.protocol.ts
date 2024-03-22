export interface authSituation {
  isSuccess: boolean
  error: string | undefined
  warning: string | undefined
}

export interface ILocalAuth {
  authenticate: () => Promise<authSituation>
}
