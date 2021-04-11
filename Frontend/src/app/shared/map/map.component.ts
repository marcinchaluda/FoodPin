import {Component, Input, OnInit} from '@angular/core';
import {icon, Icon, IconOptions, latLng, marker, Marker, MarkerClusterGroup, tileLayer} from 'leaflet';
import {BehaviorSubject} from 'rxjs';
import {NavbarService} from '../navbar/navbar.service';

class MarkerClusterGroupOptions {
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Input()
  donations: Array<object>;
  isOpen$: BehaviorSubject<boolean>;
  options = {
    layers: [
      tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        // token generated using mapbox account
        accessToken: 'pk.eyJ1Ijoid29sY3ppIiwiYSI6ImNrbmN4bzJ0MDFidDAyeGxjZnI5ZjM2ZGwifQ.phqv-cOV9IPs_qsiO5O75A',
      })
    ],
    zoom: 14,
    center: latLng(50.061389, 19.937222)
  };

  markerClusterGroup: MarkerClusterGroup;
  markerClusterData: Marker[] = [];
  markerClusterOptions: MarkerClusterGroupOptions;

  constructor(
    private _navbarService: NavbarService,
  ) { }

  ngOnInit(): void {
    this.isOpen$ = this._navbarService.isOpen$;
    if (this.donations) {
      this.markerClusterData = this.generateMarker();
    }
  }

  public markerClusterReady(group: MarkerClusterGroup): void {
    this.markerClusterGroup = group;
  }

  private generateMarker(): Marker[] {
    const data: Marker[] = [];
    // tslint:disable-next-line:no-shadowed-variable
    const icon = this.createIcon();

    for (const donation of this.donations) {
      // @ts-ignore
      data.push(marker( [donation.address.latitude, donation.address.longitude], { icon }));
    }
    return data;
  }

  private createIcon(): Icon<IconOptions> {
    return icon({
      iconSize: [50, 38],
      iconAnchor: [0, 0],
      popupAnchor: [0, 0],
      iconUrl: '../../../assets/Logo/logo-50x38.png',
    });
  }
}
