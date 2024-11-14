import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { StatesInfoModel } from './states-info.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-states-info-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './states-info-table.component.html',
  styleUrl: './states-info-table.component.scss'
})
export class StatesInfoTableComponent implements OnChanges {
  @Input({alias: 'data'}) data: StatesInfoModel;
  tableData: { item: string, value: string | number, id: number }[] = [];
  id: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['data'] && changes['data'].currentValue) {
      this.formatData(changes['data'].currentValue);
    }
  }

  formatData(data: StatesInfoModel) {
    this.tableData = [];
    let clone: any = structuredClone(data);
    if (Array.isArray(clone.borders)) {
      clone.borders = clone.borders.join(",");
    }
    
    for (let entry in clone) {
      this.tableData.push({
        item: entry,
        value: clone[entry],
        id: ++this.id
      });
    }
  }
}
