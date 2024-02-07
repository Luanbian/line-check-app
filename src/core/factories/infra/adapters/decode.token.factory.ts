import { DecodeToken } from '../../../../infra/adapters/decode.token.adapter'
import { type IDecodeToken } from '../../../../infra/protocols/decode.token.protocol'

export const makeDecodeToken = (): IDecodeToken => {
  return new DecodeToken()
}
