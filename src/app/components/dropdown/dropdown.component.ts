import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { API_URL } from "../../constants";
import {Account} from "../../../interfaces/account.interface";
import {AccountService} from "../../services/account/account.service";

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})

export class DropdownComponent implements OnInit {
  isDropdownOpen: boolean = false;
  dropDownItems: Account[] = [];
  selectedAccountLabel: string = '';
  selectedAccountId: string = '';

  constructor(private readonly httpClient: HttpClient, private elementRef: ElementRef, private accountService: AccountService) {
  }

  async ngOnInit() {
    await this.getAccounts();
    if (this.dropDownItems && this.dropDownItems.length > 0) {
      const defaultAccount = this.dropDownItems[0];

      this.selectedAccountLabel = defaultAccount.label;
      this.selectedAccountId = defaultAccount.id;
      localStorage.setItem('accountId', this.selectedAccountId);
      this.accountService.setSelectedAccount(defaultAccount);
    }
  }


  async getAccounts(): Promise<void> {

    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('jwt')
    });
    let httpOptions = { headers: headers };

    try {
      const response = await this.httpClient.get<Account[]>(`${API_URL}/accounts`, httpOptions).toPromise();
      this.dropDownItems = response || [];
    } catch (error) {
      console.error(error);
      this.dropDownItems = [];
    }
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event): void {
    // Vérifie si l'élément cliqué est en dehors du dropdown
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false;
    }
  }

  onSubmit(item:Account){
    this.selectedAccountLabel = item.label;
    this.selectedAccountId = item.id;
    localStorage.setItem('accountId', this.selectedAccountId);
    this.accountService.setSelectedAccount(item);


    console.log(item)
  }

}
