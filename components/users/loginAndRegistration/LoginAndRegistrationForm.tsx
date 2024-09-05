"use client";

import LoginForm from "@/components/users/loginAndRegistration/LoginForm";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import RegisterForm from "@/components/users/loginAndRegistration/RegisterForm";
import {useState} from "react";

export default function LoginAndRegistrationForm() {
    const [tab, setTab] = useState("login");

    return <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login"><LoginForm/></TabsContent>
        <TabsContent value="register"><RegisterForm onRegister={() => setTab("login")}/></TabsContent>
    </Tabs>
}