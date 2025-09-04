import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

//si l'utilisateur n'est pas authentifié, il ne peut pas accéder aux autres routes
export const authGuard :CanActivateFn = () =>{
    const router = inject(Router)
    return inject(AuthService).isAuthenticated() ? true : router.navigateByUrl("/login")
}
