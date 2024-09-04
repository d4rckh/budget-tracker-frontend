"use server";

import {cookies} from "next/headers";
import {revalidateTag} from "next/cache";
import {ClientError} from "@/types/ErrorContract";

export async function fetchApi<T>(
  path: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  next: NextFetchRequestConfig = {},
  data: Object | undefined = undefined
): Promise<ClientError<T>> {
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
  if (method != "GET") {
    if (next.tags) next.tags.forEach(revalidateTag);
  }
  let responseBody = await res.text();
  console.log(method, " ", path, " ", res.status, " ", responseBody);
  if (!res.status.toString().startsWith("2")) {
    try {
      return {
        data: null,
        error: JSON.parse(responseBody)
      };
    } catch (error) {
      return {
        data: null,
        error: {
          errors: [responseBody],
          timestamp: 0,
          service: "frontend"
        }
      }
    }
  }
  try {
    return {
      data: JSON.parse(responseBody),
      error: null
    };
  } catch (e) {
    return {data: null, error: null};
  }
}

