import { Component, OnInit } from '@angular/core';
import {faAppleAlt, faCarrot, faDrumstickBite, faIceCream, faPepperHot} from "@fortawesome/free-solid-svg-icons";
import {BehaviorSubject} from "rxjs";
import {LoaderService} from "../../../services/loader.service";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  carrotIcon = faCarrot;
  drumstickIcon = faDrumstickBite;
  iceCreamIcon = faIceCream;
  pepperIcon = faPepperHot;
  appleIcon = faAppleAlt;
  isLoading: BehaviorSubject<boolean> = this._loaderService.isLoading;

  constructor(private _loaderService: LoaderService) { }

  ngOnInit(): void {
  }

}
