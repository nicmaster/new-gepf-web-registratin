import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecaptchaModule } from 'ng-recaptcha';
import { MainRoutingModule } from './main-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainComponent} from './components/main/main.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {ToolbarComponent} from "./components/toolbar/toolbar.component";
import {MaterialComponentsModule} from "../material-components.module";
import { OtpComponent } from './components/otp/otp.component';
import { VerificationComponent } from './components/verification/verification.component'
import { from } from 'rxjs';

@NgModule({
    declarations: [
        MainComponent,
        ToolbarComponent,
        VerificationComponent,
        OtpComponent

    ],
    imports: [
        MaterialComponentsModule,
        FlexLayoutModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MainRoutingModule,
        RecaptchaModule
    ],
    providers: []
})

export class MainModule {}
