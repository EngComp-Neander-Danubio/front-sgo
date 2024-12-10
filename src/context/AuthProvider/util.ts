import axios from 'axios'
import { IUser } from './types'

export function setUserLocalStorage(user: IUser | null) {
  console.log('setUserLocalStorage', user)
  localStorage.setItem('u', JSON.stringify(user))
}

export function getUserLocalStorage(): IUser | null {
  const json = localStorage.getItem('u')
  if (!json) {
    return null
  }
  const user = JSON.parse(json)
  return user ?? null
}

export async function LoginRequest(matricula: string, senha: string) {
  try {
    const request = await axios.post((process.env.VITE_APP_URL_API_SEG || '').concat('login'),
      {
        matricula: matricula,
        senha: senha,
        sis_sigla: 'sies',
      },)
    console.log('LoginRequest', request.data)
    return request.data
  } catch (error) {
    return null
  }
}
