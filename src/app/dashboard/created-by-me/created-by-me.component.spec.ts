import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedByMeComponent } from './created-by-me.component';

describe('CreatedByMeComponent', () => {
  let component: CreatedByMeComponent;
  let fixture: ComponentFixture<CreatedByMeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatedByMeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedByMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
