import path from 'path';

import express from 'express';
import cors from 'cors';

import routes from './routes';

const uploadPath = path.resolve(__dirname, '..', 'uploads')

const app = express()

app.use(cors())
app.use(express.json())

app.use(routes)
app.use('/uploads', express.static(uploadPath))

app.listen(3333)
