import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DatabaseService } from '../services/database.service';
import { NgxSpinnerService } from '../../../node_modules/ngx-spinner';

@Component({
  selector: 'app-transcation-status',
  templateUrl: './transcation-status.component.html',
  styleUrls: ['./transcation-status.component.css']
})
export class TranscationStatusComponent implements OnInit {
  imagepath:string;
  imagename:string;
  header:string;
  message:string;
  Paymentresponse:any
  ProcessId:string
  TranscationResponse:any;
  interval: any;
  clientToken: string;
  TranscationId:string;
  TranscationDetails:ITranscationDetails
  timercount:number;
  constructor(private authService: AuthService,private dbService: DatabaseService,
    private spinner: NgxSpinnerService) {
      this.Paymentresponse= this.authService.getPaymentResponse();
      this.TranscationResponse= this.authService.getTranscationData();
      this.header=this.Paymentresponse.header;
      this.message=this.Paymentresponse.message;
      this.imagename=this.Paymentresponse.icon;
      this.imagepath='../../assets/images/'+this.imagename+'.svg'
      this.ProcessId=this.Paymentresponse.TransactionId;

    }

  ngOnInit() {
    this.Paymentresponse= this.authService.getPaymentResponse();
    this.TranscationResponse= this.authService.getTranscationData();
    this.header=this.Paymentresponse.header;
    this.message=this.Paymentresponse.message;
    this.imagename=this.Paymentresponse.icon;
    this.imagepath='../../assets/images/'+this.imagename+'.svg'
    this.ProcessId=this.Paymentresponse.TransactionId;
    this.UpdateTranscationStatus();
  }

  GetParam(name){
    const results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if(!results){
      return 0;
    }
    this.TranscationId= results[1] || '0';
    this.UpdateTranscationStatus();
  }

  UpdateTranscationStatus(){
    this.authService.removeSession();
      this.spinner.show();
        this.dbService.UpdateTranscationStatus({TranscationId:this.TranscationResponse.TranscationId,ProcessId:this.ProcessId,ProcessStatus:this.imagename}).subscribe(
          data => {
            
          },
          err => {},
          () => {
            this.RedirecttoWallet();
        });
  }

  RedirecttoWallet(){
    var seconds = 10;
      var dvCountDown = document.getElementById("dvCountDown");
      dvCountDown.style.display = "block";
      var lblCount = document.getElementById("lblCount");
      dvCountDown.style.display = "block";
      lblCount.innerHTML = seconds.toString();
      setInterval(function () {
          seconds--;
          lblCount.innerHTML = seconds.toString();
          if (seconds == 0) {
              dvCountDown.style.display = "none";
              window.location.href="http://ewallet.softomation.in/#/wallet";
          }
      }, 1000);
  }
}
export interface ITranscationDetails{
  TranscationId:string;
  Amount :number;
  UserId:Number;
  RewardId:Number;
}
