import { Request, Response } from "express";
import { checkRecalledProduct } from "../services/checkRecalledProduct";

export async function getRecalledProductById(req: Request, res: Response) {
    const { id } = req.params;
    const drug = await checkRecalledProduct(id)
    if (!drug.recalled) {
        return res.status(404).send({
            message: "Not found",
            recalled: false
        })
    }
    res.send(drug)
}