import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, tap} from 'rxjs';
import { LoginRequestDto, LoginResponseDto, RegisterRequestDto, RegisterResponseDto } from '../types';
import { API_URL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  constructor(private http: HttpClient) { }

  isAuthenticated(){
    const auth = localStorage.getItem('auth')
    return auth === "1";
  }

  setAuthenticated(auth: boolean){
    if(auth){
      localStorage.setItem('auth','1')
    }else{
      localStorage.setItem('auth','0')
    }
  }

  onLogin(data:LoginRequestDto):Observable<LoginResponseDto>{
   return this.http.post<LoginResponseDto>( `${API_URL}/auth/login`, data)
  }

  onRegister(data: RegisterRequestDto):Observable<RegisterResponseDto>{
    return this.http.post<RegisterResponseDto>( `${API_URL}/auth/register`, data)
  }


  setClientCode(code: string){
    localStorage.setItem('clientCode', code)
  }

  getClientCode(): string{
    return localStorage.getItem('clientCode') as string;
  }


  setClientName(name: string) {
    localStorage.setItem('name', name);
    console.log('Client name set:', name);
  }

  getClientName(): string {
    const clientName = localStorage.getItem('name') as string;
    console.log('Retrieved client name:', clientName);
    return clientName;
  }

   getCurrentUser(): Observable<{ clientCode: string, name: string }> {
      console.log('Client ::', name);
      return this.http.get<{ clientCode: string, name: string }>(`https://coding-bank.fly.dev/auth/current-user`);

   }

  // ngOnInit(): void {
  //   this.http.get('https://coding-bank.fly.dev/auth/current-user', {
  //     headers: {
  //       Authorization: `Bearer ${this.jwt}`,
  //     },

  //   }).subscribe(console.log);
  //}

}
