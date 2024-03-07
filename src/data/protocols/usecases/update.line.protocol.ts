import { type CreateLineCheckParams } from './create.line.protocol'

export interface IUpdateLine {
  perform: (params: CreateLineCheckParams, workId: string, token: string) => Promise<void>
}
