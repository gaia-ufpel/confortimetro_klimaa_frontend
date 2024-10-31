import { type NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "./lib/session";

export default async function middleware(req: NextRequest) {
    const protectedRoutes = ['/home'];
    const publicRoutes = ['/login', '/signup'];

    const path = req.nextUrl.pathname;
    const isProtected = protectedRoutes.includes(path);
    const isPublic = publicRoutes.includes(path);

    const cookie = cookies().get("session")?.value;
    const session = await decrypt(cookie);

    if (isProtected && !await session?.userparam) {
        return NextResponse.redirect(new URL('/login', req.nextUrl));
    }

    if (isPublic && await session?.userparam) {
        return NextResponse.redirect(new URL('/home', req.nextUrl));
    }
    return NextResponse.next();
}
