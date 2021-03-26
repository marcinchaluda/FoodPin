import { Component, OnInit } from '@angular/core';
import {faPlus, faTimes} from '@fortawesome/free-solid-svg-icons';
import { Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-donate-food',
  templateUrl: './donate-food.component.html',
  styleUrls: ['./donate-food.component.scss']
})
export class DonateFoodComponent implements OnInit {
  private FIRST = 0;
  closeIcon = faTimes;
  plusIcon = faPlus;
  donatePictures: Array<string> = ['stew.jpg', 'tomatoes.jpg'];
  quantity: Array<string> = ['Item', 'Kilogram'];
  selectedUnit: string = this.quantity[this.FIRST];
  value = 0;
  options: Options = {
    floor: 0,
    ceil: 50,
  };

  constructor() { }

  ngOnInit(): void {
  }

  public onSubmit(): void {
    console.log('submitted!' + this.value);
  }
}
