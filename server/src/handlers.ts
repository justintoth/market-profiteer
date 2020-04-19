import { Request, Response } from 'express';
import { Trade } from './models/trade.model';
import fs from 'fs';

const jsonFilePath: string = 'trades.json';

export const rootHandler = (_req: Request, res: Response) => {
  return res.send('API is working 🤓');
};

export const getAllStocksHandler = (req: Request, res: Response) => {
  // Retrieve trades from JSON file.
  let trades:Trade[] = [];
  let json = fs.readFileSync(jsonFilePath, 'utf-8');
  trades = JSON.parse(json);

  // Sample trades...
  /*let trade:Trade = new Trade();
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
  fs.writeFileSync(jsonFilePath, json);*/

  console.log('Trades: ' + trades.length);

  return res.json(trades);
};

export const saveStockHandler = (req: Request, res: Response) => {
  // Retrieve trades from JSON file.
  let trades:Trade[] = [];
  let json = fs.readFileSync(jsonFilePath, 'utf-8');
  trades = JSON.parse(json);

  // TODO: Append new trade.

  // Save trade to JSON file.
  json = JSON.stringify(trades);
  fs.writeFileSync(jsonFilePath, json);

  console.log('Trades after save: ' + trades.length);

  return res.json(trades);
};