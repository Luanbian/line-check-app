import { type accountProps } from '../../domain/entities/account'

export interface authParamns {
  email: string
  password: string
}

export interface IAuthentication {
  auth: (params: authParamns) => Promise<accountProps>
}
