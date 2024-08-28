import {getUserDetails} from "@/actions/userActions";
import {redirect} from "next/navigation";
import {getAccounts} from "@/actions/accountActions";
import {getTransactions, newTransaction} from "@/actions/transactionActions";
import {getCategories, newCategory} from "@/actions/categoryActions";
import CategoriesTable from "@/components/categories/CategoriesTable";
import {Button} from "@/components/ui/button";
import {ClientError} from "@/types/ErrorContract";
import CreateCategoryForm from "@/components/categories/CreateCategoryForm";

export default async function Page() {


    const {data: user} = await getUserDetails();
    if (!user) return redirect("/login");
    if (!user.verifiedAt) redirect("/account");

    const accounts = await getAccounts();
    const transactions = await getTransactions();
    const categories = await getCategories();

    return <>
        <CreateCategoryForm user={user}/>
        <CategoriesTable categories={categories} />
    </>

}