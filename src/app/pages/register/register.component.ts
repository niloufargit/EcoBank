import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import {DigicodeComponent} from "../../components/digicode/digicode.component";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {FormGroup, Validators} from "@angular/forms";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, DigicodeComponent, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  form:FormGroup;
  constructor(private lp:FormBuilder, private authService:AuthService, private router: Router){
    this.form = this.lp.group({
    name:['', Validators.required],
    password: ['', Validators.required]
  })
}


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

  register(){
    this.authService.onRegister(this.form.value).subscribe({
      next: (value) => {
        localStorage.setItem('jwt',value.jwt)
        this.authService.setClientCode(value.user.clientCode)//client code est stocker dans le auth service
        this.authService.setClientName(value.user.name)
        this.authService.setAuthenticated(true)
        this.router.navigateByUrl("/")
      },
      error: () =>{
        alert("invalid information !!!")
      }
    })
  }
}
