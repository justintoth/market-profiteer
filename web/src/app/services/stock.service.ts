import { Injectable } from '@angular/core';
import { StockPosition } from '../models/stock-position.model';
import { Trade } from '../models/trade.model';
import * as moment from 'moment';
import { Moment } from 'moment';
import { HttpClient } from '@angular/common/http';
import { StockPrices } from '../models/stock-prices';
import { Observable, of } from 'rxjs';
import { StockPrice } from '../models/stock-price';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  // TODO: Find more up to date api...
  private stockPriceApiUrl: string = 'https://financialmodelingprep.com/api/v3/company/stock/list';
  private stockPriceRefreshDate: Moment;
  private stockPrices: StockPrices;

  constructor(private http: HttpClient) { 
  }

  public getAllPositions(trades: Trade[]): Observable<StockPosition[]> {
    return Observable.create(observer => {
      this.getAllPrices()
        .subscribe((stockPrices) => {
          let stockPositions: StockPosition[] = [];

          trades.slice().reverse().forEach(function(trade: Trade) {
            let stockPrice = stockPrices.symbolsList.find(function(x) { return x.symbol === trade.StockSymbol; });

            if (trade.IsPurchase) {
              // Stock purchased, add a new stock position.
              let stockPosition: StockPosition = new StockPosition();
              stockPosition.StockSymbol = trade.StockSymbol;
              stockPosition.Quantity = trade.Quantity;
              stockPosition.PurchasePrice = trade.Price;
              stockPosition.CurrentPrice = stockPrice.price;
              stockPositions.push(stockPosition);
            } else {
              // Stock sold, reduce quantity of existing stock position(s) and calculate sale profit.
              let stockPositionsBySymbol:StockPosition[] = stockPositions.filter(sp => sp.StockSymbol === trade.StockSymbol);
              trade.CurrentQuantity = trade.Quantity;
              stockPositionsBySymbol.forEach(function(stockPosition: StockPosition) { 
                if (trade.CurrentQuantity > 0) {
                  var quantity = Math.min(trade.CurrentQuantity, stockPosition.Quantity);
                  stockPosition.Quantity -= quantity;
                  trade.CurrentQuantity -= quantity;
                  trade.SaleProfitLoss += (trade.Price  - stockPosition.PurchasePrice) * quantity;
                }
              });
            }
          });

          // Remove stock positions that were fully sold.
          stockPositions = stockPositions.filter(sp => sp.Quantity > 0);

          // TODO: Group by stock symbol, then sort by balance descending.

          console.log('Stock Positions: ' + stockPositions.length);
          observer.next(stockPositions);
          observer.complete();
        });
    });
  }

  public getAllPrices(): Observable<StockPrices> {
    let minutesSinceLastRefresh: number =  this.stockPriceRefreshDate ? 
      moment.duration(moment().diff(this.stockPriceRefreshDate)).minutes() : 100;
    if (minutesSinceLastRefresh > 1) {
      let observable = this.http.get<StockPrices>(this.stockPriceApiUrl);
      observable.subscribe((result) => {
        this.stockPrices = result;
        this.stockPriceRefreshDate = moment();
        console.log(`Retrieved ${result.symbolsList.length} stock prices...`);
      });
      return observable;
    } else {
      return of(this.stockPrices);
    }
  }

  public getPrice(stockSymbol: string): Observable<StockPrice> {
    return Observable.create(observer => {
      this.getAllPrices()
        .subscribe((result) => {
          let stockPrice = result.symbolsList.find(function(x) { return x.symbol === stockSymbol; });
          observer.next(stockPrice);
          observer.complete();
        });
    });
  }

}
