import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetHoemworkComponent } from './get-hoemwork.component';

describe('GetHoemworkComponent', () => {
  let component: GetHoemworkComponent;
  let fixture: ComponentFixture<GetHoemworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetHoemworkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetHoemworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
