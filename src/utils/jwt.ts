import { sign, verify } from 'hono/jwt'
import { SECRET, REFRESH_SECRET } from '@/utils/env.js'

export interface IUserToken {
    id: string | number
    role: string
    exp?: number
    [key: string]: any
}

export const generateToken = (user: IUserToken) => {
    const expiresIn = Math.floor(Date.now() / 1000) + (60 * 60 * 3);
    const token = sign({ ...user, exp: expiresIn }, SECRET)
    return token
}

export const refreshGenerateToken = (user: IUserToken) => { 
    const expiresIn = Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7);
    const token = sign({ ...user, exp: expiresIn }, REFRESH_SECRET)
    return token
}

export const getUserData = async (token: string): Promise<IUserToken> => {
    const user = await verify(token, SECRET).catch(() => null)
    if (!user) throw new Error('Invalid token')
    return user as IUserToken
}

export const refreshAccessToken = async (refreshToken: string) => {
    const decoded = await verify(refreshToken, REFRESH_SECRET).catch(() => null) as IUserToken
    if (!decoded) throw new Error('Invalid refresh token')

    const newAccessToken = generateToken({ id: decoded.id, role: decoded.role })
    return newAccessToken
}