import { Component, OnInit } from '@angular/core';
import { StockService } from 'src/app/services/stock.service';
import { StockPosition } from 'src/app/models/stock-position.model';
import { TradeService } from 'src/app/services/trade.service';

@Component({
  selector: 'app-stock-positions',
  templateUrl: './stock-positions.component.html',
  styleUrls: ['./stock-positions.component.scss']
})
export class StockPositionsComponent implements OnInit {

  public stockPositions: StockPosition[] = [];
  public totalBalance: number = 0;
  public totalProfitLoss: number = 0;

  constructor(private tradeService: TradeService, private stockService: StockService) {
   }

  ngOnInit(): void {
    // Listen for updates to trades.
    this.tradeService.tradesSubscription.subscribe((trades) => {
      if (trades.length > 0) {
        // Get all stock positions.
        this.stockService.getAllPositions(trades).subscribe((stockPositions) => {
          this.stockPositions = stockPositions;
          this.totalBalance = stockPositions.reduce((sum, current) => sum + (current.Balance || 0), 0);
          this.totalProfitLoss = stockPositions.reduce((sum, current) => sum + (current.ProfitLoss || 0), 0);
        });
      } else
        this.stockPositions = [];
    });
    // Get all trades.
    console.log('Stock Positions Component > Get all trades');
    this.tradeService.getAll()
        .subscribe(result => { });
  }

}
