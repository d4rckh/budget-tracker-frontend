"use server";

import {cookies} from "next/headers";
import {revalidateTag} from "next/cache";

export async function fetchApi<T>(
  path: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  next: NextFetchRequestConfig = {},
  data: Object | undefined = undefined
): Promise<T> {
  const cooks = cookies();

  const res = await fetch("http://localhost:8090" + path, {
    method,
    next,
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "X-SESSION": cooks.get("SESSION")?.value || ''
    }
  });

  let responseBody = await res.text();
  console.log(path, " ", res.status, " ", responseBody);
  if (res.status !== 200) {
    return Promise.reject(new Error(responseBody));
  }
  if (method != "GET") {
    if (next.tags) next.tags.forEach(revalidateTag);
  }
  return JSON.parse(responseBody);
}

