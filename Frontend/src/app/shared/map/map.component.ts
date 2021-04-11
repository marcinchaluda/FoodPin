import {Component, OnInit} from '@angular/core';
import {circle, latLng, polygon, tileLayer} from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  options;
  layersControl;

  constructor(
  ) { }

  ngOnInit(): void {
    this.options = {
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

    this.layersControl = {
      baseLayers: {
        'Open Street Map': tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
          {
            maxZoom: 18,
            attribution: '...',
            accessToken: 'pk.eyJ1Ijoid29sY3ppIiwiYSI6ImNrbmN4bzJ0MDFidDAyeGxjZnI5ZjM2ZGwifQ.phqv-cOV9IPs_qsiO5O75A',
          }),
        'Open Cycle Map': tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
          {
            maxZoom: 28,
            attribution: '...',
            accessToken: 'pk.eyJ1Ijoid29sY3ppIiwiYSI6ImNrbmN4bzJ0MDFidDAyeGxjZnI5ZjM2ZGwifQ.phqv-cOV9IPs_qsiO5O75A',
          })
      },
      overlays: {
        'Big Circle': circle([ 50.061389, 19.937222 ], { radius: 50 }),
        'Big Square': polygon([[ 46.8, -121.55 ], [ 46.9, -121.55 ], [ 46.9, -121.7 ], [ 46.8, -121.7 ]])
      }
    };
  }

}
