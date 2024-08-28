import {fetchApi} from "@/actions/fetchApi";
import {CategoryContract} from "@/types/CategoryContract";

export async function getCategories(): Promise<CategoryContract[]> {
    return (await fetchApi<CategoryContract[]>("/categories", "GET", {
        tags: ['CATEGORY']
    })).data || [];
}
