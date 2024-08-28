"use client"

import {CategoryContract} from "@/types/CategoryContract";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import React from "react";
import {Button} from "@/components/ui/button";
import EditCategoryForm from "@/components/categories/EditCategoryForm";
import DeleteCategoryForm from "@/components/categories/DeleteCategoryForm";

export default function CategoriesTable({categories}: {
    categories: CategoryContract[]
}) {
    return(
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    categories.map(category =>
                        <TableRow key={category.id}>
                            <TableCell className="font-medium">{category.id}</TableCell>
                            <TableCell>{category.name}</TableCell>
                            <TableCell>
                                <EditCategoryForm category={category} />
                                <DeleteCategoryForm category={category} />
                            </TableCell>
                        </TableRow>
                    )
                }
            </TableBody>
        </Table>
    )

}