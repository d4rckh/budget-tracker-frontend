"use server";

import {getSessionDetails} from "@/actions/sessionActions";
import {fetchApi} from "@/actions/fetchApi";
import {TransactionContract} from "@/types/TransactionContract";
import {ClientError} from "@/types/ErrorContract";
import {AccountContract} from "@/types/BudgetContract";

export async function getTransactions(): Promise<TransactionContract[]> {
  return (await fetchApi<TransactionContract[]>("/transactions", "GET", {
    tags: ['TRANSACTION']
  })).data || [];
}

export async function newTransaction(transaction: TransactionContract): Promise<ClientError<AccountContract>> {
    return await fetchApi("/transactions", "POST", {
      tags: ['TRANSACTION']
    }, transaction);
}