"use server";

import {getSessionDetails} from "@/actions/sessionActions";
import {fetchApi} from "@/actions/fetchApi";
import {TransactionContract} from "@/types/TransactionContract";
import {ClientError} from "@/types/ErrorContract";
import {AccountContract} from "@/types/BudgetContract";
import {CategoryContract} from "@/types/CategoryContract";

export type NotificationContract = {
  id: number,
  userId: number,
  email: string,
  payload: Record<string, any>,
  createdAt: string,
  type: string,
  channels: string[]
}

export async function getNotifications(): Promise<NotificationContract[]> {
  return (await fetchApi<NotificationContract[]>("/notifications", "GET", {
    tags: ['NOTIFICATION']
  })).data || [];
}
