import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifiListComponent } from './notifi-list.component';

describe('NotifiListComponent', () => {
  let component: NotifiListComponent;
  let fixture: ComponentFixture<NotifiListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotifiListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
