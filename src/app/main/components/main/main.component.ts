import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {AppCustomDirective} from './CustomValidations';
import {RestService} from 'src/app/service/rest-service';
import {PersonDetails} from 'src/app/model/person-details';
import {IdType} from 'src/app/model/idtype';
import {AccountStatus} from 'src/app/model/accountstatus';
import {FunctionType} from 'src/app/model/functiontype'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ActionType } from 'src/app/model/actiontype';
import { NgxSpinnerService } from "ngx-spinner";
import { from } from 'rxjs';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    } 
}

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'benefit-page',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})

// tslint:disable-next-line:one-line
export class MainComponent implements OnInit{
   
    personDetails: PersonDetails;
    public registeredMetaData: any = {};
    valid = false;
    recaptcha: string;
    public realm: string;
    public clientId: string;

    constructor(private fb:FormBuilder, private spinner: NgxSpinnerService, private restService:RestService, private router: Router, private route: ActivatedRoute){
        
        this.route.params.subscribe((parmas) => {
            this.realm = parmas['realm'];
            this.clientId = parmas['clientId'];
        });
    }



    DaterForm : FormGroup;
    minDate = new Date();
    maxDate = new Date();


    ngOnInit(){
        this.DaterForm = this.fb.group(
            {
                maxDate:['',[AppCustomDirective.fromDateValidator]],
            },{validator:[AppCustomDirective.timeValidator]

            }
        );

        this.personDetails = {registrationId:"", cellNumber:"", email:"", identification:"", idType:"",
        dateOfBirth: "", countryOfOrigin: "", clientId: this.clientId}
    }


    resolved(response: string) {
        this.recaptcha = response;
        if (this.recaptcha != null){
            this.valid = true;
        }
        else{
            this.valid = false;
        }
    }

    countyOfIsuue = new FormControl('',[
        Validators.required
    ]);

    passportNumber = new FormControl('',[
        Validators.required
    ]);


    // tslint:disable-next-line:member-ordering
    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.email,

    ]);

    // tslint:disable-next-line:member-ordering
    phoneNumber = new FormControl('', [
        Validators.required,
        Validators.pattern( '^(\\+27|0)[6-8][0-9]{8}$' )
    ]);

    // tslint:disable-next-line:member-ordering
    idNumber = new FormControl('', [
        Validators.required,
        Validators.pattern('(?<Year>[0-9][0-9])(?<Month>([0][1-9])|([1][0-2]))(?<Day>([0-2][0-9])|([3][0-1]))(?<Gender>[0-9])(?<Series>[0-9]{3})(?<Citizenship>[0-9])(?<Uniform>[0-9])(?<Control>[0-9])')
    ]);


    // non south african Validations

    // tslint:disable-next-line:member-ordering
    EmailFormControl = new FormControl('', [
        Validators.required,
        Validators.email,

    ]);

    // tslint:disable-next-line:member-ordering
    PhoneNumber = new FormControl('', [
        Validators.required,
        Validators.pattern( '^(\\+27|0)[6-8][0-9]{8}$' )
    ]);

    // tslint:disable-next-line:member-ordering
    // IdNumber = new FormControl('', [
    //     Validators.required,
    //     Validators.pattern('(?<Year>[0-9][0-9])(?<Month>([0][1-9])|([1][0-2]))(?<Day>([0-2][0-9])|([3][0-1]))(?<Gender>[0-9])(?<Series>[0-9]{3})(?<Citizenship>[0-9])(?<Uniform>[0-9])(?<Control>[0-9])')
    // ]);

    // tslint:disable-next-line:member-ordering
    matcher = new MyErrorStateMatcher();

    identifyUser(idtype:string, idNumberValue:string, cellNumberValue:string, emailValue:string){
        if(idtype==IdType.IdNumber){
            console.log("========type==="+idtype);
            this.personDetails.idType = idtype;
            this.personDetails.identification = idNumberValue;
            this.personDetails.cellNumber = cellNumberValue;
            this.personDetails.email = emailValue;

         /** spinner starts on init */
         this.spinner.show();

            this.restService.CreateNewProfileRest(this.personDetails)
            .subscribe(data =>{
              console.log(data)
              this.registeredMetaData = data;
              console.log("=======realm===="+this.realm)
              console.log("=======clientId===="+this.clientId)
              console.log("====registrationId====="+this.registeredMetaData.registrationId)
              console.log("====accountStatus===="+this.registeredMetaData.accountStatus)
              console.log("-----");
              
              //step 1 check opt 
              if(this.registeredMetaData.accountStatus == AccountStatus.ACCOUNT_CREATED && this.registeredMetaData.registrationId.length > 6){  
                  console.log("start otp progress========")

                  console.log(this.registeredMetaData);

                this.restService.SendOTPRest(this.registeredMetaData)
                    .subscribe(data =>{
                        this.registeredMetaData = data;
                        console.log("OTP SENT to someone")
                        console.log(data);

                        setTimeout(() => {
                            /** spinner ends after 5 seconds */
                            this.spinner.hide();
                            }, 1000);

                        if(this.registeredMetaData.accountStatus == AccountStatus.OTP_SUCCESSFUL && this.registeredMetaData.functionType == FunctionType.register){
                           
                            console.log("partyid========"+this.registeredMetaData.partyId)
                           
                            this.router.navigate(['/management/user/otp/'+this.realm+'/client/'+this.clientId
                            +''],{ queryParams: { action: this.registeredMetaData.functionType, state:  this.registeredMetaData.registrationId, esponse_mode: 'fragment',
                            response_type: 'code', scope: 'openid', partyid:this.registeredMetaData.partyId, nonce: this.registeredMetaData.registrationId} }); 
                        }
                        else{
                            console.log("not ==========OTP_SUCCESSFUL + ========")
                            setTimeout(() => {
                                /** spinner ends after 5 seconds */
                                this.spinner.hide();
                                }, 1000);
                        }

                    },
                        (error)=>{
                            console.log(error.error.message)
                    }
                );

              }else if(this.registeredMetaData.accountStatus == AccountStatus.USER_REGISTERED){
                console.log("user already registered========")
                setTimeout(() => {
                    /** spinner ends after 5 seconds */
                    this.spinner.hide();
                    }, 1000);
              }else{
                console.log("error trying to register========")
                setTimeout(() => {
                    /** spinner ends after 5 seconds */
                    this.spinner.hide();
                    }, 1000);
              }
            
            },
              (error)=>{
                  console.log(error)
              }
            
            );
        }  

    }

}