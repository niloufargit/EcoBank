import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import {DigicodeComponent} from "../../components/digicode/digicode.component";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, DigicodeComponent, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  form:FormGroup;
  constructor(private lp:FormBuilder, private authService: AuthService, private router: Router){
    this.form = this.lp.group({
    clientCode:['', Validators.required],
    password: ['', Validators.required]
  })
}

   //constructor(private authService: AuthService){}

  //   form = new FormGroup({
  //    clientCode: new FormControl('', [Validators.required]),
  //    password: new FormControl('', [Validators.required]),
  //  })

  ngOnInit(): void {
    this.form.valueChanges.subscribe(changes=> {
      this.passwordValue = changes['password']
      console.log(changes)
    })
  }

  passwordValue: string = "";

  handleClear(){
    this.passwordValue = '';
    this.form.get('password')?.setValue('');
  }

  onDigicodeClicked(value: number):void {
    this.passwordValue += value.toString()
    if(this.passwordValue.length <= 6){
      this.form.get('password')?.setValue(this.passwordValue);
    }
  }

   login(){
    this.authService.onLogin(this.form.value).subscribe({
      next: (value) => {
        localStorage.setItem('jwt', value.jwt);
        this.authService.setClientCode(value.user.clientCode);
        this.authService.setClientName(value.user.name);
        this.authService.setAuthenticated(true);
        this.router.navigateByUrl("/");
      },
      error: () => {
        alert("invalid information !!!");
      }
    })
  }
}
