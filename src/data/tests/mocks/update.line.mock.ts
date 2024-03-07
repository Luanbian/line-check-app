import { type CreateLineCheckParams } from '../../protocols/usecases/create.line.protocol'
import { type IUpdateLine } from '../../protocols/usecases/update.line.protocol'

export const makeUpdateLineMock = (): IUpdateLine => {
  class UpdateLineMock implements IUpdateLine {
    public async perform (params: CreateLineCheckParams, workId: string, token: string): Promise<void> {}
  }
  return new UpdateLineMock()
}
