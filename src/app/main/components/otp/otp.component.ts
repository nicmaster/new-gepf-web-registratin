import { Component, OnInit } from '@angular/core';
import {ErrorStateMatcher} from '@angular/material/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {RestService} from 'src/app/service/rest-service';
import {PersonDetails} from 'src/app/model/person-details';
import {IdType} from 'src/app/model/idtype';
import {AccountStatus} from 'src/app/model/accountstatus';
import {FunctionType} from 'src/app/model/functiontype'
import {VerifyOtp} from 'src/app/model/verifyotp'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ActionType } from 'src/app/model/actiontype';
import { NgxSpinnerService } from "ngx-spinner";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {
public clientId: string;
public functionType: string;
public stateId: string;
public partyId: string;
verifyOtp: VerifyOtp
otpReturnData: any = {};

  constructor(private restService:RestService, private spinner: NgxSpinnerService, private router: Router, private route: ActivatedRoute) { 
    this.route.params.subscribe((parmas) => {
      this.clientId = parmas['clientId'];

  });
  this.route.queryParams.subscribe(
    params =>{ 
      this.functionType = params['action'];
      this.stateId = params['state'];
      this.partyId = params['partyid'];
    });


  }

  ngOnInit() {
    console.log("OTP=====action====="+this.functionType);
    console.log("OTP=====client====="+this.clientId);
    console.log("OTP=====state====="+this.stateId);
    console.log("OTP=====PartyID====="+this.partyId);
    this.verifyOtp = {registrationId:this.stateId, otp:0, clientId:this.clientId, functionType:this.functionType,
                      partyId: this.partyId}

  }

  optNum1 = new FormControl('',[
    Validators.required
    ]);

  matcher = new MyErrorStateMatcher();

  verifyOtpFunction(otpNumber:number){

    this.verifyOtp.otp = otpNumber;

    /** spinner starts on init */
    this.spinner.show();

    this.restService.verifyOTPRest(this.verifyOtp)
    .subscribe(data =>{
      console.log("data====================after the call to verify OTP")
      this.otpReturnData = data;
      console.log(this.otpReturnData)

      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
        }, 100);

        this.router.navigate(['/management/user/welcome']);

    },
      (error)=>{
        console.log(error.error.message)
      }
    );
  }

}
