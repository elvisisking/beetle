import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionsCardsComponent } from './connections-cards.component';

describe('ConnectionsCardsComponent', () => {
  let component: ConnectionsCardsComponent;
  let fixture: ComponentFixture<ConnectionsCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectionsCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionsCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
