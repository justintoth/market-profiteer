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

  formIsVisible: boolean = false;
  model: Trade = new Trade();
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

  stockSymbolChanged() {
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
        subscription.unsubscribe();
      });
  }

}
