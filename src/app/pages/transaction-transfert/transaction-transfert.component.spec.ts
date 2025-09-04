import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionTransfertComponent } from './transaction-transfert.component';

describe('TransactionTransfertComponent', () => {
  let component: TransactionTransfertComponent;
  let fixture: ComponentFixture<TransactionTransfertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionTransfertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransactionTransfertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
