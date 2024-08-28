import {getUserDetails} from "@/actions/userActions";
import {redirect} from "next/navigation";
import {getCategories, newCategory} from "@/actions/categoryActions";
import CategoriesTable from "@/components/categories/CategoriesTable";
import CreateCategoryForm from "@/components/categories/CreateCategoryForm";

export default async function Page() {
    const {data: user} = await getUserDetails();
    if (!user) return redirect("/login");
    if (!user.verifiedAt) redirect("/account");

    const categories_data = await getCategories();
    const categories = categories_data.sort((a,b) => a.id - b.id);

    return <>
        <CreateCategoryForm user={user}/>
        <CategoriesTable categories={categories} />
    </>
}