import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnTranslateComponent } from './btn-translate.component';

describe('BtnTranslateComponent', () => {
  let component: BtnTranslateComponent;
  let fixture: ComponentFixture<BtnTranslateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnTranslateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnTranslateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
