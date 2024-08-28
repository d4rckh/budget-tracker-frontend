"use client"

import {CategoryContract} from "@/types/CategoryContract";
import {useState} from "react";
import {useToast} from "@/components/ui/use-toast";
import {Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {deleteCategory, editCategory} from "@/actions/categoryActions";
import {ClientError} from "@/types/ErrorContract";

export default function DeleteCategoryForm({category}: {category: CategoryContract}) {
    const [name, setName] = useState(category.name);

    const {toast} = useToast();

    return(
                <div className={"pt-3 flex flex-col gap-2"}>


                </div>
    )
}