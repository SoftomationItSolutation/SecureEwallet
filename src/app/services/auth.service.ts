
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { SessionStorageService } from '../../../node_modules/ngx-webstorage';
import { Router } from '../../../node_modules/@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router,private http: HttpClient,private sessionData:SessionStorageService,) { }
  
  getTranscationData(){
    return this.sessionData.retrieve("transcationdata");
  } 
  getPaymentResponse(){
    return this.sessionData.retrieve("paymentResponse");
  } 
  removeSession(){
    this.sessionData.clear("transcationdata");
    this.sessionData.clear("transcationdata");
  }
  setSession(pagename,transcationdata:any,paymentResponse:any){
    this.sessionData.store("transcationdata", transcationdata)
    this.sessionData.store("paymentResponse", paymentResponse)
    this.router.navigate(['/'+pagename]);
  }

}
