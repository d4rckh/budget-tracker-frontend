import {getUserDetails} from "@/actions/userActions";
import {redirect} from "next/navigation";
import {getCategories, newCategory} from "@/actions/categoryActions";
import CategoriesTable from "@/components/categories/CategoriesTable";
import CreateCategoryForm from "@/components/categories/CreateCategoryForm";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {getNotifications, markNotificationAsRead} from "@/actions/notificationActions";
import { Badge } from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {useToast} from "@/components/ui/use-toast";
import MarkNotificationAsReadButton from "@/components/notifications/MarkNotificationAsReadButton";
import {revalidateTag} from "next/cache";
import RefreshNotifications from "@/components/notifications/RefreshNotifications";

export default async function Page() {
  const {data: user} = await getUserDetails();

  if (!user) return redirect("/login");
  if (!user.verifiedAt) redirect("/account");

  const notifications_data = await getNotifications();
  const notifications = notifications_data.sort((a,b) => b.id - a.id);

  return <>
    <h1 className={"text-3xl"}>Notifications</h1>
    <RefreshNotifications />
    {
      notifications.filter(notif => notif.channels.includes("WEB")).map(notif =>
        <Card key={notif.id} className={"mt-4 border-2 " + (!notif.markedAsRead ? "border-amber-200" : "")}>
          <CardHeader>
            <CardTitle className={"text-md"}>{notif.type.split("_").join(" ")}
              {!notif.markedAsRead && <Badge className={"ml-2"} variant={"warning"}>New</Badge>}</CardTitle>
          </CardHeader>
          <CardContent>
            {
              notif.type == "WEEKLY_REPORT" &&
                notif.payload["report"].map((a: String) =>
                  <p key={notif.id}>{a}</p>
                )
            }
          </CardContent>
          <CardFooter className={"text-gray-500"}>
            {!notif.markedAsRead && <MarkNotificationAsReadButton notification={notif} />}
            <span>Created at <span className={"ml-1 font-bold"}>{notif.createdAt}</span></span>
          </CardFooter>
        </Card>
      )
    }
  </>
}