import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterOutlet} from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { DropdownComponent } from '../../components/dropdown/dropdown.component';
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import {API_URL} from "../../constants";
import {Account} from "../../../interfaces/account.interface";
import {AccountService} from "../../services/account/account.service";

const jwtToken = localStorage.getItem('jwt');

import {TransactionsListComponent} from "../../components/transactions-list/transactions-list.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, DropdownComponent, HttpClientModule, RouterLink, TransactionsListComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] // Corrected 'styleUrl' to 'styleUrls'
})
export class HomeComponent implements OnInit {
  constructor(private readonly httpClient:HttpClient, private accountService: AccountService){
  }
  protected readonly localStorage = localStorage;
  account: Account | undefined;
  clientCode: string="";
  async getAccountsDetails(){
    const requestOptions: RequestInit = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`
      },
    };
    try {
      const response = await fetch(`${API_URL}/accounts/${localStorage.getItem('accountId')}`, requestOptions);
      const data = await response.json();
      if(data)  {
        this.account = data
        return data;
      }

    } catch (error) {
      // @ts-ignore
      console.error('Erreur lors de la requête:', error.message);
    }
  }
  ngOnInit() {
    const accountIdFromLocalStorage = localStorage.getItem('accountId');

    if (accountIdFromLocalStorage) {
      this.getAccountsDetails();
    }
    // Subscribe to changes in the selected account
    this.accountService.selectedAccount$.subscribe((selectedAccount) => {
      if (selectedAccount) {
        this.updateBalance(selectedAccount);
      }
    });
  }
  updateBalance(account: Account) {
    this.account = account;
  }
}
