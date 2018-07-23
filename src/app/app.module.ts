import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';
import { MywalletTranscationComponentComponent } from './mywallet-transcation-component/mywallet-transcation-component.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponentComponent,
    MywalletTranscationComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
