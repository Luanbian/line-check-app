import { type CreateLineCheckParams } from './create.line.protocol'

export interface UpdateLineParams {
  params: CreateLineCheckParams
  workId: string
  token: string
}

export interface IUpdateLine {
  perform: (params: UpdateLineParams) => Promise<void>
}
