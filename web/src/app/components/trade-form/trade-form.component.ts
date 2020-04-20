import { Component, OnInit } from '@angular/core';
import { Trade } from 'src/app/models/trade.model';
import { TradeService } from 'src/app/services/trade.service';

@Component({
  selector: 'app-trade-form',
  templateUrl: './trade-form.component.html',
  styleUrls: ['./trade-form.component.scss']
})
export class TradeFormComponent implements OnInit {

  model: Trade = new Trade();

  constructor(private tradeService: TradeService) { }

  ngOnInit(): void {
    // Listen for updates to trades.
    this.tradeService.TradesSubject.subscribe((result) => {
      // Reset form.
      //this.model.Date = new Date();
      this.model.StockSymbol = null;
      this.model.IsPurchase = true;
      this.model.Price = null;
      this.model.Quantity = null;
      // TODO: Show alert that form was saved.
    });
  }

  onSubmit() {
    this.tradeService.save(this.model);
  }

}
