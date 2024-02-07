import { type IDecodeToken } from '../../protocols/decode.token.protocol'

export const makeDecodedTokenMock = (): IDecodeToken => {
  class DecodedTokenMock implements IDecodeToken {
    public decode (token: string): string | undefined {
      return 'DRIVER'
    }
  }
  return new DecodedTokenMock()
}
