import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Trade } from 'src/app/models/trade.model';
import { TradeService } from 'src/app/services/trade.service';
import { StockService } from 'src/app/services/stock.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-trade-form',
  templateUrl: './trade-form.component.html',
  styleUrls: ['./trade-form.component.scss']
})
export class TradeFormComponent implements OnInit {

  formIsVisible = false;
  model = new Trade();
  @ViewChild("stockSymbol") stockSymbolField: ElementRef;

  constructor(
    private tradeService: TradeService, 
    private stockService: StockService, 
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    // Listen for updates to trades.
    this.tradeService.tradesSubscription.subscribe((result) => {
      // Reset form.
      this.model.Id = null;
      this.model.Date = new Date();
      this.model.StockSymbol = null;
      this.model.IsPurchase = true;
      this.model.Price = null;
      this.model.Quantity = null;
      // TODO: Show alert that form was saved.
    });
    // Listen for updates to edit trade.
    this.tradeService.editTradeSubscription.subscribe((result) => {
      if (result.Date) {
        // Populate form values.
        this.model.Id = result.Id;
        this.model.Date = new Date(result.Date);
        this.model.StockSymbol = result.StockSymbol;
        this.model.IsPurchase = result.IsPurchase;
        this.model.Price = result.Price;
        this.model.Quantity = result.Quantity;
        // Show form.
        this.formIsVisible = true;
      }
    });
  }

  onShowForm() {
    this.formIsVisible = true;
    // Set focus.
    setTimeout(() => { this.stockSymbolField.nativeElement.focus(); });
  }

  onStockSymbolChanged() {
    if (this.model.Price)
      return;
    // If no price inputted, populate it from stock.
    const subscription = this.stockService.getPrice(this.model.StockSymbol)
      .subscribe(result => {
        if (result)
          this.model.Price = result.price;
        //subscription.unsubscribe();
      });
  }

  onSubmit() {
    const subscription = this.tradeService.save(this.model)
      .subscribe(result => {
        this.formIsVisible = false;
        this.toastr.success(`Your trade of ${result.StockSymbol} was saved.`, 'Success!');
        //subscription.unsubscribe();
      });
  }

}
