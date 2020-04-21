import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule }   from '@angular/forms';
import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';

import { TradeHistoryComponent } from './components/trade-history/trade-history.component';
import { StockPositionsComponent } from './components/stock-positions/stock-positions.component';
import { TradeFormComponent } from './components/trade-form/trade-form.component';

@NgModule({
  declarations: [
    AppComponent,
    StockPositionsComponent,
    TradeHistoryComponent,
    TradeFormComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    DlDateTimeDateModule,
    DlDateTimePickerModule,
  ],
  providers: [FormsModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
