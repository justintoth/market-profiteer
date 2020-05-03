import { StockService } from 'src/app/services/stock.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'market-profiteer';

  constructor(
    private stockService: StockService
  ) { 
  }

  ngOnInit(): void {
    // Enable auto-refreshing stock positions.
    this.stockService.enableAutoRefresh();
  }
}
