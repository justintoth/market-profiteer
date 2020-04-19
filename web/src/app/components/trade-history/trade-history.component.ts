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
    this.tradeService.getAll().subscribe(function(result: Trade[]) {
      this.trades = result;
    }.bind(this));
  }

}