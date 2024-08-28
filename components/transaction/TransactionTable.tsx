"use client"

import React from "react";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {TransactionContract} from "@/types/TransactionContract";
import {CategoryContract} from "@/types/CategoryContract";
import EditTransactionForm from "@/components/transaction/EditTransactionForm";
import {Badge} from "@/components/ui/badge";

export default function TransactionTable({transactions, categories}: {
    transactions: TransactionContract[],
    categories: CategoryContract[]
}) {
    return(
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Type</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Value</TableHead>
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
                              <TableCell className={"text-right font-bold"}>{transaction.type == "EXPENSE" && "-"}{transaction.value}</TableCell>
                              <TableCell>{transaction.description}</TableCell>
                          </TableRow>
                        </EditTransactionForm>
                    )
                }
            </TableBody>
        </Table>
    )

}
