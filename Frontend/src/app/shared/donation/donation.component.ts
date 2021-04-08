import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.scss']
})
export class DonationComponent implements OnInit {
  @Input()
  donation: object;

  constructor() { }

  ngOnInit(): void {
  }

}
