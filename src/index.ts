import express from 'express';
import { BPOMRouter } from './bpom/routes';
import cors from "cors"

const app = express();

app.use(cors({
    origin: "*"
}))

app.use('/bpom', BPOMRouter)

app.listen(8080, () => console.log('Server is running'))