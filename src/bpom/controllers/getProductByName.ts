import { Request, Response } from "express";
import { sendBPOMRequest } from "../../lib/sendBPOMRequest";
import { Product } from "../../types/product";

interface SearchResult {
    arrproc: string;
    from_home_flag: string;
    kirimanfilter: Kirimanfilter;
    offset: number;
    next_prev: number;
    data_all_produk: Product[];
    count_data_all_produk: CountDataAllProduk;
}

interface CountDataAllProduk {
    JUMLAH: number;
}

interface Kirimanfilter {
    st_filter: string;
    input_search: string;
    from_home_flag: string;
}


export async function searchByName(req: Request, res: Response) {
    const { q, filter_by } = req.query;
    const result = await sendBPOMRequest<SearchResult>("https://cekbpom.pom.go.id/search_all_produk", {
        st_filter: filter_by || "2",
        input_search: q,
    });
    res.json(result.data_all_produk)
}