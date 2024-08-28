"use client"

import {CategoryContract} from "@/types/CategoryContract";
import {useState} from "react";
import {useToast} from "@/components/ui/use-toast";
import {Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {deleteCategory, editCategory} from "@/actions/categoryActions";
import {ClientError} from "@/types/ErrorContract";
import {TransactionContract} from "@/types/TransactionContract";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {deleteTransaction, editTransaction} from "@/actions/transactionActions";

export default function EditTransactionForm({transaction, categories ,children}: {transaction: TransactionContract,categories : CategoryContract[], children: React.ReactNode}) {
    const [type, setType] = useState<"INCOME" | "EXPENSE">(transaction.type);
    const [transactionValue, setTransactionValue] = useState(transaction.value);
    const [description, setDescription] = useState(transaction.description);
    const [categoryId, setCategoryId] = useState(transaction.categoryId);

    const {toast} = useToast();

    return <Dialog>
        <DialogTrigger asChild>
            {children}
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Editing a Transaction</DialogTitle>
                <div className={"pt-3 flex flex-col gap-2"}>
                    <Label htmlFor="name">Type</Label>
                    <Select value={type} onValueChange={(e: "INCOME" | "EXPENSE") => setType(e)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Choose type"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="INCOME">Income</SelectItem>
                            <SelectItem value="EXPENSE">Expense</SelectItem>
                        </SelectContent>
                    </Select>

                    <Label>Category</Label>
                    <Select value={categoryId.toString()} onValueChange={(e: string) => setCategoryId(parseInt(e))}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Choose category"/>
                        </SelectTrigger>
                        <SelectContent>
                            {
                                categories.map(category =>
                                  <SelectItem key={category.id}
                                              value={category.id.toString()}>{category.name}</SelectItem>
                                )
                            }
                        </SelectContent>
                    </Select>

                    <Label>Description</Label>
                    <Input onChange={(e) => setDescription(e.target.value)} id="description"/>

                    <Label>Value</Label>
                    <Input value={transactionValue} type={"number"}
                           onChange={(e) => setTransactionValue(parseInt(e.target.value))} id="value"/>

                    <DialogClose asChild>
                        <Button onClick={() => {

                            editTransaction({
                                type,
                                categoryId,
                                value: transactionValue,
                                description,
                                id: transaction.id,
                                userId: transaction.userId,
                                accountId: transaction.accountId,
                                timestamp: transaction.timestamp,
                            }).then((r: ClientError<any>) => toast({
                                title: r.error ? JSON.stringify(r.error) : "Successfully edited category",
                            }))

                        }}>Edit</Button>
                    </DialogClose>

                    <DialogClose asChild>

                        <Button variant={"destructive"} onClick={() => {

                            deleteTransaction(transaction.id).then((r: ClientError<any>) => toast({
                                title: r.error ? JSON.stringify(r.error) : "Successfully deleted transaction",
                            }))

                        }}>Delete</Button>
                    </DialogClose>
                </div>
            </DialogHeader>
        </DialogContent>
    </Dialog>
;
}