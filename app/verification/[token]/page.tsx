
import {verifyWithToken} from "@/actions/userActions";

export default async function Page(
  {params: { token }}: { params: { token: string } }
) {

  const result = await verifyWithToken(token);

  if (result.data) {
    return <>
      <h1 className={"text-xl"}>Successfully verified your email address, you can now use our app</h1>
    </>
  }

  return <>
    <h1 className={"text-xl"}>Oops - could not verify your email address</h1>
  </>

}