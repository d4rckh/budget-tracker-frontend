"use client";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {useToast} from "@/components/ui/use-toast";
import {deleteSession, requestPasswordChange} from "@/actions/userActions";

export default function ChangePasswordCard() {
    const {toast} = useToast();

    return <Card>
        <CardHeader>
            <CardTitle className={"flex flex-row gap-5 items-center"}>
                Reset Password
            </CardTitle>
        </CardHeader>
        <CardContent className={"flex flex-col gap-2"}>
            <Button size={"sm"} variant={"outline"} onClick={() => {
                requestPasswordChange().then((result) => toast({
                    title: result.data ? "Sent password change request" : "Couldn't send password change request, wait 10 minutes"
                }));
            }}>Request Password Change</Button>
            <Button size={"sm"} variant={"destructive-outline"} onClick={() => {
                deleteSession().then((result) => toast({
                    title: result.data ? "Successfully logout" : "Couldn't logout"
                }));
            }}>Logout</Button>
        </CardContent>
    </Card>
}