import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {API_URL} from '../../constants';
import {Account} from "../../../interfaces/account.interface";
import {routes} from "../../routes/app.routes";

@Component({
  selector: 'app-create-bank-account',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './create-bank-account.component.html',
  styleUrl: './create-bank-account.component.css'
})
export class CreateBankAccountComponent {

  newBankAccount: Account | undefined;

  constructor(private readonly router : Router) {
  }


  form = new FormGroup({
    label: new FormControl('', Validators.required),
    initialBalance: new FormControl('', Validators.required),
  })

  async createBankAccount(){
    const jwtToken = localStorage.getItem('jwt');

    if (!jwtToken) {
      console.error('Le JWT n\'est pas présent dans le localStorage.');
      return;
    }

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`
      },
      body: JSON.stringify(this.form.value)
    };

    try {
      console.log('Données du formulaire à envoyer:', this.form.value);
      const response = await fetch(`${API_URL}/accounts`, requestOptions);
      const data = await response.json();
      if(data)  {
        this.newBankAccount = data
        return data;
      }

    } catch (error) {
      // @ts-ignore
      console.error('Erreur lors de la requête:', error.message);
    }
  }

  async onSubmit() {
    await this.createBankAccount()

    if(this.newBankAccount){
     await this.router.navigateByUrl(`/accounts/${this.newBankAccount.id}`);
    }

  }
}
