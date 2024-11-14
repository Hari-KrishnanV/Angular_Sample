import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatesInfoTableComponent } from './states-info-table.component';

describe('StatesInfoTableComponent', () => {
  let component: StatesInfoTableComponent;
  let fixture: ComponentFixture<StatesInfoTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatesInfoTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatesInfoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
