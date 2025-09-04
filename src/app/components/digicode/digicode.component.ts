import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-digicode',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './digicode.component.html',
  styleUrl: './digicode.component.css'
})
export class DigicodeComponent {
  digicodes: number[] = [];
  @Output() buttonClick: EventEmitter<number> = new EventEmitter<number>();
  constructor() {
    while (this.digicodes.length < 12) {
      const randomNumber = Math.floor(Math.random() * 12);
      if (!this.digicodes.includes(randomNumber)) {
        this.digicodes.push(randomNumber);
      }
    }
  }

  onButtonClick(buttonValue: number): void {
    this.buttonClick.emit(buttonValue);
  }

}
