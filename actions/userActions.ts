"use server";

import {fetchApi} from "@/actions/fetchApi";
import {UserContract} from "@/types/UserContract";
import {getSessionDetails} from "@/actions/sessionActions";
import {ClientError} from "@/types/ErrorContract";
import {cookies} from "next/headers";

export async function getUserDetails(): Promise<ClientError<UserContract>> {
    const session = await getSessionDetails();
    return await fetchApi("/users/" + session?.userId, "GET", {
        tags: ['USER']
    });
}

export async function sendVerificationEmail(): Promise<ClientError<Boolean>> {
    const session = await getSessionDetails();
    return await fetchApi("/users/verify", "POST", {}, {
        userId: session?.userId
    });
}

export async function verifyEmail(token: String): Promise<ClientError<Boolean>> {
    return await fetchApi("/users/verify/" + token, "PUT", {tags: ["USER"]});
}

export async function requestPasswordChange(userId: number = -1, email: string | null = null): Promise<ClientError<Boolean>> {
    const session = await getSessionDetails();
    return await fetchApi("/users/recovery", "POST", {}, {
        userId: session?.userId || userId,
        email
    });
}

export async function changePasswordWithToken(token: string, password: string): Promise<ClientError<Boolean>> {
    return await fetchApi("/users/recovery/" + token, "PUT", {tags: ['USER']}, {
        password
    });
}

export async function verifyWithToken(token: string): Promise<ClientError<Boolean>> {
    return await fetchApi("/users/verify/" + token, "PUT", {tags: ['USER']});
}

export async function deleteSession(): Promise<ClientError<Boolean>> {
    const r = await fetchApi<Boolean>("/sessions/" + cookies().get("SESSION")?.value, "DELETE", {tags: ['USER']});

    console.log(r);

    cookies().delete("SESSION");

    return r;
}
