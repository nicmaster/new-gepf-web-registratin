import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './components/main/main.component';
import { OtpComponent } from './components/otp/otp.component';
import { VerificationComponent } from './components/verification/verification.component';

const appRoutes: Routes = [
    { path: '', component: OtpComponent },
    { path: 'management/user/registration/:realm/client/:clientId', component: MainComponent },
    { path: 'management/user/otp/:realm/client/:clientId', component: OtpComponent },
    { path: 'management/user/welcome', component: VerificationComponent }


];

@NgModule({
    imports: [
        RouterModule.forChild(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})


export class MainRoutingModule {}
