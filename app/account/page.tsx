import {getUserDetails} from "@/actions/userActions";
import {redirect} from "next/navigation";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import Image from "next/image";
import {Badge} from "@/components/ui/badge";
import VerifyEmailAlert from "@/components/users/VerifyEmailAlert";
import ChangePasswordCard from "@/components/users/ChangePasswordCard";

export default async function Page() {
  const user = await getUserDetails();

  if (!user) return redirect("/login");

  return <div className={"flex flex-col gap-1.5"}>
    {!user.verifiedAt && <VerifyEmailAlert/>}
    <Card>
      <CardHeader>
        <CardTitle className={"flex flex-row gap-5 items-center"}>
          <Image src={"/profilepic.webp"} alt={"profile"} width={50} height={50} className={"rounded-md"}/>
          <p className={"text-3xl"}>Welcome, {user.firstName} {user.lastName}</p>
        </CardTitle>
      </CardHeader>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle className={"flex flex-row gap-5 items-center"}>
          User details
        </CardTitle>
      </CardHeader>
      <CardContent className={"flex flex-col"}>
        <span>Email: {user.email}</span>
        <span>Verified: {user.verifiedAt ? <Badge>Yes</Badge> : <>
          <Badge variant={"destructive"}>No</Badge>
        </>}</span>
      </CardContent>
    </Card>
    <ChangePasswordCard />
  </div>;
}