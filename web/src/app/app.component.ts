import { Component, OnInit } from '@angular/core';
import { TradeService } from './services/trade.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'stock-marathoner';

  constructor(private tradeService: TradeService) { 
  }

  ngOnInit(): void {
    // Get all trades.
    console.log('App Component > Get all trades');
    const subscription = this.tradeService.getAll()
        .subscribe(result => {
          //subscription.unsubscribe();
        });
  }
}
