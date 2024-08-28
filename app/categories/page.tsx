import {getUserDetails} from "@/actions/userActions";
import {redirect} from "next/navigation";
import {getAccounts} from "@/actions/accountActions";
import {getTransactions} from "@/actions/transactionActions";
import {getCategories} from "@/actions/categoryActions";
import CategoriesTable from "@/components/categories/CategoriesTable";

export default async function Page() {


    const {data: user} = await getUserDetails();
    if (!user) return redirect("/login");
    if (!user.verifiedAt) redirect("/account");

    const accounts = await getAccounts();
    const transactions = await getTransactions();
    const categories = await getCategories();

    return <>

        <CategoriesTable categories={categories} />
    </>

}