import express from 'express';
import { rootHandler, getAllStocksHandler, saveStockHandler } from './handlers';

const app = express();
const port = process.env.PORT || '8000';

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', rootHandler);
app.get('/stocks/', getAllStocksHandler);
app.post('/stocks/', saveStockHandler);

app.listen(port, err => {
  if (err) return console.error(err);
  return console.log(`Server is listening on ${port}`);
});