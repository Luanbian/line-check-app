import { jwtDecode } from 'jwt-decode'
import { decode } from 'base-64'
import { type IuserData, type IDecodeToken } from '../protocols/decode.token.protocol'
global.atob = decode

export class DecodeToken implements IDecodeToken {
  public async decode (token: string): Promise<IuserData> {
    try {
      const decodedToken = jwtDecode(token) as IuserData
      return decodedToken
    } catch (error) {
      console.error(error)
      throw new Error('Error during decoding')
    }
  }
}
