import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgxBraintreeService } from '../../../node_modules/ngx-braintree';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Router } from '../../../node_modules/@angular/router';

declare var braintree: any;

@Component({
  selector: 'app-blankpage',
  templateUrl: './blankpage.component.html',
  styleUrls: ['./blankpage.component.css']
})

export class BlankpageComponent implements OnInit {
  TranscationAmount:number;
  TranscationId:string;

  @Input() clientTokenURL: string;
  @Input() createPurchaseURL: string;
  @Output() paymentStatus: EventEmitter<any> = new EventEmitter<any>();
  clientToken: string;
  showDropinUI = true;
  clientTokenNotReceived = false;
  interval: any;
  instance: any;

  constructor(private router: Router,private service: NgxBraintreeService) { }

  ngOnInit() {
    this.TranscationAmount=10;
    this.clientTokenURL='http://localhost:63720/api/braintree/getclienttoken'
    this.service
        .getClientToken(this.clientTokenURL)
        .subscribe((clientToken: string) => {
            this.clientToken = clientToken;
            this.clientTokenNotReceived = false;
            this.interval = setInterval(() => { this.createDropin(); }, 0);
        }, (error) => {
            this.clientTokenNotReceived = true;
            console.log(`Client token not received. Please make sure your braintree server api is configured properly, running and accessible.`);
        });
  }
  onDropinLoaded(event) {
    console.log("dropin loaded...");
  }
  paymentResponse: any;
  onPaymentStatus(response): void {
    this.paymentResponse.emit(response);
    this.router.navigate(['/TranscationStatus']);
  }
  createDropin() {
    if (typeof braintree !== 'undefined') {
        braintree.dropin.create({authorization: this.clientToken,container: '#dropin-container'}, 
        (createErr, instance) => {
        this.instance = instance;
    });
        clearInterval(this.interval);
    }
}

pay(): void {
  if (this.instance) {
      this.instance.requestPaymentMethod((err, payload) => {
      this.showDropinUI = false;
      this.service.createPurchase(this.createPurchaseURL, payload.nonce,this.TranscationAmount)
          .subscribe((status: any) => {
              this.paymentStatus.emit(status);
          });
      });
  }
}   

}
