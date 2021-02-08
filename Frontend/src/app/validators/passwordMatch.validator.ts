import {AbstractControl} from "@angular/forms";

// @ts-ignore
export const passwordMatchValidator = (control: AbstractControl): { [key: string]: any } => {
  const password: string = control.get('password').value;
  const confirmPassword: string = control.get('confirmPassword').value;

  if (password !== confirmPassword) {
    control.get('confirmPassword').setErrors({ NoPasswordMatch: true });
  }
};
