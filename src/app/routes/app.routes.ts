import { Routes } from '@angular/router';
import {  TestComponent } from "../pages/test/test.component";
import { LoginComponent } from '../pages/login/login.component';
import { RegisterComponent } from '../pages/register/register.component';
import { TransactionTransfertComponent } from "../pages/transaction-transfert/transaction-transfert.component";
import {CreateBankAccountComponent} from "../pages/create-bank-account/create-bank-account.component";
import { HomeComponent } from '../pages/home/home.component';
import { ProfileComponent } from '../pages/profile/profile.component';
import { authGuard } from '../guard/auth.guard';
import {BankAccountDetailsComponent} from "../pages/bank-account-details/bank-account-details.component";
import {TransactionDetailsComponent} from "../components/transaction-details/transaction-details.component";


export const routes: Routes = [
  { path: 'test', component:TestComponent },
  { path: 'login', component:LoginComponent },
  { path: 'register', component:RegisterComponent },
  { path: '', component: HomeComponent, canActivate:[authGuard]},
  { path: 'profile', component: ProfileComponent, canActivate:[authGuard] }, // Add the profile route
  { path: 'open', component:CreateBankAccountComponent, canActivate:[authGuard]},
  { path: 'send/:id', component:TransactionTransfertComponent },
  { path: 'accounts/:id', component:BankAccountDetailsComponent, canActivate:[authGuard]},
  { path: 'accounts/:emitter.id/transactions/:id', component:TransactionDetailsComponent },
  { path: 'transactions/:transactionId/cancel', component:TransactionDetailsComponent }

];
