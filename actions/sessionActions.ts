"use server";

import {fetchApi} from "@/actions/fetchApi";
import {SessionContract} from "@/types/SessionContract";
import {cookies} from "next/headers";

export async function getSessionDetails(): Promise<SessionContract | null> {
    return (await fetchApi<SessionContract>("/sessions/" + cookies().get("SESSION")?.value, "GET", {
        tags: ["USER"]
    })).data;
}