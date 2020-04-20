import { Injectable } from '@angular/core';
import { Trade } from '../models/trade.model';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TradeService {

  private apiUrl:string = 'http://localhost:8000';
  public TradesSubject:BehaviorSubject<Trade[]> = new BehaviorSubject<Trade[]>([]);

  constructor(private http: HttpClient) { }

  public getAll(): Observable<Trade[]> {
    console.log('Retrieving trades...');
    let observable = this.http.get<Trade[]>(`${this.apiUrl}/trades`);
    observable.subscribe((result) => {
      this.TradesSubject.next(result);
      console.log(`Retrieved ${result.length} trades...`);
    });
    return observable;
  }

  public save(trade: Trade): Observable<Trade> {
    console.log(`Saving the trade... ${JSON.stringify(trade)}`);
    let observable = this.http.post<Trade>(`${this.apiUrl}/trades`, trade);
    observable.subscribe((result) => {
      console.log('Saved the trade!');
      var trades = this.TradesSubject.value;
      trades.unshift(result);
      this.TradesSubject.next(trades);
    });
    return observable;
  }

}
