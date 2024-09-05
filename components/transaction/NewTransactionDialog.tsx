"use client";

import {Button} from "@/components/ui/button";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {useState} from "react";
import {useToast} from "@/components/ui/use-toast";

import {ClientError, ErrorContract} from "@/types/ErrorContract";
import {newTransaction} from "@/actions/transactionActions";

import {AccountContract} from "@/types/BudgetContract";

import {CategoryContract} from "@/types/CategoryContract";


export default function NewTransactionDialog({
                                                 accounts,
                                                 userId,
                                                 categories,
                                             }: {
    accounts: AccountContract[];
    userId: number;
    categories: CategoryContract[];
}) {
    const [type, setType] = useState<"INCOME" | "EXPENSE">("INCOME");
    const [transactionValue, setTransactionValue] = useState(0);
    const [description, setDescription] = useState("");
    const [accountId, setAccountId] = useState(0);
    const [categoryId, setCategoryId] = useState(0);

    const {toast} = useToast();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size={"icon"} className={"rounded-full"} variant={"outline"}>
                    +
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Creating new transaction</DialogTitle>
                    <div className={"pt-3 flex flex-col gap-2"}>
                        <Label>Type</Label>
                        <Select onValueChange={(e: "INCOME" | "EXPENSE") => setType(e)}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Choose type"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="INCOME">Income</SelectItem>
                                <SelectItem value="EXPENSE">Expense</SelectItem>
                            </SelectContent>
                        </Select>

                        <Label>Account</Label>
                        <Select
                            onValueChange={(e: string) => setAccountId(parseInt(e))}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Choose account"/>
                            </SelectTrigger>
                            <SelectContent>
                                {accounts.map((account) => (
                                    <SelectItem key={account.id} value={account.id.toString()}>
                                        {account.name} ({account.currency})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Label>Category</Label>
                        <Select
                            onValueChange={(e: string) => setCategoryId(parseInt(e))}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Choose category"/>
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((category) => (
                                    <SelectItem key={category.id} value={category.id.toString()}>
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Label>Description</Label>
                        <Input
                            onChange={(e) => setDescription(e.target.value)}
                            id="description"
                        />

                        <Label>Value</Label>
                        <Input
                            type={"number"}
                            onChange={(e) => setTransactionValue(parseInt(e.target.value))}
                            id="value"
                        />

                        <DialogClose asChild>
                            <Button
                                onClick={() => {
                                    newTransaction({
                                        id: 1,
                                        type,
                                        userId: userId,
                                        value: transactionValue,
                                        description: description,
                                        categoryId: categoryId,
                                        accountId: accountId,
                                        timestamp: new Date().toISOString(),
                                    }).then((r: ClientError<any>) =>
                                        toast({
                                            title: r.error
                                                ? JSON.stringify(r.error)
                                                : "Successfully created transaction",
                                        })
                                    );
                                }}
                            >
                                Create
                            </Button>
                        </DialogClose>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
