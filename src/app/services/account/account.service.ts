// account.service.ts

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {Account} from "../../../interfaces/account.interface";

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private selectedAccountSource = new Subject<Account | null>();
  selectedAccount$ = this.selectedAccountSource.asObservable();

  setSelectedAccount(account: Account | null) {
    this.selectedAccountSource.next(account);
  }
}
