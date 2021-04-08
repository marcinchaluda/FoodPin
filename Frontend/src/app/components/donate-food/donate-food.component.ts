import {Component, OnInit} from '@angular/core';
import {faPlus, faTimes} from '@fortawesome/free-solid-svg-icons';
import {Options} from '@angular-slider/ngx-slider';
import {NavbarService} from '../../shared/navbar/navbar.service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LocalStorageService} from '../../services/local-storage.service';
import {DonationsService} from '../../services/donations.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-donate-food',
  templateUrl: './donate-food.component.html',
  styleUrls: ['./donate-food.component.scss']
})
export class DonateFoodComponent implements OnInit {
  private FIRST = 0;
  closeIcon = faTimes;
  plusIcon = faPlus;
  isChecked = false;
  donatePictures: Array<string> = ['stew.jpg', 'tomatoes.jpg'];
  quantity: Array<string> = ['Item', 'Kilogram'];
  selectedUnit: string = this.quantity[this.FIRST];
  initData: Observable<object>;
  value = 0;
  options: Options = {
    floor: 0,
    ceil: 50,
  };
  donateForm: FormGroup;
  addressForm: FormGroup;

  constructor(
    private _navbarService: NavbarService,
    private _formBuilder: FormBuilder,
    private _localStorageService: LocalStorageService,
    private _donationService: DonationsService,
  ) { }

  ngOnInit(): void {
    this._donationService.getInitData(Number(this._localStorageService.getItem('userId'))).subscribe(r => {
      console.log(r);
      this.initData = r;
    });
    this.addressForm = this.generateAddress();
    this.donateForm = this.generateDonationForm();
  }

  private generateDonationForm(): FormGroup {
    return this._formBuilder.group({
      user: Number(this._localStorageService.getItem('userId')),
      title: ['' , Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],
      photo_url: ['photoURL'],
      preferred_time: ['' , Validators.compose([Validators.required])],
      distance: ['1.09', Validators.compose([Validators.required])],
      create_date: this.generateCurrentDate(),
      pickup_date: ['', Validators.compose([Validators.required])],
      quantity: [this.value, Validators.compose([Validators.required])],
      unit: 1,
      address: this.addressForm,
    });
  }

  private generateAddress(): FormGroup {
    return this._formBuilder.group({
      street: ['' , Validators.compose([Validators.required])],
      local_number: ['' , Validators.compose([Validators.required])],
      postal_code: ['' , Validators.compose([Validators.required])],
      city: ['' , Validators.compose([Validators.required])],
      country: ['' , Validators.compose([Validators.required])],
    });
  }

  private generateCurrentDate(): string  {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();

    return `${year}-${month}-${day}`;
  }

  public onSubmit(): void {
    this._donationService.postDonation(this.donateForm.value);
  }

  public homePageRedirect(): void {
    this._navbarService.redirectToHomePage();
  }

  public get street(): AbstractControl {
    return this.donateForm.get('address').get('street');
  }

  public get localnumber(): AbstractControl {
    return this.donateForm.get('address').get('local_number');
  }

  public get postalcode(): AbstractControl {
    return this.donateForm.get('address').get('postal_code');
  }

  public get city(): AbstractControl {
    return this.donateForm.get('address').get('city');
  }

  public get country(): AbstractControl {
    return this.donateForm.get('address').get('country');
  }

  public get title(): AbstractControl {
    return this.donateForm.get('title');
  }

  public get preferredtime(): AbstractControl {
    return this.donateForm.get('preferred_time');
  }

  public get pickupdate(): AbstractControl {
    return this.donateForm.get('pickup_date');
  }

  public get description(): AbstractControl {
    return this.donateForm.get('description');
  }
}
