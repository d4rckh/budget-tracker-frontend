"use client";

import {Input} from "@/components/ui/input";
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {login} from "@/actions/loginActions";

export default function LoginForm() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return <div className={"flex flex-col gap-1.5"}>
    <Input placeholder={"Email"} onChange={(e) => setEmail(e.target.value)}/>
    <Input placeholder={"Password"} onChange={(e) => setPassword(e.target.value)} type={"password"}/>
    <Button onClick={() => login(email, password)}>Login</Button>
  </div>

}