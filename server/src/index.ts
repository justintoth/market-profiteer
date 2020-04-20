import express from 'express';
import bodyParser from 'body-parser';
import { root, getAllTrades, saveTrade} from './handlers';

const app = express();
const port = process.env.PORT || '8000';

app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', root);
app.get('/trades/', getAllTrades);
app.post('/trades/', saveTrade);

app.listen(port, err => {
  if (err) return console.error(err);
  return console.log(`Server is listening on ${port}`);
});