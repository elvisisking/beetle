import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConnectionFormComponent } from './add-connection-form.component';

describe('AddConnectionFormComponent', () => {
  let component: AddConnectionFormComponent;
  let fixture: ComponentFixture<AddConnectionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddConnectionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddConnectionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
