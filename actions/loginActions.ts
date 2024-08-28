"use server";

import {fetchApi} from "@/actions/fetchApi";
import {SessionContract} from "@/types/SessionContract";
import {cookies} from "next/headers";
import {UserContract} from "@/types/UserContract";

export async function login(email: string, password: string) {
  const session = await fetchApi<SessionContract>("/sessions", "POST", {
    tags: ['USER']
  }, {
    email, password
  });
  if (session.data)
    cookies().set("SESSION", session.data.sessionKey);
  return session.data;
}

export async function register(email: string, password: string, firstName: string, lastName: string) {
  const session = await fetchApi<UserContract>("/users/register", "POST", {
    tags: ['USER'],
  }, {
    email, firstName, lastName, password
  });
  return session.data;
}