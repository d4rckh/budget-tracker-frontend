"use client";

import {useContext, useState} from "react";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {LoginFormEmailContext} from "@/components/users/loginAndRegistration/LoginForm";
import {useToast} from "@/components/ui/use-toast";
import {requestPasswordChange} from "@/actions/userActions";

export default function RecoverPasswordDialog() {
    const [email, setEmail] = useState<string>("");

    const emailContext = useContext(LoginFormEmailContext);
    const {toast} = useToast();

    return <Dialog>
        <DialogTrigger asChild>
            <Button onClick={() => {
                setEmail(emailContext)
            }} variant={"outline"}>Recover Password</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Password Recovery</DialogTitle>
                <DialogDescription>
                    Type in your email below and press &apos;Send Email&apos; to send a recovery email.
                </DialogDescription>
            </DialogHeader>
            <Input value={email} onChange={(e) => setEmail(e.target.value)}
                   placeholder={"Email"}
            />
            <DialogFooter className={"gap-3"}>
                <DialogClose>Close</DialogClose>
                <DialogClose asChild>
                    <Button onClick={() => {
                        requestPasswordChange(-1, email).then(r =>
                            toast({
                                title: r.error ? JSON.stringify(r.error) : (r.data ? "Sent recovery email" : "Couldn't sent email, wait 10 minutes and try again")
                            })
                        );
                    }}>Send Email</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>
}