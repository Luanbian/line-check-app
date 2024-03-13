export interface LogisticParam {
  logistic: string
}

export interface ICreateLogistic {
  perform: (data: LogisticParam, token: string) => Promise<void>
}
