import ChangePasswordForm from "@/components/users/recover/ChangePasswordForm";


export default async function Page(
    {params: {token}}: { params: { token: string } }
) {

    return <ChangePasswordForm token={token}/>

}