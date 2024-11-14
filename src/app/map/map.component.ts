import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';
import { usStatesInfo } from '../sample-data/us-states';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements AfterViewInit, OnChanges {
  @Input('data') data: any;
  @Input('heatMapKey') heatMapKey: string;
  @Output('featureHighlighted') featureHighlighted: EventEmitter<any> = new EventEmitter<any>();

  private map: L.Map;
  private mapData: any;
  geojson: any;
  legend: any;

  constructor() {
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['data'] && changes['data'].currentValue) {
      this.mapData = changes['data'].currentValue;
    }
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap() {
    this.map = L.map('map').setView([37.8, -96], 4);

    const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

    this.createGeoJSON();
    // this.legend = L.control({ position: 'bottomright' });
  }

  private createGeoJSON() {
    if (this.data) {
      this.geojson = L.geoJson(this.mapData, {
        style: this.getStyle.bind(this),
        onEachFeature: this.onEachFeature.bind(this)
      });

      if (this.map) {
        this.geojson.addTo(this.map);
      }
    }
  }

  private getColor(d: number) {
    return d > 1000 ? '#800026' :
      d > 500 ? '#BD0026' :
        d > 200 ? '#E31A1C' :
          d > 100 ? '#FC4E2A' :
            d > 50 ? '#FD8D3C' :
              d > 20 ? '#FEB24C' :
                d > 10 ? '#FED976' : '#FFEDA0';
  }

  private getStyle(feature: any) {
    const fillColor = this.getColor(feature.properties[this.heatMapKey]);
    return {
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7,
      fillColor
    };
  }

  private highlightFeature(e: any) {
    const layer = e.target;

    layer?.setStyle({
      weight: 5,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.7
    });

    layer?.bringToFront();

    // info.update(layer.feature.properties);
    this.featureHighlighted.emit(layer.feature.properties);
  }

  private resetHighlight(e: any) {
    this.geojson.resetStyle(e.target);
    // info.update();
    this.featureHighlighted.emit(null);
  }

  private zoomToFeature(e: any) {
    this.map.fitBounds(e.target.getBounds());
  }

  private onEachFeature(feature: any, layer: L.Layer) {
    layer.on({
      mouseover: this.highlightFeature.bind(this),
      mouseout: this.resetHighlight.bind(this),
      click: this.zoomToFeature.bind(this)
    });
  }
}
