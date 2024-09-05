"use client";

import {Input} from "@/components/ui/input";
import {createContext, useState} from "react";
import {Button} from "@/components/ui/button";
import {login} from "@/actions/loginActions";
import {useToast} from "@/components/ui/use-toast";
import RecoverPasswordDialog from "@/components/users/loginAndRegistration/RecoverPasswordDialog";

export const LoginFormEmailContext = createContext('');

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {toast} = useToast();

    return <div className={"flex flex-col gap-1.5"}>
        <LoginFormEmailContext.Provider value={email}>
            <Input placeholder={"Email"} onChange={(e) => setEmail(e.target.value)}/>
            <Input placeholder={"Password"} onChange={(e) => setPassword(e.target.value)} type={"password"}/>
            <Button onClick={() => login(email, password).then(r => toast({
                title: r.error ? JSON.stringify(r.error) : "Successfully logged in"
            }))}>Login</Button>
            <RecoverPasswordDialog/>
        </LoginFormEmailContext.Provider>
    </div>

}