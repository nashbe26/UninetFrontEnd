import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReponseHomeworkComponent } from './reponse-homework.component';

describe('ReponseHomeworkComponent', () => {
  let component: ReponseHomeworkComponent;
  let fixture: ComponentFixture<ReponseHomeworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReponseHomeworkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReponseHomeworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
