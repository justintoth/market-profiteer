import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Trade } from 'src/app/models/trade.model';
import { TradeService } from 'src/app/services/trade.service';

@Component({
  selector: 'app-trade-form',
  templateUrl: './trade-form.component.html',
  styleUrls: ['./trade-form.component.scss']
})
export class TradeFormComponent implements OnInit {

  formIsVisible: boolean = false;
  model: Trade = new Trade();
  @ViewChild("stockSymbol") stockSymbolField: ElementRef;

  constructor(private tradeService: TradeService) { }

  ngOnInit(): void {
    // Listen for updates to trades.
    this.tradeService.tradesSubscription.subscribe((result) => {
      // Reset form.
      this.model.Date = new Date();
      this.model.StockSymbol = null;
      this.model.IsPurchase = true;
      this.model.Price = null;
      this.model.Quantity = null;
      // TODO: Show alert that form was saved.
    });
  }

  showForm() {
    this.formIsVisible = true;
    // Set focus.
    setTimeout(() => { this.stockSymbolField.nativeElement.focus(); });
  }

  onSubmit() {
    const subscription = this.tradeService.save(this.model)
      .subscribe(result => {
        subscription.unsubscribe();
      });
    this.formIsVisible = false;
  }

}
