"use client";

import {useState} from "react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useToast} from "@/components/ui/use-toast";
import {changePasswordWithToken} from "@/actions/userActions";
import {useRouter} from "next/navigation";

export default function ChangePasswordForm({token}: { token: string }) {
    const [password, setPassword] = useState<string>("");

    const router = useRouter()
    const {toast} = useToast();

    return <div>
        <h1 className={"text-xl mb-2"}>Reset your password</h1>
        <div className={"flex flex-row gap-1.5"}>
            <Input placeholder={"New password"} onChange={(e) => setPassword(e.target.value)}
                   type={"password"}/>
            <Button onClick={() => {
                changePasswordWithToken(token, password).then(r => {
                    if (r.data) {
                        toast({
                            title: "Successfully reset your password"
                        })
                        router.push("/login");
                        return;
                    }
                    toast({
                        title: "Couldn't reset your password"
                    })
                })
            }}>Rest password</Button>
        </div>
    </div>

}