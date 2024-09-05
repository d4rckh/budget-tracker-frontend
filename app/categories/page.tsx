import {getUserDetails} from "@/actions/userActions";
import {redirect} from "next/navigation";
import {getCategories, newCategory} from "@/actions/categoryActions";
import CategoriesTable from "@/components/categories/CategoriesTable";
import CreateCategoryForm from "@/components/categories/CreateCategoryForm";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

export default async function Page() {
    const {data: user} = await getUserDetails();
    if (!user) return redirect("/login");
    if (!user.verifiedAt) redirect("/account");

    const categories_data = await getCategories();
    const categories = categories_data.sort((a, b) => a.id - b.id);

    return <>
        <Card className={"mb-3"}>
            <CardHeader>
                <CardTitle>Add category</CardTitle>
            </CardHeader>
            <CardContent>
                <CreateCategoryForm user={user}/>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent>
                <CategoriesTable categories={categories}/>
            </CardContent>
        </Card>
    </>
}