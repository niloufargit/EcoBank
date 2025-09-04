import { Component } from '@angular/core';
import {DigicodeComponent} from "../../components/digicode/digicode.component";

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [
    DigicodeComponent
  ],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {

}
