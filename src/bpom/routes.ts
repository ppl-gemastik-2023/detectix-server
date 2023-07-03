import express from "express";
import { getProductById } from "./controllers/getProductById";
import { getRecalledProductById } from "./controllers/getRecalledProductById";

export const BPOMRouter = express.Router()
    .get('/products/:id', getProductById)
    .get('/recalled/:id', getRecalledProductById)