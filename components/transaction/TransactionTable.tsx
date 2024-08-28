"use client"

import React from "react";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {TransactionContract} from "@/types/TransactionContract";
import {CategoryContract} from "@/types/CategoryContract";

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
                        <TableRow key={transaction.id}>
                            <TableCell className="font-medium">{transaction.type}</TableCell>
                            <TableCell>{
                                categories.filter(category => category.id == transaction.categoryId)[0]?.name
                            }</TableCell>
                            <TableCell className={"text-right"}>{transaction.type == "EXPENSE" && "-"}{transaction.value}</TableCell>
                            <TableCell>{transaction.description}</TableCell>
                        </TableRow>
                    )
                }
            </TableBody>
        </Table>
    )

}
