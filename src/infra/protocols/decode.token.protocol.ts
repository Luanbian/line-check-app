import { type JwtPayload } from 'jwt-decode'

export interface IuserData extends JwtPayload {
  role: string
  sub: string
}

export interface IDecodeToken {
  decode: (token: string) => Promise<IuserData>
}
