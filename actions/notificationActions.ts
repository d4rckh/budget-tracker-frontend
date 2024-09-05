"use server";

import {getSessionDetails} from "@/actions/sessionActions";
import {fetchApi} from "@/actions/fetchApi";
import {TransactionContract} from "@/types/TransactionContract";
import {ClientError} from "@/types/ErrorContract";
import {AccountContract} from "@/types/BudgetContract";
import {CategoryContract} from "@/types/CategoryContract";
import {revalidateTag} from "next/cache";

export type NotificationContract = {
    id: number,
    userId: number,
    email: string,
    payload: Record<string, any>,
    createdAt: string,
    type: string,
    channels: string[],
    markedAsRead: boolean
}

export async function getNotifications(): Promise<NotificationContract[]> {
    return (await fetchApi<NotificationContract[]>("/notifications", "GET", {
        tags: ['NOTIFICATION']
    })).data || [];
}

export async function markNotificationAsRead(id: number) {
    return (await fetchApi("/notifications/read/" + id, "PUT", {
        tags: ['NOTIFICATION']
    }));
}

export async function refreshNotifications() {
    revalidateTag("NOTIFICATION")
    return true;
}
