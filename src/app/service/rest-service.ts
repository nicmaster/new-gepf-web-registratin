import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, RequestOptions} from '@angular/http';
import { environment } from '../../environments/environment';
import { PersonDetails} from 'src/app/model/person-details'
import {VerifyOtp} from 'src/app/model/verifyotp'

@Injectable()
export class RestService {
    
    private campaignManagerService: string = environment.serviceURL;
    constructor(private http: HttpClient) { }

    CreateNewProfileRest(personDetails:PersonDetails){
        let headers = new Headers({'Content-Type':'application/json'})
        let options = new RequestOptions ({headers:headers}) 
        return this.http.post("http://127.0.0.1:8099/api/v1/user/management/registration", personDetails);
    }

    SendOTPRest(personDetails:PersonDetails){
        let headers = new Headers({'Content-Type':'application/json'})
        let options = new RequestOptions ({headers:headers}) 
        return this.http.post("http://127.0.0.1:8099/api/v1/user/management/otp/send", personDetails);
    }

    verifyOTPRest(verifyOtp:VerifyOtp){
        let headers = new Headers({'Content-Type':'application/json'})
        let options = new RequestOptions ({headers:headers}) 
        return this.http.post("http://127.0.0.1:8099/api/v1/user/management/otp/verify", verifyOtp);
    }
}
