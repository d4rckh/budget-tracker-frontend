import {fetchApi} from "@/actions/fetchApi";
import {CategoryContract} from "@/types/CategoryContract";
import {ClientError} from "@/types/ErrorContract";
import {AccountContract} from "@/types/BudgetContract";

export async function getCategories(): Promise<CategoryContract[]> {
    return (await fetchApi<CategoryContract[]>("/categories", "GET", {
        tags: ['CATEGORY']
    })).data || [];
}
export async function deleteCategory(id: number) {
    return (await fetchApi<CategoryContract>("/categories/" + id, "DELETE", {
        tags: ['CATEGORY']
    })).data;
}

export async function newCategory(category: CategoryContract): Promise<ClientError<AccountContract>> {
    return await fetchApi("/categories", "POST", {
        tags: ['Category',]
    }, category);
}
export async function editCategory(category: CategoryContract): Promise<ClientError<CategoryContract>> {
    return await fetchApi("/categories/" + category.id, "PUT", {
        tags: ['CATEGORY']
    }, category);
}
export async function deleteCategory(id: number): Promise<ClientError<CategoryContract>> {
    return await fetchApi("/categories/" + id, "DELETE", {
        tags: ['CATEGORY']
    });
}