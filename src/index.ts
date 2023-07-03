import express from 'express';
import { BPOMRouter } from './bpom/routes';

const app = express();

app.use('/bpom', BPOMRouter)

app.listen(8080, () => console.log('Server is running'))