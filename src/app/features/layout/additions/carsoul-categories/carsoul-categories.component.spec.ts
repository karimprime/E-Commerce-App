import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsoulCategoriesComponent } from './carsoul-categories.component';

describe('CarsoulCategoriesComponent', () => {
  let component: CarsoulCategoriesComponent;
  let fixture: ComponentFixture<CarsoulCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarsoulCategoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarsoulCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
