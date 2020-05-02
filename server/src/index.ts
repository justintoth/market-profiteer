import express from 'express';
import bodyParser from 'body-parser';
import { getAllTrades, saveTrade, deleteTrade, saveAllTrades} from './services/trade.service';
import { saveUser, root, authenticateUser } from './services/user.service';
const expressJwt = require('express-jwt');
const config = require('../environment.json')[process.env.NODE_ENV || 'development'];

const app = express();
const port = process.env.PORT || '8000';

app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
app.use(expressJwt({ secret: config.jwt_shared_secret })
  .unless({ path: ['/users/authenticate', '/users'] }));

app.get('/', root);

app.post('/users/authenticate', authenticateUser);
app.post('/users', saveUser);

app.get('/trades', getAllTrades);
app.post('/trades', saveTrade);
app.post('/trades/all', saveAllTrades);
app.delete('/trades/:tradeId', deleteTrade);

app.listen(port, err => {
  if (err) return console.error(err);
  return console.log(`Server is listening on ${port}`);
});