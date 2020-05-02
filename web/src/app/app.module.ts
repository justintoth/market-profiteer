import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule }   from '@angular/forms';
import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { JwtModule } from '@auth0/angular-jwt';

import { TradeHistoryComponent } from './components/trade-history/trade-history.component';
import { StockPositionsComponent } from './components/stock-positions/stock-positions.component';
import { TradeFormComponent } from './components/trade-form/trade-form.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { AuthGuard } from './guards/auth.guard';
import { UserService } from './services/user.service';
import { ClientStorage } from './shared/client-storage';
import { environment } from 'src/environments/environment';
import { SummaryComponent } from './components/summary/summary.component';

@NgModule({
  declarations: [
    AppComponent,
    UserFormComponent,
    TradeFormComponent,
    TradeHistoryComponent,
    StockPositionsComponent,
    SummaryComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    DlDateTimeDateModule,
    DlDateTimePickerModule,
    BrowserAnimationsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          const user = ClientStorage.getUser();
          return user ? user.AuthToken : null;
        },
        whitelistedDomains: [environment.apiHost],
        blacklistedRoutes: [`${environment.apiHost}/users/authenticate`, `${environment.apiHost}/users`]
      }
    }),
    ToastrModule.forRoot()
  ],
  providers: [
    FormsModule, 
    UserService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }