import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-image.component.html',
  styleUrls: ['./profile-image.component.css']
})
export class ProfileImageComponent {
  @Input() href: string;
  @Input() initial: string;

  constructor() {
    this.href = '';
    this.initial = '';
  }

  goToHref() {
    // go to href
  }
}
