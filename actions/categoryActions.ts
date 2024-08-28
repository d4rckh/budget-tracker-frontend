import {fetchApi} from "@/actions/fetchApi";
import {CategoryContract} from "@/types/CategoryContract";
import {ClientError} from "@/types/ErrorContract";
import {AccountContract} from "@/types/BudgetContract";

export async function getCategories(): Promise<CategoryContract[]> {
    return (await fetchApi<CategoryContract[]>("/categories", "GET", {
        tags: ['CATEGORY']
    })).data || [];
}
export async function newCategory(category: CategoryContract): Promise<ClientError<AccountContract>> {
    return await fetchApi("/categories", "POST", {
        tags: ['Category',]
    }, category);
}
