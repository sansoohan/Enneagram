import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDownloadComponent } from './download.component';

describe('AppDownloadComponent', () => {
  let component: AppDownloadComponent;
  let fixture: ComponentFixture<AppDownloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppDownloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
