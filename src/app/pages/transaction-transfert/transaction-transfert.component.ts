import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders, HttpParamsOptions } from "@angular/common/http";
import { Observable } from "rxjs";
import { TransactionTransfertService } from "./transaction-transfert.service";
import { TransfertDataModel } from "./transfertDataModel";
import { AuthService } from "../../services/auth.service";
import { HeaderComponent } from '../../components/header/header.component';
import {API_URL} from "../../constants";
import {TransactionDto} from "../../types";
import {Router} from "@angular/router";

// Sending money component
@Component({
  selector: 'app-transaction-transfert',
  standalone: true,
  imports: [ ReactiveFormsModule, HttpClientModule, HeaderComponent],
  templateUrl: './transaction-transfert.component.html',
  styleUrl: './transaction-transfert.component.css',
  providers: [ TransactionTransfertService ]
})

export class TransactionTransfertComponent {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly authService: AuthService,
    private router: Router,
    //private transactionTransfertService:TransactionTransfertService
  ) {}

  sendingForm = new FormGroup({
    receiverAccountId: new FormControl<string|null>(''),//TODO: Validate ?
    amount:  new FormControl<number|null>(null),//TODO: Validate ?
    description: new FormControl<string|null>('')//TODO: Validate ?
  })

  onSubmit() {
    let transfertData:TransfertDataModel = this.sendingForm.value;
    console.log(transfertData);
    this.sendRequest(transfertData);
  }

  sendRequest(transfertData:TransfertDataModel) {
    let url:string ='https://coding-bank.fly.dev/transactions/emit';
    //let receiverAccountId = transfertData.receiverAccountId;

    let body:any = {
      //TODO "emitterAccountId": "82694d3b-52b3-4527-a1c2-96135777db48",
      emitterAccountId: localStorage.getItem('accountId'),
      receiverAccountId: transfertData.receiverAccountId,
      amount: transfertData.amount,
      description: transfertData.description
    };
    console.log(body);
    let headers:HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+localStorage.getItem('jwt')
    });
    let httpOptions = { headers: headers };
    //this.httpClient.post(url, body, httpOptions).subscribe((response)=> console.log(response));
    this.httpClient.post<TransactionDto>(url, body, httpOptions).subscribe((response) => {
        console.log(response);
        this.router.navigateByUrl(`/accounts/${response.emitter.id}/transactions/${response.id}`);
        //this.dropDownItems = response.map(item => item.label);

        //this.setAccountId();
      },
      (error) => {
        console.error(error);
      }
    );

  }
}
