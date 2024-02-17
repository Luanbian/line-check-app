import { type IuserData, type IDecodeToken } from '../../protocols/decode.token.protocol'

export const makeDecodedTokenMock = (): IDecodeToken => {
  class DecodedTokenMock implements IDecodeToken {
    public async decode (token: string): Promise<IuserData> {
      return {
        role: 'DRIVER',
        sub: 'fake_logged_user_id'
      }
    }
  }
  return new DecodedTokenMock()
}
