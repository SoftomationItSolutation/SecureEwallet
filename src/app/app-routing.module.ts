import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '../../node_modules/@angular/router';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';
import { MywalletTranscationComponentComponent } from './mywallet-transcation-component/mywallet-transcation-component.component';

const appRoutes: Routes = [ 
  { path: 'ProcessTranscation?TID=', component:  MywalletTranscationComponent},
  { path: '**', component: PageNotFoundComponent } 
];
  export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes ,{useHash: true});
@NgModule({
  imports: [CommonModule,routing],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
