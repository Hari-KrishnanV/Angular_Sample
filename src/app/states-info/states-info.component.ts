import { Component, OnInit } from '@angular/core';
import { MapComponent } from "../map/map.component";
import { StatesInfoService } from './states-info.service';
import { CommonModule } from '@angular/common';
import { StatesInfoTableComponent } from './states-info-table/states-info-table.component';

@Component({
  selector: 'app-states-info',
  standalone: true,
  imports: [CommonModule, MapComponent, StatesInfoTableComponent],
  templateUrl: './states-info.component.html',
  styleUrl: './states-info.component.scss'
})
export class StatesInfoComponent implements OnInit {
  colorCodeBy: string = 'density';
  statesInfo: any;
  selectedStateInfo: any;

  constructor(private dataService: StatesInfoService) {
  }

  ngOnInit(): void {
    this.getStatesInfo();
  }

  private getStatesInfo() {
    this.dataService.getStatesInfo().subscribe({
      next: (statesInfo) => {
        this.statesInfo = statesInfo;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onStateHighlighted(stateInfo: any) {
    if (stateInfo)
      this.selectedStateInfo = stateInfo;
  }
}
