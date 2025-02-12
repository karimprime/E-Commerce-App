import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarCartComponent } from './sidebar-cart.component';

describe('SidebarCartComponent', () => {
  let component: SidebarCartComponent;
  let fixture: ComponentFixture<SidebarCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarCartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
