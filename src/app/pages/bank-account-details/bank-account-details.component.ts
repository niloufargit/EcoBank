import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {ProfileImageComponent} from "../../components/profile-image/profile-image.component";
import {API_URL} from "../../constants";
import {Account} from "../../../interfaces/account.interface";
import {DatePipe} from "@angular/common";

const jwtToken = localStorage.getItem('jwt');

@Component({
  selector: 'app-bank-account-details',
  standalone: true,
  imports: [
    RouterLink,
    ProfileImageComponent,
    DatePipe
  ],
  templateUrl: './bank-account-details.component.html',
  styleUrl: './bank-account-details.component.css'
})

export class BankAccountDetailsComponent implements OnInit{
  constructor(private route: ActivatedRoute) {
  }
  account: Account | undefined;
  currentRoute: string = '';

  async ngOnInit() {
    this.currentRoute = this.getCurrentRoute();
    console.log('Route snapshot:', this.currentRoute);

    const requestOptions: RequestInit = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`
      },
    };

    try {
      const response = await fetch(`${API_URL}/${this.currentRoute}`, requestOptions);
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

  getCurrentRoute(): string {
    const urlSegments = this.route.snapshot.url;
    return urlSegments.map(segment => segment.path).join('/');
  }

  copyToClipboard(text: string | undefined): void {
    if (text) {
      navigator.clipboard.writeText(text).then(() => {
        console.log('Texte copié avec succès');
      }).catch(err => {
        console.error('Erreur lors de la copie du texte', err);
      });
    }
  }


}
