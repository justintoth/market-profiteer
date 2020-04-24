import { Injectable } from '@angular/core';
import { Trade } from '../models/trade.model';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TradeService {

  private apiUrl = environment.apiUrl;
  private tradesSubject = new BehaviorSubject<Trade[]>([]);
  private tradesProfitLossSubject = new BehaviorSubject<Trade[]>([]);
  private editTradeSubject = new BehaviorSubject<Trade>(new Trade());

  constructor(private http: HttpClient) { }

  public getAll(): Observable<Trade[]> {
    return this.http.get<Trade[]>(`${this.apiUrl}/trades`)
      .pipe(
        tap(result => {
          console.log('Trade Service > getAll > Updating tradesSubject: ', result.length);
          this.tradesSubject.next(result);
          console.log(`Retrieved ${result.length} trades...`);
        })
      );
  }

  public save(trade: Trade): Observable<Trade> {
    console.log('Saving the trade...', trade);
    return this.http.post<Trade>(`${this.apiUrl}/trades`, trade)
      .pipe(
        tap(result => {
          console.log('Saved the trade!');
          // Add new trade or update existing trade.
          let trades = this.tradesSubject.value;
          let existingTrade = trades.find(t => t.Id === result.Id);
          if (!existingTrade)
            trades.unshift(result);
          else {
            existingTrade.Date = result.Date;
            existingTrade.StockSymbol = result.StockSymbol;
            existingTrade.IsPurchase = result.IsPurchase;
            existingTrade.Price = result.Price;
            existingTrade.Quantity = result.Quantity;
          }
          console.log('Trade Service > save > Updating tradesSubject: ', trades.length);
          this.tradesSubject.next(trades);
        })
      );
  }

  public delete(trade: Trade): Observable<string> {
    console.log('Deleting the trade...', trade);
    return this.http.delete<string>(`${this.apiUrl}/trades/${encodeURI(trade.Id)}`)
      .pipe(
        tap(result => {
          console.log('Deleted the trade!');
          // Remove deleted trade.
          let trades = this.tradesSubject.value;
          trades = trades.filter(t => t.Id !== trade.Id);
          console.log('Trade Service > delete > Updating tradesSubject: ', trades.length);
          this.tradesSubject.next(trades);
        })
      );
  }

  public get tradesSubscription(): BehaviorSubject<Trade[]> {
    return this.tradesSubject;
  }

  public get tradesProfitLossSubscription(): BehaviorSubject<Trade[]> {
    return this.tradesProfitLossSubject;
  }

  public get editTradeSubscription(): BehaviorSubject<Trade> {
    return this.editTradeSubject; 
  }

}
