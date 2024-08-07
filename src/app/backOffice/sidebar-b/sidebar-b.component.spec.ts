import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarBComponent } from './sidebar-b.component';

describe('SidebarBComponent', () => {
  let component: SidebarBComponent;
  let fixture: ComponentFixture<SidebarBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarBComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
