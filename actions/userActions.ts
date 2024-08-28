"use server";

import {fetchApi} from "@/actions/fetchApi";
import {UserContract} from "@/types/UserContract";
import {getSessionDetails} from "@/actions/sessionActions";
import {ClientError} from "@/types/ErrorContract";

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

export async function requestPasswordChange(): Promise<ClientError<Boolean>> {
  const session = await getSessionDetails();
  return await fetchApi("/users/recovery", "POST", {}, {
    userId: session?.userId
  });
}

export async function changePasswordWithToken(token: string, password: string): Promise<ClientError<Boolean>> {
  return await fetchApi("/users/recovery/" + token, "PUT", { tags: ['USER'] }, {
    password
  });
}
