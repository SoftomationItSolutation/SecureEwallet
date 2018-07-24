import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http } from '../../../node_modules/@angular/http';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  apiurl: string = environment.api_Url;
  constructor(private objHttp: Http) { }

  GetTranscationDetails(objTranscationId: {}) {
    return this.objHttp.post(this.apiurl+'GetTranscationManagement', objTranscationId);
  }

  UpdateTranscationStatus(objTranscationId) {
    return this.objHttp.post(this.apiurl+'UpdateTranscationStatus', objTranscationId);
  }
}
