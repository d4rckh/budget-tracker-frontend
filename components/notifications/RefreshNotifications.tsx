"use client";

import {Button} from "@/components/ui/button";
import {refreshNotifications} from "@/actions/notificationActions";

export default function RefreshNotifications() {
    return <Button onClick={() => refreshNotifications()} variant={"outline"} size={"sm"}>Refresh</Button>
}