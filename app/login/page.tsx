import LoginAndRegistrationForm from "@/components/users/loginAndRegistration/LoginAndRegistrationForm";
import {getUserDetails} from "@/actions/userActions";
import {redirect} from "next/navigation";

export default async function Page() {
  const {data: user} = await getUserDetails();

  if (!user) return <LoginAndRegistrationForm/>;

  redirect("/account");
}