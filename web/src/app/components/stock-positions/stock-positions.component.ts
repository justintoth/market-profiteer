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
  public tradesProfit:number = 0;
  public stockPositionsProfit:number = 0;
  public totalProfit:number = 0;

  constructor(private tradeService: TradeService, private stockService: StockService) {
   }

  ngOnInit(): void {
    // Listen for updates to trades.
    this.tradeService.tradesSubscription.subscribe((trades) => {
      if (trades.length === 0)
          return;
      console.log('Stock Positions Component > tradesSubscription > trades: ', trades.length);
      // Get all stock positions.
      /*const subscription =*/ this.stockService.getAllPositions(trades).subscribe((stockPositions) => {
        if (stockPositions.length === 0)
          return;
        console.log('Stock Positions Component > getAllPositions > stockPositions: ', stockPositions.length);
        this.stockPositions = stockPositions;
        // Update summary.
        this.tradesProfit = trades
          .filter(x => !x.IsPurchase)
          .reduce((sum, current) => sum + (current.SaleProfitLoss || 0), 0);
        this.stockPositionsProfit = stockPositions
          .reduce((sum, current) => sum + current.ProfitLoss, 0);
        this.totalProfit = this.tradesProfit + this.stockPositionsProfit;
        //subscription.unsubscribe();
      });
      console.log('Stock Positions Component > Listening to updates');
    });
    
  }

}
