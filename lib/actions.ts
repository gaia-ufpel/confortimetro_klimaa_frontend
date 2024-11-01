"use server"
import { loginSchema } from "./types";
import { fetchlogin, getUserInfo } from "./shared_fetchers";
import { createSession } from "./session";
import { redirect } from "next/navigation";
import { deleteSession } from "./session";

export async function login(prevState: any, formData: FormData) {
    const result = loginSchema.safeParse(Object.fromEntries(formData));

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors,
        };
    }
    const { email } = result.data;
    const loginresponse = await fetchlogin(result.data);
    const loginauth = loginresponse.auth

    const userInfo = await getUserInfo();
    const role = userInfo.is_admin ? "admin" : "user";

    if (loginauth == undefined || (typeof loginauth === 'boolean' && loginauth)) {
        return {
            errors: {
                email: ["Email ou senha incorretos"],
            }
        };
    }
    await createSession(email, role, loginresponse.token);
    redirect("/home");
}

export async function logout() {
    await deleteSession();
    redirect("/login");
}