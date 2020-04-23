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

  private apiUrl:string = environment.apiUrl;
  private tradesSubject:BehaviorSubject<Trade[]> = new BehaviorSubject<Trade[]>([]);
  private tradesProfitLossSubject:BehaviorSubject<Trade[]> = new BehaviorSubject<Trade[]>([]);

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
    console.log(`Saving the trade... ${JSON.stringify(trade)}`);
    return this.http.post<Trade>(`${this.apiUrl}/trades`, trade)
      .pipe(
        tap(result => {
          console.log('Saved the trade!');
          var trades = this.tradesSubject.value;
          trades.unshift(result);
          console.log('Trade Service > save > Updating tradesSubject: ', trades.length);
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

}
