import { type JwtPayload } from 'jwt-decode'

export interface IuserData extends JwtPayload {
  role: string
}

export interface IDecodeToken {
  decode: (token: string) => string | undefined
}
