import { type JwtPayload, jwtDecode } from 'jwt-decode'
import { decode } from 'base-64'
global.atob = decode

interface IuserData extends JwtPayload {
  role: string
}
export default function decodeToken (token: string): string | undefined {
  try {
    const decodedToken = jwtDecode(token) as IuserData
    return decodedToken.role
  } catch (error) {
    console.error(error)
    throw new Error('Error during decoding')
  }
}
