import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;
const encondedKey = new TextEncoder().encode(secretKey);

type SessionPayload = {
    userId: string;
    userRole: string;
    expiresAt: Date;
}

export async function encrypt(payload: SessionPayload) {
    const jwt = await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(encondedKey);

    return jwt;
}

export async function decrypt(session: string | undefined = "") {
    try {

        const { payload } = await jwtVerify(session, encondedKey, { algorithms: ["HS256"] });

        return payload;
    }
    catch (e) {
        console.log(e);
    }
}

export async function createSession(userId: string, userRole: string, token: string) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const session = await encrypt({ userId, userRole, expiresAt });

    cookies().set("session", session, {
        expires: expiresAt,
        httpOnly: true,
        secure: true,
    });

    cookies().set('token', token, {
        expires: expiresAt,
    });

}

export async function deleteSession() {
    cookies().delete("session");
    cookies().delete("token");
}

export async function checkUserIsAdmin() {
    const session = cookies().get("session")?.value;
    const payload = await decrypt(session);
    return payload?.userRole === "admin";
}