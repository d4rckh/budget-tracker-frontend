"use server";

import {fetchApi} from "@/actions/fetchApi";
import {SessionContract} from "@/types/SessionContract";
import {cookies} from "next/headers";
import {UserContract} from "@/types/UserContract";

export async function login(email: string, password: string) {
  const session: SessionContract = await fetchApi("/sessions", "POST", {
    tags: ['USER']
  }, {
    email, password
  });
  cookies().set("SESSION", session.sessionKey);
  return session;
}

export async function register(email: string, password: string, firstName: string, lastName: string) {
  const session: UserContract = await fetchApi("/users/register", "POST", {
    tags: ['USER'],
  }, {
    email, firstName, lastName, password
  });
  return session;
}