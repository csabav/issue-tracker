import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedIssuesComponent } from './closed-issues.component';

describe('ClosedIssuesComponent', () => {
  let component: ClosedIssuesComponent;
  let fixture: ComponentFixture<ClosedIssuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClosedIssuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosedIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
