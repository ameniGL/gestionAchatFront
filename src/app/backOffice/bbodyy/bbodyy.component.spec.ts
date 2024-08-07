import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BBODYYComponent } from './bbodyy.component';

describe('BBODYYComponent', () => {
  let component: BBODYYComponent;
  let fixture: ComponentFixture<BBODYYComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BBODYYComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BBODYYComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
