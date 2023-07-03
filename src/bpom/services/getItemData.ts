import { sendBPOMRequest } from "../../lib/sendBPOMRequest";
import { Product } from "../../types/product";

interface Result {
    arrproc: string;
    kirimanfilter: {
        st_filter: string;
        input_search: string;
    };
    offset: number;
    next_prev: number;
    data_all_produk: Product[];
    count_data_all_produk: {
        JUMLAH: number;
    }
}

export async function getItemDataByItemId(itemId: string) {
    return await sendBPOMRequest<Result>("https://cekbpom.pom.go.id/search_all_produk", {
        st_filter: "1",
        input_search: itemId
    })
}