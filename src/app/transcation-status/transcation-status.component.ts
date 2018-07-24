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
  response:any
  ProcessId:string
  TranscationResponse:any;
  interval: any;
  clientToken: string;
  TranscationId:string;
  constructor(private authService: AuthService,private dbService: DatabaseService,
    private spinner: NgxSpinnerService) {

    this.authService.paymentResponse.subscribe(
      (data)  => {
        this.response = data.paymentResponse;
      });

   }

  ngOnInit() {
    this.header=this.response.header;
    this.message=this.response.message;
    this.imagename=this.response.icon;
    this.imagepath='../../assets/images/'+this.imagename+'.svg'
    this.ProcessId=this.response.TransactionId;
    if(this.response.icon=='success')
    this.GetParam('TID');
    
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
      this.spinner.show();
        this.dbService.UpdateTranscationStatus({TranscationId:this.TranscationId,ProcessId:this.ProcessId,ProcessStatus:this.imagename}).subscribe(
          data => {
            
          },
          err => {},
          () => {
            window.location.href="http://ewallet.softomation.in/#/wallet";
        });
  }

}
