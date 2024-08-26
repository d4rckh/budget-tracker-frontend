"use client";

import {Input} from "@/components/ui/input";
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {register} from "@/actions/loginActions";

export default function RegisterForm(props: { onRegister: Function }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  function registerButton() {
    register(email, password, firstName, lastName).then(() => props.onRegister());
  }

  return <div className={"flex flex-col gap-1.5"}>
    <Input placeholder={"Email"} onChange={(e) => setEmail(e.target.value)}/>
    <Input placeholder={"Password"} onChange={(e) => setPassword(e.target.value)} type={"password"}/>
    <Input placeholder={"First name"} onChange={(e) => setFirstName(e.target.value)}/>
    <Input placeholder={"Last name"} onChange={(e) => setLastName(e.target.value)}/>
    <Button onClick={() => registerButton()}>Register</Button>
  </div>

}