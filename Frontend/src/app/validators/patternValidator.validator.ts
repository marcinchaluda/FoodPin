import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export const patternValidator = (regex: RegExp, error: ValidationErrors): ValidatorFn => {
  // @ts-ignore
  return ((control: AbstractControl): {[key: string]: any} => {
    if (!control.value) {
      // if control is empty return with no error
      return null;
    }
    // test the value of the control against te regex supplied
    const valid = regex.test(control.value);

    return valid ? null : error;
  });
};
