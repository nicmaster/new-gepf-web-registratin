"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var VerificationComponent = /** @class */ (function () {
    function VerificationComponent() {
        this.verificationForm = new forms_1.FormGroup({
            contactNumber: new forms_1.FormControl(''),
            pensionNumber: new forms_1.FormControl(''),
            cpNumber: new forms_1.FormControl('')
        });
        this.secureVerificationForm = new forms_1.FormGroup({
            dateOfIssue: new forms_1.FormControl(''),
            session_OTP: new forms_1.FormControl(''),
            memberFirstName: new forms_1.FormControl(''),
            memberLastName: new forms_1.FormControl('')
        });
    }
    VerificationComponent.prototype.verifyAction = function () {
        //call the httpService to verify the person and get DOHA details
    };
    VerificationComponent = __decorate([
        core_1.Component({
            selector: 'verification',
            templateUrl: './verification.component.html',
            styleUrls: ['./verification.component.scss']
        })
    ], VerificationComponent);
    return VerificationComponent;
}());
exports.VerificationComponent = VerificationComponent;
//# sourceMappingURL=verification.component.js.map