import { ReactNode } from 'react'

export interface IUser {
  email?: string
  token?: string
  user?: string
  matricula?: string
  senha?: string,
  nome?: string,
  id?: string
}

export interface IContext extends IUser {
  authenticate: (matricula: string, senha: string) => Promise<void>
  isTokenValid: (token?: string) => boolean
  logout: () => void
}

export interface IAuthProvider {
  children: ReactNode
}

export interface IDecodedToken {
  sub: string
  iat: number
  exp: number
}
