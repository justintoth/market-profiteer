import { Injectable } from '@angular/core';
import { StockPosition } from '../models/stock-position.model';
import { Trade } from '../models/trade.model';
import * as moment from 'moment';
import { Moment } from 'moment';
import { HttpClient } from '@angular/common/http';
import { StockPrices } from '../models/stock-prices.model';
import { Observable, of } from 'rxjs';
import { StockPrice } from '../models/stock-price.model';
import { TradeService } from './trade.service';
import { mergeMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Utils } from '../shared/utils';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  // TODO: Find more up to date api...
  private stockPriceApiUrl = environment.stockPriceApiUrl;
  private stockPriceRefreshDate: Moment;
  private stockPrices: StockPrices;
  private refreshInterval;
  private refreshIntervalMinutes: number = 1;

  constructor(private http: HttpClient, private tradeService: TradeService) { 
  }

  public enableAutoRefresh() {
    this.refreshInterval = setInterval(() => {
      // Check if stock market is open.
      if (!Utils.stockMarketIsOpen()) {
        console.warn('Stock Service > Stock market isn\'t open so no need to refresh stock positions');
        return;
      }
      // Refresh stock positions.
      this.tradeService.tradesSubscription.subscribe((trades) => {
        if (trades.length === 0)
          console.warn('Stock Service > enableAutoRefresh > tradesSubscription > trades: ', trades.length);
        this.getAllPositions(trades).subscribe(stockPositions => { });
      });
    }, this.refreshIntervalMinutes * 60 * 1000);
  }

  public getAllPositions(trades: Trade[]): Observable<StockPosition[]> {
    // Get stock prices.
    return this.getAllPrices()
      .pipe(
        mergeMap (stockPrices => {
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
              // Stock sold, reduce quantity of existing stock position(s) and calculate sale profit or loss.
              let stockPositionsBySymbol:StockPosition[] = stockPositions.filter(sp => sp.StockSymbol === trade.StockSymbol);
              trade.CurrentQuantity = trade.Quantity;
              trade.SaleProfitLoss = 0;
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

          // Refresh trades, now that we have calculated sale profit or loss.
          console.log(`Stock Service > getAllPositions > Updating tradesProfitLossSubscription with ${trades.length} trades`);
          this.tradeService.tradesProfitLossSubscription.next(trades);

          // Remove stock positions that were fully sold.
          stockPositions = stockPositions.filter(sp => sp.Quantity > 0);

          // Sort by stock symbol.
          stockPositions = stockPositions.sort((sp1,sp2) => {
            if (sp1.StockSymbol > sp2.StockSymbol)
                return 1;
            else if (sp1.StockSymbol < sp2.StockSymbol)
                return -1;
            else if (sp1.Balance < sp2.Balance) 
                return 1;
            else if (sp1.Balance > sp2.Balance)
                return -1
            return 0;
          });

          if (stockPositions.length > 0)
            console.log(`Stock Service > Updated ${stockPositions.length} stock positions...`);
          return of(stockPositions);
        })
      );
  }

  public getAllPrices(): Observable<StockPrices> {
    let minutesSinceLastRefresh: number =  this.stockPriceRefreshDate ? 
      moment.duration(moment().diff(this.stockPriceRefreshDate)).minutes() : 100;
    if (minutesSinceLastRefresh > 1) {
      return this.http.get<StockPrices>(this.stockPriceApiUrl)
        .pipe(
          tap(result => {
            this.stockPrices = result;
            result.symbolsList.forEach(x => x.price = Math.round(x.price * 100) / 100);
            this.stockPriceRefreshDate = moment();
            console.log(`Stock Service > Retrieved ${result.symbolsList.length} stock prices...`);
          })
        );
    } else {
      return of(this.stockPrices);
    }
  }

  public getPrice(stockSymbol: string): Observable<StockPrice> {
    return this.getAllPrices()
      .pipe(
        mergeMap(result => {
          let stockPrice = result.symbolsList.find(function(x) { return x.symbol === stockSymbol; });
          return of(stockPrice);
        })
      );
  }

}
