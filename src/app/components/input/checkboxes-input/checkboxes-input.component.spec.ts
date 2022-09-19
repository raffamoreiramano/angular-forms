import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxesInputComponent } from './checkboxes-input.component';

describe('CheckboxesInputComponent', () => {
  let component: CheckboxesInputComponent;
  let fixture: ComponentFixture<CheckboxesInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckboxesInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckboxesInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
