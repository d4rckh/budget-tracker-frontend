"use server";

import {fetchApi} from "@/actions/fetchApi";
import {UserContract} from "@/types/UserContract";
import {getSessionDetails} from "@/actions/sessionActions";
import {AccountContract} from "@/types/BudgetContract";
import {ErrorContract} from "@/types/ErrorContract";

export async function getAccounts(): Promise<AccountContract[]> {
  try {
    const session = await getSessionDetails();
    return await fetchApi("/accounts", "GET", {
      tags: ['ACCOUNT']
    });
  } catch (e) {
    return []
  }
}

export async function newAccount(name: string, currency: string, type: string, balance: number = 0): Promise<String> {
  const session = await getSessionDetails();

  try {
    await fetchApi("/accounts", "POST", {
      tags: ['ACCOUNT']
    }, {
      name, currency, type, balance, id: 2, userId: session?.userId
    });
  } catch ({message}) {
    return JSON.stringify({message});
  }
  return "Successfully created account";
}
