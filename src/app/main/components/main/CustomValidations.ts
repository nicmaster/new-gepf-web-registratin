import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

// tslint:disable-next-line:one-line
export class AppCustomDirective extends Validators {

    static fromDateValidator(fdValue: FormControl) {
        const date = fdValue.value;
        console.log('x');
        // tslint:disable-next-line:curly
        if (date === null || date === '') return {requiredFromDate: true};

    }

    static ToDateValidator(todValue: FormControl) {
        const date = todValue.value;

        // tslint:disable-next-line:curly
        if (date === null || date === '') return {requiredToDate: true};

    }
    static timeValidator(formGroupValues: FormGroup): any {
        debugger;
        console.log(formGroupValues);
        const maxDate = formGroupValues.get('maxDate').value;

    }
}