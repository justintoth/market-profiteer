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

  constructor(private tradeService: TradeService, private stockService: StockService) {
   }

  ngOnInit(): void {
    // Listen for updates to trades.
    this.tradeService.TradesSubject.subscribe((trades) => {
      // Get all stock positions.
      this.stockService.getAllPositions(trades).subscribe((stockPositions) => {
        this.stockPositions = stockPositions;
      });
    });
    
  }

}
