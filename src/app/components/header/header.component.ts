import { Component } from '@angular/core';
import { ProfileImageComponent } from '../profile-image/profile-image.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,ProfileImageComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  initials = ''

  constructor() {
    // Je récupére la chaîne depuis le localStorage
    const fullName: string = localStorage.getItem('name') || '';

    const words = fullName.split(' ');

    // Prendre la première lettre de chaque mot
    const firstLetters = words.map((word: string) => word.charAt(0));

    // Concaténer les premières lettres avec un espace entre elles
    this.initials = firstLetters.join(' ') ?? '';
  }
  href = '#';
}
