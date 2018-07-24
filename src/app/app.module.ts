import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { NgxBraintreeModule } from 'ngx-braintree';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BlankpageComponent } from './blankpage/blankpage.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { WalletTranscationComponent } from './wallet-transcation/wallet-transcation.component';
import { TranscationStatusComponent } from './transcation-status/transcation-status.component';


@NgModule({
  declarations: [
    AppComponent,
    BlankpageComponent,
    PagenotfoundComponent,
    WalletTranscationComponent,
    TranscationStatusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    NgxSpinnerModule,
    NgxBraintreeModule, 
    HttpClientModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
