"use server";

import {fetchApi} from "@/actions/fetchApi";
import {UserContract} from "@/types/UserContract";
import {getSessionDetails} from "@/actions/sessionActions";

export async function getUserDetails(): Promise<UserContract | null> {
  try {
    const session = await getSessionDetails();
    return await fetchApi("/users/" + session?.userId, "GET", {
      tags: ['USER']
    });
  } catch (e) {
    return null;
  }
}

export async function sendVerificationEmail(): Promise<Boolean | null> {
  try {
    const session = await getSessionDetails();
    return await fetchApi("/users/verify", "POST", {}, {
      userId: session?.userId
    });
  } catch (e) {
    return Promise.reject(e);
  }
}

export async function verifyEmail(token: String): Promise<Boolean | null> {
  try {
    return await fetchApi("/users/verify/" + token, "PUT", {tags: ["USER"]});
  } catch (e) {
    return Promise.reject(e);
  }
}

export async function requestPasswordChange(): Promise<Boolean | null> {
  try {
    const session = await getSessionDetails();
    return await fetchApi("/users/recovery", "POST", {}, {
      userId: session?.userId
    });
  } catch (e) {
    return Promise.reject(e);
  }
}

export async function changePasswordWithToken(token: string, password: string): Promise<Boolean | null> {
  try {
    return await fetchApi("/users/recovery/" + token, "PUT", { tags: ['USER'] }, {
      password
    });
  } catch (e) {
    return Promise.reject(e);
  }
}
