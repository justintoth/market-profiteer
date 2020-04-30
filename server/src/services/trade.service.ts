import { Request, Response } from 'express';
import { Trade } from '../models/trade.model';
import { Utils } from '../shared/utils';
import { JsonStorage } from '../shared/json-storage';

// TODO: Provide more robust authentication scheme...

export const getAllTrades = (req: Request, res: Response) => {
  const userId = req.query.userId.toString();
  if (!userId)
    return res.status(401);

  let trades = JsonStorage.getAllTrades(userId);
  console.log(`Retrieved ${trades.length} trades...`);
  return res.json(trades);
};

export const saveTrade = (req: Request, res: Response) => {
  const userId = req.query.userId.toString();
  if (!userId)
    return res.status(401);

  // Check if new or existing trade.
  let trades = JsonStorage.getAllTrades(userId);
  let existingTrade = trades.find(t => t.Id === req.body.Id);
  // Populate values.
  let trade = existingTrade || new Trade();
  trade.Date = req.body.Date;
  trade.StockSymbol = req.body.StockSymbol;
  trade.IsPurchase = req.body.IsPurchase || false;
  trade.Quantity = req.body.Quantity;
  trade.Price = req.body.Price;
  // Prepend new trade, update existing trade in place.
  if (!existingTrade) {
    trade.Id = Utils.generateGuid();
    trades.unshift(trade);
  }
  // Save trades.
  JsonStorage.saveAllTrades(userId, trades);
  console.log(`Saved ${!existingTrade ? 'new' : 'existing'} trade: `, trade);
  res.json(trade);
};

export const saveAllTrades = (req: Request, res: Response) => {
  const userId = req.query.userId.toString();
  if (!userId)
    return res.status(401);

  let trades: Trade[] = req.body;
  // Save trades.
  JsonStorage.saveAllTrades(userId, trades);
  console.log(`Saved ${trades.length} trades`);
  res.json(trades);
};

export const deleteTrade = (req: Request, res: Response) => {
  const userId = req.query.userId.toString();
  if (!userId)
    return res.status(401);

  // Remove trade.
  let tradeId = req.params.tradeId;
  let trades = JsonStorage.getAllTrades(userId);
  trades = trades.filter(t => t.Id !== tradeId);
  // Save trades.
  JsonStorage.saveAllTrades(userId, trades);
  console.log('Deleted trade with id: ', tradeId);
  res.json(tradeId);
};