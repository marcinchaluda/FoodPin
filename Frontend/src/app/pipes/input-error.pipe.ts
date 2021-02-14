import { Pipe, PipeTransform } from '@angular/core';
import {FormControl} from "@angular/forms";

@Pipe({
  name: 'inputError'
})
export class InputErrorPipe implements PipeTransform {

  transform(value: FormControl): string {
    let errorMessage: string = '';
    console.log(value)
    if (value) {
      if (value['required']) {
        errorMessage = `Field is required`;
      }
      if (value['minlength']) {
        errorMessage = `Field must be at least 3 characters`;
      }
    } else {
      errorMessage = '';
    }
    console.log(errorMessage);
    return errorMessage;
  }

}
