"use client";

import {Input} from "@/components/ui/input";
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {login} from "@/actions/loginActions";
import {useToast} from "@/components/ui/use-toast";

export default function LoginForm() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {toast} = useToast();

  return <div className={"flex flex-col gap-1.5"}>
    <Input placeholder={"Email"} onChange={(e) => setEmail(e.target.value)}/>
    <Input placeholder={"Password"} onChange={(e) => setPassword(e.target.value)} type={"password"}/>
    <Button onClick={() => login(email, password).then(r => toast({
      title: r.error ? JSON.stringify(r.error) : "Sucessfully logged in"
    }))}>Login</Button>
  </div>

}