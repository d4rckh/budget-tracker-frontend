"use server";

import {getSessionDetails} from "@/actions/sessionActions";
import {fetchApi} from "@/actions/fetchApi";
import {TransactionContract} from "@/types/TransactionContract";

export async function getTransactions(): Promise<TransactionContract[]> {
  try {
    const session = await getSessionDetails();
    return await fetchApi("/transactions", "GET", {
      tags: ['TRANSACTION']
    });
  } catch (e) {
    return [];
  }
}

export async function newTransaction(transaction: TransactionContract): Promise<String> {
  try {
    await fetchApi("/transactions", "POST", {
      tags: ['TRANSACTION']
    }, transaction);
  } catch ({message}) {
    return JSON.stringify({message});
  }
  return "Successfully created transaction";
}