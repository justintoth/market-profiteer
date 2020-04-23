import { TradeService } from './../../services/trade.service';
import { Component, OnInit } from '@angular/core';
import { Trade } from 'src/app/models/trade.model';

@Component({
  selector: 'app-trade-history',
  templateUrl: './trade-history.component.html',
  styleUrls: ['./trade-history.component.scss']
})
export class TradeHistoryComponent implements OnInit {

  public trades: Trade[];

  constructor(private tradeService: TradeService) { 
  }

  ngOnInit(): void {
      // Listen for updates to trades.
      this.tradeService.tradesSubscription.subscribe((result) => {
        if (result.length === 0)
          return;
        console.log('Trade History Component > tradesSubscription > trades: ', result.length);
        this.trades = result;
      });
      this.tradeService.tradesProfitLossSubscription.subscribe((result) => {
        if (result.length === 0)
          return;
        console.log('Trade History Component > tradesProfitLossSubscription > trades: ', result.length);
        this.trades = result;
      });
      console.log('Trade History Component > Listening to updates');
    }

    onEdit(trade:Trade): void {
      console.log('Trade History Component > Edit trade: ', trade);
      this.tradeService.editTradeSubscription.next(trade);
    }

}