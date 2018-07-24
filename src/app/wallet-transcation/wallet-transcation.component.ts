import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgxBraintreeService } from '../../../node_modules/ngx-braintree';
import { Router } from '../../../node_modules/@angular/router';
import { DatabaseService } from '../services/database.service';
import { NgxSpinnerService } from '../../../node_modules/ngx-spinner';
import { AuthService } from '../services/auth.service';

declare var braintree: any;

export interface ITranscationDetails{
  TranscationId:string;
  Amount :number;
  UserId:Number;
  RewardId:Number;
}

@Component({
  selector: 'app-wallet-transcation',
  templateUrl: './wallet-transcation.component.html',
  styleUrls: ['./wallet-transcation.component.css']
})


export class WalletTranscationComponent implements OnInit {
  
  constructor(private router: Router,private dbService: DatabaseService,private auth:  AuthService,
    private service: NgxBraintreeService,private spinner: NgxSpinnerService) { }
  
  TranscationDetails:ITranscationDetails
  TranscationAmount:number;
  TranscationId:string;
  clientToken: string;
  
  showDropinUI = true;
  clientTokenNotReceived = false;
  interval: any;
  instance: any;
  @Input() clientTokenURL: string;
  @Input() createPurchaseURL: string;

  ngOnInit() {
    this.clientTokenURL='http://api.softomation.in/api/braintree/getclienttoken'
    this.createPurchaseURL='http://api.softomation.in/api/braintree/createpurchase'
    this.GetParam('TID');
    this.GetTranscation();
  }

  GetParam(name){
    const results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if(!results){
      return 0;
    }
    this.TranscationId= results[1] || '0';
  }

  GetTranscation(){
    if(this.TranscationId == '0' || this.TranscationId =='undefined'){
      this.router.navigate(['']);
    }
    else{
      this.spinner.show();
        this.dbService.GetTranscationDetails({TranscationId:this.TranscationId}).subscribe(
          data => {
            if(JSON.parse(data.json()).flag){
            this.TranscationDetails=JSON.parse(data.json());
            this.TranscationId=this.TranscationDetails.TranscationId;
            this.TranscationAmount=this.TranscationDetails.Amount;
            setInterval(() => { this.GenerateTocken(); }, 2000);
            }
            else{
              this.router.navigate(['']);
            }
            
          },
          err => {this.router.navigate(['']);},
          () => {
            
        });
    }
  }

  GenerateTocken(){
    this.service.getClientToken(this.clientTokenURL)
        .subscribe((clientToken: string) => {
            this.clientToken = clientToken;
            this.clientTokenNotReceived = false;
            this.interval = setInterval(() => { this.createDropin(); }, 0);
        }, (error) => {
            this.spinner.hide();
            this.clientTokenNotReceived = true;
            console.log(`Client token not received. Please make sure your braintree server api is configured properly, running and accessible.`);
        });
  }

  createDropin() {
    if (typeof braintree !== 'undefined') {
        braintree.dropin.create({authorization: this.clientToken,container: '#dropin-container'}, 
        (createErr, instance) => {
        this.instance = instance;
    });
        clearInterval(this.interval);
        this.spinner.hide();
    }
    else
      this.spinner.hide();
  }

  onDropinLoaded(event) {
    console.log("dropin loaded...");
  }
  
  onPaymentStatus(response): void {
    this.auth.paymentResponse.emit(response);
    this.router.navigate(['/TranscationStatus?TID='+this.TranscationId]);
  }

}
