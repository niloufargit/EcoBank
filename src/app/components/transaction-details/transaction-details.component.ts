import {Component, OnInit} from '@angular/core';
import {DropdownComponent} from "../dropdown/dropdown.component";
import {HeaderComponent} from "../header/header.component";
import {ActivatedRoute, Router, RouterLink, RouterOutlet} from "@angular/router";
import {ProfileImageComponent} from "../profile-image/profile-image.component";
import {TransactionDto} from "../../types";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {DatePipe, NgIf} from "@angular/common";
import {API_URL} from "../../constants";

@Component({
  selector: 'app-transaction-details',
  standalone: true,
  imports: [
    DropdownComponent,
    HeaderComponent,
    RouterOutlet,
    ProfileImageComponent,
    RouterLink,
    NgIf,
    DatePipe
  ],
  templateUrl: './transaction-details.component.html',
  styleUrl: './transaction-details.component.css'
})
export class TransactionDetailsComponent implements OnInit {

  initials = '';
  paramStr:string='';
  transactionId:string|null=null;
  protected transaction: TransactionDto|undefined;

  constructor(
    private activatedRoute:ActivatedRoute,
    private httpClient:HttpClient,
    private router:Router
  ){
    // Je récupére la chaîne depuis le localStorage
    const fullName: string = localStorage.getItem('name') || '';

    const words = fullName.split(' ');

    // Prendre la première lettre de chaque mot
    const firstLetters = words.map((word: string) => word.charAt(0));

    // Concaténer les premières lettres avec un espace entre elles
    this.initials = firstLetters.join(' ') ?? '';
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .subscribe(params => {
        console.log("PARAMS");
        console.log(params); // { orderby: "price" }
        //this.paramStr = params.;
        this.transactionId = params.get("id");
        console.log(this.transactionId);
      }
    );
    this.getTransaction();
  }
  href = '#';

  getTransaction(){
    let url:string =`${API_URL}/transactions/${this.transactionId}`;
    let headers:HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+localStorage.getItem('jwt')
    });
    let httpOptions = { headers: headers };
    this.httpClient.get<TransactionDto>(url, httpOptions).subscribe((response) => {
      console.log("GET TRANSACTION RESPONSE : ")
        console.log(response);
      this.transaction = response;
      //TODO NGIF STATUS PENDING SHOW CANCEL
      if(this.transaction.status==='pending'){
        //this.router.navigateByUrl()
      }
        //this.router.navigateByUrl(`/accounts/${response.emitter.id}/transactions/${response.id}`);
        //this.dropDownItems = response.map(item => item.label);

        //this.setAccountId();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  cancelTransaction(){
    let url:string=`${API_URL}/transactions/${this.transaction!.id}/cancel`;
    let body:any = {
    };
    console.log(body);
    let headers:HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+localStorage.getItem('jwt')
    });
    let httpOptions = { headers: headers };
    this.httpClient.post(url, body, httpOptions).subscribe(response => console.log(response))
  }
}
