import { Pipe, PipeTransform } from '@angular/core';
import {FormControl} from "@angular/forms";

@Pipe({
  name: 'inputError'
})
export class InputErrorPipe implements PipeTransform {

  transform(value: FormControl): string {
    let errorMessage: string = '';
    const regexNewLine = /\n/g;

    if (!value) {
      return;
    }
    if (value['required']) {
      errorMessage += 'Field is required \n';
    }
    if (value['minlength']) {
      errorMessage += 'Field must be at least 6 characters \n';
    }
    if (value['email']) {
      errorMessage += 'Field must be a valid email address \n';
    }
    if (value['hasNumber']) {
      errorMessage += 'Field must contain at least 1 number \n';
    }
    if (value['hasCapitalCase']) {
      errorMessage += 'Field must contain at least 1 capital letter \n';
    }
    if (value['hasSmallCase']) {
      errorMessage += 'Field must contain at least 1 lowercase letter \n';
    }
    if (value['NoPasswordMatch']) {
      errorMessage += 'Passwords do not match';
    }
    return errorMessage.replace(regexNewLine, "<br>");
  }
}
