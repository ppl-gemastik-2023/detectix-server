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
    data_produk_recall: Product[];
    count_data_produk_recall: {
        JUMLAH: number;
    };
}

export async function checkRecalledProduct(itemId: string) {
    const data = await sendBPOMRequest<Result>("https://cekbpom.pom.go.id/search_produk_recall", {
        st_filter: "1",
        input_search: itemId
    })
    if (data.count_data_produk_recall.JUMLAH === 0) {
        return ({
            recalled: false
        })
    }
    return ({
        recalled: true,
        ...data.data_produk_recall[0]
    })
}