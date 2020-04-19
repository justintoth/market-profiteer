import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockPositionsComponent } from './stock-positions.component';

describe('StockPositionsComponent', () => {
  let component: StockPositionsComponent;
  let fixture: ComponentFixture<StockPositionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockPositionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockPositionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
