"use client";

import {useToast} from "@/components/ui/use-toast"
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {Button} from "@/components/ui/button";
import {sendVerificationEmail, verifyEmail} from "@/actions/userActions";
import {Input} from "@/components/ui/input";
import {useState} from "react";

export default function VerifyEmailAlert() {
  const {toast} = useToast()
  const [verificationToken, setVerificationToken] = useState("");

  function sendEmailButton() {
    sendVerificationEmail().then((result) => toast({
      title: result.data ? "Successfully sent verification email" : "Already sent a verification email, please wait 10 minutes",
    }))
  }

  return <Alert variant={"destructive"}>
    <AlertTitle className={"text-xl"}>Your account is not verified</AlertTitle>
    <AlertDescription>
      You won&apos;t use be able to use your account until you verify by email. <Button size={"sm"}
                                                                                        variant={"outline"}
                                                                                        onClick={sendEmailButton}>Press
      here to send email</Button>
      <p className={"text-gray-400"}>Have a code?
        <Input
          onChange={(e) => setVerificationToken(e.target.value)}
          className={"ml-2 max-w-[350px] inline"}
          placeholder={"Place it here"}/>
        <Button className={"ml-1"} variant={"outline"} onClick={() =>
          verifyEmail(verificationToken)
            .then((result) => toast({
              title: result.data ? "Verified email!" : "Wrong verification token supplied"
            }))
        }
        >
          Verify
        </Button>
      </p>
    </AlertDescription>
  </Alert>
}