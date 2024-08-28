"use client"

import {CategoryContract} from "@/types/CategoryContract";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import React from "react";

export default function CategoriesTable({categories}: {
    categories: CategoryContract[]
}) {
    return(
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Id</TableHead>
                    <TableHead>Name</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    categories.map(category =>
                        <TableRow key={category.id}>
                            <TableCell className="font-medium">{category.id}</TableCell>
                            <TableCell>{category.name}</TableCell>
                        </TableRow>
                    )
                }
            </TableBody>
        </Table>
    )

}