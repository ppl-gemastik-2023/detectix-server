import { Request, Response } from "express";
import { getItemDataByItemId } from "../services/getItemData";
import { processDetail } from "../services/processDetail";

export async function getProductById(req: Request, res: Response) {
    const { id } = req.params;
    const drug = await getItemDataByItemId(id)
    console.log(drug)
    if (drug && drug.count_data_all_produk && drug.count_data_all_produk.JUMLAH === 0) {
        return res.status(404).send({
            message: "Not found"
        })
    }
    const result = await processDetail(drug.data_all_produk[0])
    res.send(result)
}