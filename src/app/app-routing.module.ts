import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '../../node_modules/@angular/router';
import { BlankpageComponent } from './blankpage/blankpage.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { WalletTranscationComponent } from './wallet-transcation/wallet-transcation.component';
import { TranscationStatusComponent } from './transcation-status/transcation-status.component';

const appRoutes: Routes = [ 
  { path: '', component:  BlankpageComponent},
  { path: 'ProcessTranscation', component:  WalletTranscationComponent},
  { path: 'TranscationStatus', component:  TranscationStatusComponent},
  { path: '**', component: PagenotfoundComponent } 
];
  export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes ,{useHash: true});
@NgModule({
  imports: [CommonModule,routing],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
