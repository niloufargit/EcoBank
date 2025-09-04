import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { TransactionDto } from "../../types";
import {CurrencyPipe, DatePipe, NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transactions-list',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe,
    CurrencyPipe,
    RouterLink
  ],
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.css'] // Correction de 'styleUrl' à 'styleUrls'
})
export class TransactionsListComponent implements OnInit {
  @Input() accountIdFromParent: string | undefined;
  transactions: TransactionDto[] = []; // Tableau pour stocker les transactions

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    const accountIdFromLocalStorage = localStorage.getItem('accountId');
    this.sendRequest();
  }

  sendRequest() {
    let url: string = `https://coding-bank.fly.dev/accounts/${localStorage.getItem('accountId')}/transactions`;
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('jwt')
    });
    let httpOptions = { headers: headers };

    this.httpClient.get<TransactionDto[]>(url, httpOptions).subscribe(
      (response) => {
        console.log("TABLEAU DE TRANSACTIONS :");
        console.log(response);

        this.transactions = response; // Remplit le tableau avec les transactions récupérées
      },
      (error) => {
        console.error(error);
      }
    );

  }

  protected readonly localStorage = localStorage;
}
