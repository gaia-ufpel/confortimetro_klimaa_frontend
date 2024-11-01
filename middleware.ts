import { type NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "./lib/session";

export default async function middleware(req: NextRequest) {
    const protectedRoutes = ['/home'];
    const publicRoutes = ['/login', '/signup'];
    const adminRoutes = ['/metric_types','/metric_types/newmtrictype','/devices', '/devices/newdevice','/locations', '/locations/newlocation', '/profile/edit_user'];

    const path = req.nextUrl.pathname;
    const isProtected = protectedRoutes.includes(path);
    const isPublic = publicRoutes.includes(path);
    const isAdmin = adminRoutes.includes(path);

    const cookie = cookies().get("session")?.value;
    const session = await decrypt(cookie);

    if (isProtected) {
        if (!await session?.userparam) {
            return NextResponse.redirect(new URL('/login', req.nextUrl));
        }
        if (isAdmin && !((await session?.userRole) == 'admin')) {
            return NextResponse.redirect(new URL('/home', req.nextUrl));
        }
    }

    if (isPublic && await session?.userparam) {
        return NextResponse.redirect(new URL('/home', req.nextUrl));
    }
    return NextResponse.next();
}
