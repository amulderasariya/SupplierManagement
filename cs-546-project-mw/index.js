import 'dotenv/config';
import './database/connectdb.js';
import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';

import authRouter from './routes/auth.route.js';
import productRouter from './routes/products.route.js';
import invoiceRouter from './routes/invoice.route.js';
import lookupRouter from './routes/lookups.route.js';
import dashboardRouter from './routes/dashboard.route.js';
import xss from 'xss';
const app = express();

const whiteList = [process.env.ORIGIN1, process.env.ORIGIN2];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || whiteList.includes(origin)) {
        return callback(null, origin);
      }
      return callback('Error CORS origin: ' + origin + ' Not authorized!');
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/products', productRouter);
app.use('/invoice', invoiceRouter);
app.use('/dashboard', dashboardRouter);
app.use('/lookup', lookupRouter);

app.route('/').get((req, res) => res.json(xss('<script>alert("xss");</script>')));
app.use('*', (req, res) => res.status(404).json('Not Found'));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log('http://localhost:' + PORT));
