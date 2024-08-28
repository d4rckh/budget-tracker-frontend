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
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";


export default function NewTransactionDialog() {
    const [name, setName] = useState("");
    const [currency, setCurrency] = useState("");
    const [type, setType] = useState("");

    const {toast} = useToast();

    return <Dialog>
        <DialogTrigger asChild>
            <Button size={"icon"} className={"rounded-full"} variant={"outline"}>+</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Creating new account</DialogTitle>
                <div className={"pt-3 flex flex-col gap-2"}>
                    <Label htmlFor="name">Name</Label>
                    <Input onChange={(e) => setName(e.target.value)} id="name"/>

                    <Label>Type</Label>
                    <Select onValueChange={setType}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Choose type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="CHECKING">Checking</SelectItem>
                            <SelectItem value="DEBT">Debt</SelectItem>
                            <SelectItem value="CASH">Cash</SelectItem>
                            <SelectItem value="SAVINGS">Savings</SelectItem>
                        </SelectContent>
                    </Select>

                    <Label>Currency</Label>
                    <Select onValueChange={setCurrency}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Choose currency" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="RON">RON</SelectItem>
                            <SelectItem value="USD">USD</SelectItem>
                            <SelectItem value="EUR">EUR</SelectItem>
                        </SelectContent>
                    </Select>

                    <Button onClick={() => {


                    }}>Create</Button>
                </div>
            </DialogHeader>
        </DialogContent>
    </Dialog>;
}