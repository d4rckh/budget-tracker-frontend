"use client";

import {Button} from "@/components/ui/button";
import {
  Dialog,
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
import {newAccount} from "@/actions/accountActions";
import {ErrorContract} from "@/types/ErrorContract";

export default function NewAccountDialog() {
  const [type, setType] = useState("");
  const [transactionValue, setTransactionValue] = useState("");
  const [description, setDescription] = useState("");


  const {toast} = useToast();

  return <Dialog>
    <DialogTrigger asChild>
      <Button size={"icon"} className={"rounded-full"} variant={"outline"}>+</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Creating new account</DialogTitle>
        <div className={"pt-3 flex flex-col gap-2"}>

          <Label>Type</Label>
          <Select onValueChange={setType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Choose type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="INCOME">Income</SelectItem>
              <SelectItem value="EXPENSE">Expense</SelectItem>
            </SelectContent>
          </Select>


          <Button onClick={() => {

            newTransaction(type).then((r: String) => toast({
              title: r.toString()
            })).catch((e) => {
              toast({
                title: e
              })
            });

          }}>Create</Button>
        </div>
      </DialogHeader>
    </DialogContent>
  </Dialog>;
}