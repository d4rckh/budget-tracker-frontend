"use server";

import {fetchApi} from "@/actions/fetchApi";
import {UserContract} from "@/types/UserContract";
import {getSessionDetails} from "@/actions/sessionActions";
import {AccountContract} from "@/types/BudgetContract";
import {ClientError, ErrorContract} from "@/types/ErrorContract";
import {CategoryContract} from "@/types/CategoryContract";

export async function getAccounts(): Promise<AccountContract[]> {
  return (await fetchApi<AccountContract[]>("/accounts", "GET", {
    tags: ['ACCOUNT']
  })).data || [];
}

export async function newAccount(name: string, currency: string, type: string, balance: number = 0): Promise<ClientError<AccountContract>> {
  const session = await getSessionDetails();
  return await fetchApi("/accounts", "POST", {
    tags: ['ACCOUNT']
  }, {
    name, currency, type, balance, id: 2, userId: session?.userId
  });
}

export async function deleteAccount(id: number) {
  return (await fetchApi<CategoryContract>("/accounts/" + id, "DELETE", {
    tags: ['ACCOUNT']
  })).data;
}