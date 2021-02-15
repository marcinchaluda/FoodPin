import {AbstractControl} from "@angular/forms";

// @ts-ignore
export const passwordMatchValidator = (control: AbstractControl): { [key: string]: any } => {
  const password: string = control.get('password1').value;
  const confirmPassword: string = control.get('password2').value;

  if (password !== confirmPassword) {
    control.get('password2').setErrors({ NoPasswordMatch: true });
  }
};
