import { Component, OnInit } from '@angular/core';
import { StockService } from 'src/app/services/stock.service';
import { TradeService } from 'src/app/services/trade.service';
import { Utils } from 'src/app/shared/utils';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  public tradesProfit = 0;
  public stockPositionsProfit = 0;
  public totalProfit = 0;

  constructor(private tradeService: TradeService, private stockService: StockService) {
  }

  ngOnInit(): void {
    // Listen for updates to trades.
    this.tradeService.tradesSubscription.subscribe((trades) => {
      if (trades.length > 0) {
        // Get all stock positions.
        this.stockService.getAllPositions(trades).subscribe((stockPositions) => {
          // Update summary.
          this.tradesProfit = trades
            .filter(x => !x.IsPurchase)
            .reduce((sum, current) => sum + (current.SaleProfitLoss || 0), 0);
          this.stockPositionsProfit = stockPositions
            .reduce((sum, current) => sum + current.ProfitLoss, 0);
          this.totalProfit = this.tradesProfit + this.stockPositionsProfit;
        });
      } else
        this.tradesProfit = this.stockPositionsProfit = this.totalProfit = 0;
    });
  }

  stockPriceRefreshDate(): string {
    const refreshDate = this.stockService.stockPriceRefreshDate;
    return refreshDate ? refreshDate.format('MMMM Do YYYY, h:mm a') : null;
  }

  stockMarketIsOpen(): boolean {
    return Utils.stockMarketIsOpen();
  }

}
