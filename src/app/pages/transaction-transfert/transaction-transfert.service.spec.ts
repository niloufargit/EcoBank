import { TestBed } from '@angular/core/testing';

import { TransactionTransfertService } from './transaction-transfert.service';

describe('TransactionTransfertService', () => {
  let service: TransactionTransfertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionTransfertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
