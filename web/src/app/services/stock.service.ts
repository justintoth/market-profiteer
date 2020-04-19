import { Injectable } from '@angular/core';
import { StockPosition } from '../models/stock-position.model';
import { TradeService } from './trade.service';
import { Trade } from '../models/trade.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private tradeService: TradeService) { 
  }

  public getAllPositions(): Observable<StockPosition[]> {
    return Observable.create(observer => {
      this.tradeService.getAll()
          .subscribe((result) => {
            let stockPositions: StockPosition[] = [];

            result.forEach(function(trade: Trade) {
              if (trade.IsPurchase) {
                // Stock purchased, add a new stock position.
                let stockPosition: StockPosition = new StockPosition();
                stockPosition.StockSymbol = trade.StockSymbol;
                stockPosition.Quantity = trade.Quantity;
                stockPosition.PurchasePrice = trade.Price;
                stockPosition.CurrentPrice = trade.Price + 10;// TODO: Retrieve stock's current price from some api.
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
      
            console.log('Stock Positions: ' + stockPositions.length);

            observer.next(stockPositions);
            observer.complete();
        });
    });
  }

}
