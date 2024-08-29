"use client"

import React from "react";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {TransactionContract} from "@/types/TransactionContract";
import {CategoryContract} from "@/types/CategoryContract";
import EditTransactionForm from "@/components/transaction/EditTransactionForm";
import {Badge} from "@/components/ui/badge";
import {AccountContract} from "@/types/BudgetContract";

export default function TransactionTable({transactions, categories, accounts}: {
    transactions: TransactionContract[],
    categories: CategoryContract[],
    accounts: AccountContract[]
}) {
    return(
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Type</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Value</TableHead>
                    <TableHead>Account</TableHead>
                    <TableHead>Description</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    transactions.map(transaction =>
                        <EditTransactionForm transaction={transaction} categories={categories} key={transaction.id}>
                          <TableRow className={"cursor-pointer"} key={transaction.id}>
                              <TableCell className="font-medium"><Badge>{transaction.type}</Badge></TableCell>
                              <TableCell><Badge variant={"outline"}>{
                                categories.filter(category => category.id == transaction.categoryId)[0]?.name
                              }</Badge> </TableCell>
                              <TableCell className={"text-right font-bold"}>{transaction.type == "EXPENSE" && "-"}{transaction.value} {
                                accounts.filter(account => account.id == transaction.accountId)[0]?.currency
                              }</TableCell>
                              <TableCell>
                                {
                                  accounts.filter(account => account.id == transaction.accountId)[0]?.name
                                }
                              </TableCell>
                              <TableCell>{transaction.description}</TableCell>
                          </TableRow>
                        </EditTransactionForm>
                    )
                }
            </TableBody>
        </Table>
    )

}
