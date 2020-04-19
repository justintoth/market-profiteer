import { Injectable } from '@angular/core';
import { Trade } from '../models/trade.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TradeService {

  constructor(private http: HttpClient) { }

  public getAll(): Observable<Trade[]> {
    return this.http.get<Trade[]>('http://localhost:8000/stocks');
  }

}
