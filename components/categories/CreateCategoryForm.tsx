"use client";

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {CategoryContract} from "@/types/CategoryContract";
import {useState} from "react";
import {newCategory} from "@/actions/categoryActions";
import {useToast} from "@/components/ui/use-toast";
import {UserContract} from "@/types/UserContract";

export default function CreateCategoryForm({user}: { user: UserContract }) {
    const [categoryName, setCategoryName] = useState('');
    const {toast} = useToast();

    async function updateClick() {
        newCategory({
            id: 1, name: categoryName, userId: user.id
        }).then(r => toast({
            title: r.error ? JSON.stringify(r.error) : "Successfully created category"
        }));
        setCategoryName('');
    }

    return <>
        <div className={"flex flex-row gap-3"}>
            <Input value={categoryName}
                   placeholder="Name"
                   onChange={(e) => setCategoryName(e.target.value)}/>
            <Button onClick={updateClick}>Create</Button>
        </div>
    </>
}