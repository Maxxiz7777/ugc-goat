import { SignJWT, jwtVerify } from "jose";

const secret = process.env.SESSION_SECRET;

if (!secret) {
  throw new Error("SESSION_SECRET is not configured.");
}

const secretKey = new TextEncoder().encode(secret);

export async function createSession(userId: number, role: string) {
  return new SignJWT({ userId, role })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretKey);
}

export async function verifySession(token: string) {
  const { payload } = await jwtVerify(token, secretKey);

  return {
    userId: Number(payload.userId),
    role: String(payload.role),
  };
}