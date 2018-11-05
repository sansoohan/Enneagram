import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppFeaturesComponent } from './features.component';

describe('AppFeaturesComponent', () => {
  let component: AppFeaturesComponent;
  let fixture: ComponentFixture<AppFeaturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppFeaturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
