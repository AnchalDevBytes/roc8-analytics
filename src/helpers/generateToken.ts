import jwt from "jsonwebtoken";

const tokenSecret = process.env.TOKEN_SECRET ?? "tokenSecret";

export const generateToken = ( user: { id: number; email: string; name?: string | null }) => {
    return jwt.sign({
        userId: user.id,
        email: user.email,
        name: user.name
    }, tokenSecret, { expiresIn : '1d' });
}
