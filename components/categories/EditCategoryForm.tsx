"use client"

import {AccountContract} from "@/types/BudgetContract";
import {useState} from "react";
import {useToast} from "@/components/ui/use-toast";
import {Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {editAccount} from "@/actions/accountActions";
import {ClientError} from "@/types/ErrorContract";
import {CategoryContract} from "@/types/CategoryContract";
import {deleteCategory, editCategory} from "@/actions/categoryActions";

export default function EditCategoryForm({category}: {category: CategoryContract}) {
    const [name, setName] = useState(category.name);

    const {toast} = useToast();

    return <Dialog>
        <DialogTrigger asChild>
            <Button size={"icon"} className={"rounded-full"} variant={"outline"}>edit</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Editing a category</DialogTitle>
                <div className={"pt-3 flex flex-col gap-2"}>
                    <Label htmlFor="name">Name</Label>
                    <Input value={name} onChange={(e) => setName(e.target.value)} id="name"/>

                    <DialogClose asChild>
                        <Button onClick={() => {

                            editCategory({
                                id:category.id,
                                name,
                                userId: category.userId
                            }).then((r: ClientError<any>) => toast({
                                title: r.error ? JSON.stringify(r.error) : "Successfully edited category",
                            }))

                        }}>Edit</Button>
                    </DialogClose>

                    <DialogClose asChild>

                        <Button variant={"destructive"} onClick={() => {

                            deleteCategory(category.id).then((r: ClientError<any>) => toast({
                                title: r.error ? JSON.stringify(r.error) : "Successfully deleted category",
                            }))

                        }}>Delete</Button>
                    </DialogClose>
                </div>
            </DialogHeader>
        </DialogContent>
    </Dialog>;
}