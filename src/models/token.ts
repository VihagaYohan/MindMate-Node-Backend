import { Types } from 'mongoose'

interface TokenPayload {
    id: Types.ObjectId;
    userType: "user" | "consultant" | "admin"
}

export default TokenPayload