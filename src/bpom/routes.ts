import express from "express";
import { getProductById } from "./controllers/getProductById";
import { getRecalledProductById } from "./controllers/getRecalledProductById";
import { searchByName } from "./controllers/getProductByName";

export const BPOMRouter = express.Router()
    .get('/products/:id', getProductById)
    .get('/recalled/:id', getRecalledProductById)
    .get('/search', searchByName)