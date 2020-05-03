import { StockService } from 'src/app/services/stock.service';
import { Component, OnInit } from '@angular/core';
import { TradeService } from './services/trade.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'market-profiteer';

  constructor(
    private tradeService: TradeService,
    private stockService: StockService
  ) { 
  }

  ngOnInit(): void {
    // Get all trades.
    console.log('App Component > Get all trades');
    this.tradeService.getAll()
        .subscribe(result => { });
    // Enable auto-refreshing stock positions.
    this.stockService.enableAutoRefresh();
  }
}
