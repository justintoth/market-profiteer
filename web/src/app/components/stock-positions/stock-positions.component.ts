import { Component, OnInit } from '@angular/core';
import { StockService } from 'src/app/services/stock.service';
import { StockPosition } from 'src/app/models/stock-position.model';

@Component({
  selector: 'app-stock-positions',
  templateUrl: './stock-positions.component.html',
  styleUrls: ['./stock-positions.component.scss']
})
export class StockPositionsComponent implements OnInit {

  public stockPositions: StockPosition[] = [];

  constructor(private stockService: StockService) {
   }

  ngOnInit(): void {
    this.stockService.getAllPositions().subscribe(function(result: StockPosition[]) {
      this.stockPositions = result;
    }.bind(this));
  }

}
