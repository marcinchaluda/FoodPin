import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {patternValidator} from "../../validators/patternValidator.validator";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {AuthorizationService} from "../../services/authorization.service";
import {User} from "../../models/User";
import {faAt, faLock} from "@fortawesome/free-solid-svg-icons";
import {NavbarService} from "../../shared/navbar/navbar.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  emailIcon = faAt;
  passwordIcon = faLock;
  loginForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthorizationService,
    private _router: Router,
    private _toastr: ToastrService,
    private _navbar: NavbarService,
  ) { }

  public ngOnInit(): void {
    this.loginForm = this.generateLoginForm();
  }

  public get email(): AbstractControl {
    return this.loginForm.get('email');
  }

  public get password(): AbstractControl {
    return this.loginForm.get('password1');
  }

  private generateLoginForm(): FormGroup {
    return this._formBuilder.group({
      email: [null , Validators.compose([Validators.required, Validators.email])],
      password1: [null , Validators.compose([
        Validators.required,
        // consist a number in a password
        patternValidator(/\d/, {hasNumber: true}),
        // consist of uppercase letter in a password
        patternValidator(/[A-Z]/, {hasCapitalCase: true}),
        // consist of lowercase letter in a password
        patternValidator(/[a-z]/, {hasSmallCase: true}),
        Validators.minLength(6),
      ])],
    });
  }

  public onSubmit(): void {
    const user = this.createUser();

    this._authService.login$(user).subscribe(
      _ => {
        this._toastr.success("Successfully logged in");
        this._router.navigate(["home"]).then(console.log);
      },
    );
  }

  private createUser(): User {
    const user: User = ({
      email: this.loginForm.value['email'],
      password: this.loginForm.value['password1'],
    });
    return user;
  }

  public logoutUser(): void {
    this._navbar.redirectToHomePage();
  }

}
