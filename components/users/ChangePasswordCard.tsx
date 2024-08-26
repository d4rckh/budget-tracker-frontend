"use client";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {useToast} from "@/components/ui/use-toast";
import {requestPasswordChange} from "@/actions/userActions";

export default function ChangePasswordCard() {
  const {toast} = useToast();

  return <Card>
    <CardHeader>
      <CardTitle className={"flex flex-row gap-5 items-center"}>
        Reset Password
      </CardTitle>
    </CardHeader>
    <CardContent className={"flex flex-col"}>
      <Button size={"sm"} variant={"outline"} onClick={() => {
        requestPasswordChange().then((result) => toast({
          title: result ? "Sent password change request" : "Couldn't send password change request, wait 10 minutes"
        })).catch(e => toast({
          title: "Couldn't send password change request " + e,
        }))
      }}>Request Password Change</Button>
    </CardContent>
  </Card>
}