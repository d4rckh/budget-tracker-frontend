"use client"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {useState} from "react";
import {useToast} from "@/components/ui/use-toast";
import {Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {deleteAccount, editAccount, newAccount} from "@/actions/accountActions";
import {ClientError} from "@/types/ErrorContract";
import {AccountContract} from "@/types/BudgetContract";


export default function EditAccountDialog({account, children}: {
    account: AccountContract,
    children: React.ReactNode
}) {
    const [name, setName] = useState(account.name);
    const [currency, setCurrency] = useState(account.currency);
    const [type, setType] = useState<"CHECKING" | "DEBT" | "CASH" | "SAVINGS">(account.type);

    const {toast} = useToast();

    return <Dialog>
        <DialogTrigger asChild>
            {children}
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Editing a account</DialogTitle>
                <div className={"pt-3 flex flex-col gap-2"}>
                    <Label htmlFor="name">Name</Label>
                    <Input value={name} onChange={(e) => setName(e.target.value)} id="name"/>

                    <Label>Type</Label>
                    <Select value={type} onValueChange={(e: "CHECKING" | "DEBT" | "CASH" | "SAVINGS") => setType(e)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Choose type"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="CHECKING">Checking</SelectItem>
                            <SelectItem value="DEBT">Debt</SelectItem>
                            <SelectItem value="CASH">Cash</SelectItem>
                            <SelectItem value="SAVINGS">Savings</SelectItem>
                        </SelectContent>
                    </Select>

                    <Label>Currency</Label>
                    <Select value={currency} onValueChange={setCurrency}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Choose currency"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="RON">RON</SelectItem>
                            <SelectItem value="USD">USD</SelectItem>
                            <SelectItem value="EUR">EUR</SelectItem>
                        </SelectContent>
                    </Select>

                    <DialogClose asChild>
                        <Button onClick={() => {

                            editAccount({
                                name, currency, type,
                                userId: account.userId,
                                balance: account.balance,
                                id: account.id
                            }).then((r: ClientError<any>) => toast({
                                title: r.error ? JSON.stringify(r.error) : "Successfully edited account",
                            }))

                        }}>Edit</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button variant={"destructive-outline"}
                                onClick={() => deleteAccount(account.id).then(r => toast({
                                    title: r.error ? JSON.stringify(r.error) : "Deleted successfully",
                                }))}>Delete</Button>
                    </DialogClose>
                </div>
            </DialogHeader>
        </DialogContent>
    </Dialog>;
}