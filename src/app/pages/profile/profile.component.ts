import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { Location } from '@angular/common';
import { ProfileImageComponent } from '../../components/profile-image/profile-image.component';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HeaderComponent, RouterModule, ProfileImageComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  initials = ''
  href = '#';

  constructor(private location: Location, private authService: AuthService, private router: Router,private http: HttpClient) {
      // Je récupére la chaîne depuis le localStorage
      const fullName: string = localStorage.getItem('name') || '';

      const words = fullName.split(' ');

      // Prendre la première lettre de chaque mot
      const firstLetters = words.map((word: string) => word.charAt(0));

      // Concaténer les premières lettres avec un espace entre elles
      this.initials = firstLetters.join(' ') ?? '';


    }




    goBack(): void {
      this.location.back();
    }

    copyToClipboard(value: string): void {
        const textArea = document.createElement('textarea');
        textArea.value = value;

        // Make the textarea invisible
        textArea.style.position = 'fixed';
        textArea.style.top = '0';
        textArea.style.left = '0';
        textArea.style.opacity = '0';

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
          document.execCommand('copy');
          console.log('Copied to clipboard:', value);
        } catch (err) {
          console.error('Unable to copy to clipboard', err);
        } finally {
          // Remove the textarea from the DOM
          document.body.removeChild(textArea);
        }
      }

    balance: string = "250,00 €";
    id : string = "";
    name : string = "";

    ngOnInit(): void {
        this.id = this.authService.getClientCode();
        this.name = this.authService.getClientName();
    }


    logout(){
      localStorage.clear() ;
      this.router.navigateByUrl('/login') ;
    }


}

