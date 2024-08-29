"use server";

import {getSessionDetails} from "@/actions/sessionActions";
import {fetchApi} from "@/actions/fetchApi";
import {TransactionContract} from "@/types/TransactionContract";
import {ClientError} from "@/types/ErrorContract";
import {AccountContract} from "@/types/BudgetContract";
import {CategoryContract} from "@/types/CategoryContract";

export async function getTransactions(): Promise<TransactionContract[]> {
  return (await fetchApi<TransactionContract[]>("/transactions", "GET", {
    tags: ['TRANSACTION']
  })).data || [];
}

export async function newTransaction(transaction: TransactionContract): Promise<ClientError<AccountContract>> {
    return await fetchApi("/transactions", "POST", {
      tags: ['TRANSACTION', 'ACCOUNT']
    }, transaction);
}

export async function deleteTransaction(id: number) {
  return (await fetchApi<CategoryContract>("/transactions/" + id, "DELETE", {
    tags: ['TRANSACTION', 'ACCOUNT']
  }));
}

export async function editTransaction(transaction: TransactionContract): Promise<ClientError<CategoryContract>> {
    return await fetchApi("/transactions/" + transaction.id, "PUT", {
        tags: ['TRANSACTION','ACCOUNT']
    }, transaction);
}

