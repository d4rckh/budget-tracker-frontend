"use client";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {useToast} from "@/components/ui/use-toast";
import {deleteSession, requestPasswordChange} from "@/actions/userActions";

export default function LogoutCard() {
  const {toast} = useToast();

  return <Card>
    <CardHeader>
      <CardTitle className={"flex flex-row gap-5 items-center"}>
        Logout
      </CardTitle>
    </CardHeader>
    <CardContent className={"flex flex-col"}>
      <Button size={"sm"} variant={"outline"} onClick={() => {
        deleteSession().then((result) => toast({
          title: result.data ? "Successfully logout" : "Couldn't logout"
        }));
      }}>Logout</Button>
    </CardContent>
  </Card>
}