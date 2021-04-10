import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {faPlus, faTimes} from '@fortawesome/free-solid-svg-icons';
import {Options} from '@angular-slider/ngx-slider';
import {NavbarService} from '../../shared/navbar/navbar.service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LocalStorageService} from '../../services/local-storage.service';
import {DonationsService} from '../../services/donations.service';
import {InitDataModel} from '../../models/InitDataModel';
import {ActivatedRoute} from '@angular/router';
import {Address} from '../../models/Address';
import {Unit} from '../../models/Unit';
import {BehaviorSubject} from 'rxjs';
import {DonateFoodModalService} from '../../shared/donate-food-modal/donate-food-modal.service';

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
  quantity: Array<Unit>;
  selectedUnit: Unit;
  initData: InitDataModel;
  value = 0;
  options: Options = {
    floor: 0,
    ceil: 50,
  };
  donateForm: FormGroup;
  addressForm: FormGroup;
  isOpen$: BehaviorSubject<boolean>;

  constructor(
    private _navbarService: NavbarService,
    private _formBuilder: FormBuilder,
    private _localStorageService: LocalStorageService,
    private _donationService: DonationsService,
    private _actRoute: ActivatedRoute,
    private _modalService: DonateFoodModalService,
  ) { }

  ngOnInit(): void {
    this.isOpen$ = this._modalService.isOpen$;
    this._actRoute.data.subscribe(data => {
      this.initData = data.initDataResolver;
    });
    this.quantity = this.initData.units;
    this.selectedUnit = this.quantity[this.FIRST];
    this.addressForm = this.generateAddress(this.initData.address);
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
      unit: this.selectedUnit.id,
      address: this.addressForm,
    });
  }

  private generateAddress(address: Address): FormGroup {
    return this._formBuilder.group({
      street: [address.street , Validators.compose([Validators.required])],
      local_number: [address.local_number, Validators.compose([Validators.required])],
      postal_code: [address.postal_code , Validators.compose([Validators.required])],
      city: [address.city , Validators.compose([Validators.required])],
      country: [address.country , Validators.compose([Validators.required])],
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
    this._modalService.showModal();
    this.donateForm.get('quantity').setValue(this.value);
    this.donateForm.get('unit').setValue(this.selectedUnit.id);
    this._donationService.postDonation(this.donateForm.value);
    this.resetDonateForm();
    this.isChecked = false;
  }

  private resetDonateForm(): void {
    this.value = 0;
    this.selectedUnit = this.quantity[this.FIRST];
    this.donateForm.get('title').setValue('');
    this.donateForm.get('preferred_time').setValue('');
    this.donateForm.get('pickup_date').setValue('');
    this.donateForm.get('description').setValue('');
    this.resetFormValidators();
  }

  private resetFormValidators(): void {
    for (const error in this.donateForm.controls) {
      if (error) {
        this.donateForm.controls[error].markAsUntouched();
      }
    }
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
