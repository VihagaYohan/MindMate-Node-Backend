import jwt from 'jsonwebtoken'

// models
import TokenPayload from '../../models/token'

const generateAccessToken = async (payload: TokenPayload): Promise<string> => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '7d' })
}

const generateRefreshToken = async (payload: TokenPayload): Promise<string> => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: '7d' })
}

const verifyAccessToken = async (token: string): Promise<TokenPayload> => {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as TokenPayload
}

const verifyRefreshToken = async (token: string): Promise<TokenPayload> => {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET as string) as TokenPayload
}

export default {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken
}