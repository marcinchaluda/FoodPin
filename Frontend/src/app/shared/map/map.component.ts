import {Component, OnInit} from '@angular/core';
import {latLng, marker, icon, Marker, MarkerClusterGroup, tileLayer, Icon, IconOptions} from 'leaflet';

class MarkerClusterGroupOptions {
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
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
  coords = [
    [50.061389, 19.937222],
    [50.044467, 19.950578],
    [50.049538, 20],
    [50.051136, 19.946973],
    [50.045735, 19.958131],
  ];

  constructor(
  ) { }

  markerClusterGroup: MarkerClusterGroup;
  markerClusterData: Marker[] = [];
  markerClusterOptions: MarkerClusterGroupOptions;

  ngOnInit(): void {
    this.markerClusterData = this.generateMarker(this.coords);
  }

  private markerClusterReady(group: MarkerClusterGroup): void {
    this.markerClusterGroup = group;
  }

  private generateMarker(coords: number[][]): Marker[] {
    const data: Marker[] = [];
    // tslint:disable-next-line:no-shadowed-variable
    const icon = this.createIcon();
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < coords.length; i++) {
      data.push(marker( [coords[i][0], coords[i][1]], { icon }));
    }
    return data;
  }

  private createIcon(): Icon<IconOptions> {
    return icon({
      iconSize: [50, 38],
      iconAnchor: [0, 0],
      popupAnchor: [0, 0],
      // specify the path here
      iconUrl: '../../../assets/Logo/logo-50x38.png',
    });
  }
}
