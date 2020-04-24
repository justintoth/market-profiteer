import { Request, Response } from 'express';
import { Trade } from './models/trade.model';
import fs from 'fs';

const jsonFilePath: string = 'trades.json';

export const root = (_req: Request, res: Response) => {
  return res.send('API is working 🤓');
};

export const getAllTrades = (req: Request, res: Response) => {
  // Retrieve trades from JSON file.
  let json = fs.readFileSync(jsonFilePath, 'utf-8');
  let trades:Trade[] = JSON.parse(json);

  console.log(`Retrieved ${trades.length} trades...`);

  return res.json(trades);
};

export const saveTrade = (req: Request, res: Response) => {
  // Validate...
  if (!req.body) {
    console.warn('Can\'t save trade, no request body sent...');
    return res.sendStatus(400);
  }

  // Retrieve trades from JSON file.
  let json = fs.readFileSync(jsonFilePath, 'utf-8');
  let trades:Trade[] = JSON.parse(json);

  // Check if new or existing trade.
  let existingTrade = trades.find(t => t.Id === req.body.Id);

  // Prepend new trade.
  let trade = existingTrade || new Trade();
  trade.Date = req.body.Date;
  trade.StockSymbol = req.body.StockSymbol;
  trade.IsPurchase = req.body.IsPurchase || false;
  trade.Quantity = req.body.Quantity;
  trade.Price = req.body.Price;
  // Prepend new trade, update existing trade in place.
  if (!existingTrade) {
    trade.Id = generateGuid();
    trades.unshift(trade);
  }

  // Save trade to JSON file.
  fs.writeFileSync(jsonFilePath, JSON.stringify(trades, null, 2));

  console.log(`Saved ${!existingTrade ? 'new' : 'existing'} trade: `, trade);

  res.json(trade);
};

export const deleteTrade = (req: Request, res: Response) => {
  console.log('In delete trade...');
  
  // Get trade id.
  let tradeId = req.params.tradeId;

  // Retrieve trades from JSON file.
  let json = fs.readFileSync(jsonFilePath, 'utf-8');
  let trades: Trade[] = JSON.parse(json);

  // Remove trade.
  trades = trades.filter(t => t.Id !== tradeId);

  // Save trades to JSON file.
  fs.writeFileSync(jsonFilePath, JSON.stringify(trades, null, 2));

  console.log('Deleted trade with id: ', tradeId);

  res.json(tradeId);
};

function generateGuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export const saveDummyTrades = (req: Request, res: Response) => {
  // Sample trades...
  let trades:Trade[] = [];

  let trade:Trade = new Trade();
  trade.Date = new Date('12/1/2019');
  trade.StockSymbol = 'SPY';
  trade.IsPurchase = true;
  trade.Quantity = 34;
  trade.Price = 286.56;
  trades.push(trade);

  trade = new Trade();
  trade.Date = new Date('12/1/2019');
  trade.StockSymbol = 'VTV';
  trade.IsPurchase = true;
  trade.Quantity = 70;
  trade.Price = 92.29;
  trades.push(trade);

  trade = new Trade();
  trade.Date = new Date('12/17/2019');
  trade.StockSymbol = 'DIS';
  trade.IsPurchase = true;
  trade.Quantity = 34;
  trade.Price = 148.24;
  trades.push(trade);

  trade = new Trade();
  trade.Date = new Date('12/17/2019');
  trade.StockSymbol = 'PTON';
  trade.IsPurchase = true;
  trade.Quantity = 155;
  trade.Price = 32.43;
  trades.push(trade);

  trade = new Trade();
  trade.Date = new Date('12/17/2019');
  trade.StockSymbol = 'GOOGL';
  trade.IsPurchase = true;
  trade.Quantity = 3;
  trade.Price = 1,354.08;
  trades.push(trade);

  trade = new Trade();
  trade.Date = new Date('12/17/2019');
  trade.StockSymbol = 'W';
  trade.IsPurchase = true;
  trade.Quantity = 60;
  trade.Price = 83.61;
  trades.push(trade);

  trade = new Trade();
  trade.Date = new Date('12/17/2019');
  trade.StockSymbol = 'AMZN';
  trade.IsPurchase = true;
  trade.Quantity = 3;
  trade.Price = 1,783.31;
  trades.push(trade);

  trade = new Trade();
  trade.Date = new Date('12/17/2019');
  trade.StockSymbol = 'SPY';
  trade.IsPurchase = true;
  trade.Quantity = 18;
  trade.Price = 319.69;
  trades.push(trade);

  trade = new Trade();
  trade.Date = new Date('12/17/2019');
  trade.StockSymbol = 'SPY';
  trade.IsPurchase = false;
  trade.Quantity = 16;
  trade.Price = 319.92;
  trades.push(trade);

  trade = new Trade();
  trade.Date = new Date('12/17/2019');
  trade.StockSymbol = 'SKX';
  trade.IsPurchase = true;
  trade.Quantity = 125;
  trade.Price = 41.50;
  trades.push(trade);

  trade = new Trade();
  trade.Date = new Date('1/21/2020');
  trade.StockSymbol = 'PTON';
  trade.IsPurchase = false;
  trade.Quantity = 155;
  trade.Price = 33.04;
  trades.push(trade);

  trade = new Trade();
  trade.Date = new Date('1/21/2020');
  trade.StockSymbol = 'SKX';
  trade.IsPurchase = true;
  trade.Quantity = 130;
  trade.Price = 40.98;
  trades.push(trade);

  trade = new Trade();
  trade.Date = new Date('2/5/2020');
  trade.StockSymbol = 'DIS';
  trade.IsPurchase = true;
  trade.Quantity = 43;
  trade.Price = 141.06;
  trades.push(trade);

  trade = new Trade();
  trade.Date = new Date('2/6/2020');
  trade.StockSymbol = 'W';
  trade.IsPurchase = false;
  trade.Quantity = 40;
  trade.Price = 102.52;
  trades.push(trade);

  trade = new Trade();
  trade.Date = new Date('2/6/2020');
  trade.StockSymbol = 'NKE';
  trade.IsPurchase = true;
  trade.Quantity = 20;
  trade.Price = 100.58;
  trades.push(trade);

  trade = new Trade();
  trade.Date = new Date('2/6/2020');
  trade.StockSymbol = 'SKX';
  trade.IsPurchase = true;
  trade.Quantity = 55;
  trade.Price = 37.89;
  trades.push(trade);

  let json = JSON.stringify(trades);
  fs.writeFileSync(jsonFilePath, json);

  return res.json(trades);
};