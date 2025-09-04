import { Injectable } from '@angular/core';
import {TransfertDataModel} from "./transfertDataModel";
import {catchError, Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TransactionTransfertService {
  httpOptions= {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0MzE2Njg4MyJ9.tgibJU5JHw9dy4Izt2y3mcCTDJnRM0vjdWgYCMqm4nI'
    })
  };
  constructor(private http: HttpClient) { }
  /** POST: add a new hero to the database */
  sendTransfertData(data:TransfertDataModel): Observable<TransfertDataModel> {
    //TODO:Rework URLS ?
    return this.http.post<TransfertDataModel>('https://coding-bank.fly.dev/transactions/emit', data, this.httpOptions)
      .pipe(
        catchError(err => new Observable<any>())
      );
  }
}
