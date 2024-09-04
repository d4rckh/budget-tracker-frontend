"use client";

import {markNotificationAsRead, NotificationContract} from "@/actions/notificationActions";
import {Button} from "@/components/ui/button";
import {useToast} from "@/components/ui/use-toast";

export default function MarkNotificationAsReadButton({notification}: {notification: NotificationContract}) {
  const {toast} = useToast();

  return <Button size={"sm"} className={"mr-2"} onClick={() =>
    markNotificationAsRead(notification.id).then(r => toast({
      title: r.error ? "Couldn't mark notification as read" : "Marked notification as read"
    }))
  }>Mark as read</Button>;
}