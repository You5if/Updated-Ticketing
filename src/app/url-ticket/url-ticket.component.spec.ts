import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlTicketComponent } from './url-ticket.component';

describe('UrlTicketComponent', () => {
  let component: UrlTicketComponent;
  let fixture: ComponentFixture<UrlTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UrlTicketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
