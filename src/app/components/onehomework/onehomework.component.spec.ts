import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnehomeworkComponent } from './onehomework.component';

describe('OnehomeworkComponent', () => {
  let component: OnehomeworkComponent;
  let fixture: ComponentFixture<OnehomeworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnehomeworkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnehomeworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
