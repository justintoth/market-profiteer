import { Injectable } from '@angular/core';
import { Trade } from '../models/trade.model';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';
import { Utils } from '../shared/utils';
import { ClientStorage } from '../shared/client-storage';

@Injectable({
  providedIn: 'root'
})
export class TradeService {

  private apiUrl = environment.apiUrl;
  private tradesSubject = new BehaviorSubject<Trade[]>([]);
  private tradesProfitLossSubject = new BehaviorSubject<Trade[]>([]);
  private editTradeSubject = new BehaviorSubject<Trade>(new Trade());

  constructor(
    private http: HttpClient, 
    private userService: UserService
  ) { }

  public getAll(): Observable<Trade[]> {
    const user = this.userService.getAuthenticatedUser();
    return (user ? 
      this.http.get<Trade[]>(`${this.apiUrl}/trades?userId=${user.Id}`) : 
      this.getAllFromStorage())
      .pipe(
        tap(result => {
          console.log('Trade Service > getAll > Updating tradesSubject: ', result.length);
          this.tradesSubject.next(result);
          console.log(`Retrieved ${result.length} trades...`);
        })
      );
  }

  private getAllFromStorage():Observable<Trade[]> {
    console.warn('Not authenticated, getting all trades from local storage...');
    let trades:Trade[] = ClientStorage.getAllTrades();
    return of(trades);
  };

  public save(trade: Trade): Observable<Trade> {
    trade = trade.Clone();
    console.log('Saving the trade...', trade);
    const user = this.userService.getAuthenticatedUser();
    return (user ? 
      this.http.post<Trade>(`${this.apiUrl}/trades?userId=${user.Id}`, trade) : 
      this.saveToStorage(trade))
      .pipe(
        tap(result => {
          console.log('Saved the trade! ', result);
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

  private saveToStorage(trade: Trade):Observable<Trade> {
    console.warn('Not authenticated, saving trade to local storage...', trade);
    // Retrieve trades from local storage.
    let trades:Trade[] = ClientStorage.getAllTrades();
    // Check if new or existing trade.
    let existingTrade = trades.find(t => t.Id === trade.Id);
    // Prepend new trade, update existing trade in place.
    if (!existingTrade) {
      trade.Id = Utils.generateGuid();
      trades.unshift(trade);
    } else {
      const existingTradeIndex = trades.indexOf(existingTrade);
      trades[existingTradeIndex] = trade;
    }
    // Save trades to local storage.
    ClientStorage.saveAllTrades(trades);
    return of(trade);
  };

  public saveAllFromStorage():Observable<Trade[]> {
    // Retrieve trades from local storage.
    let trades:Trade[] = ClientStorage.getAllTrades();
    // Save trades to api.
    const user = this.userService.getAuthenticatedUser();
    return this.http.post<Trade[]>(`${this.apiUrl}/trades/all?userId=${user.Id}`, trades)
      .pipe(
        tap(result => {
          console.log('Trade Service > saveAllFromStorage > Updating tradesSubject: ', result.length);
          this.tradesSubject.next(result);
          // Delete trades from local storage.
          ClientStorage.deleteAllTrades();
        })
      );
  }

  public delete(trade: Trade): Observable<string> {
    console.log('Deleting the trade...', trade);
    const user = this.userService.getAuthenticatedUser();
    return (user ? 
      this.http.delete<string>(`${this.apiUrl}/trades/${encodeURI(trade.Id)}?userId=${user.Id}`) : 
      this.deleteFromStorage(trade))
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

  private deleteFromStorage(trade: Trade):Observable<string> {
    console.warn('Not authenticated, deleting trade from local storage...');
    // Retrieve trades from local storage.
    let trades:Trade[] = ClientStorage.getAllTrades();
    // Remove trade.
    trades = trades.filter(t => t.Id !== trade.Id);
    // Save trades to local storage.
    ClientStorage.saveAllTrades(trades);
    return of(trade.Id);
  };

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
