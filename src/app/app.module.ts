import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { BlankpageComponent } from './blankpage/blankpage.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { WalletTranscationComponent } from './wallet-transcation/wallet-transcation.component';

@NgModule({
  declarations: [
    AppComponent,
    BlankpageComponent,
    PagenotfoundComponent,
    WalletTranscationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
