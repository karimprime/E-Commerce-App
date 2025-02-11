import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsoulHomeComponent } from './carsoul-home.component';

describe('CarsoulHomeComponent', () => {
  let component: CarsoulHomeComponent;
  let fixture: ComponentFixture<CarsoulHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarsoulHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarsoulHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
