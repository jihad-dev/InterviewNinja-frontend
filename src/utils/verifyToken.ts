import { jwtDecode, JwtPayload } from 'jwt-decode'
import type { IUser } from '../types/user.types'

const verifyToken = async (token: string): Promise<IUser & JwtPayload> => {
    return jwtDecode<IUser & JwtPayload>(token)
}

export default verifyToken
