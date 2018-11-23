import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrdouctFormComponent } from './prdouct-form.component';

describe('PrdouctFormComponent', () => {
  let component: PrdouctFormComponent;
  let fixture: ComponentFixture<PrdouctFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrdouctFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrdouctFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
