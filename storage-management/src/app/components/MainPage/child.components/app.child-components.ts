import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'child-suka',
  standalone: true,
  imports: [RouterOutlet , FormsModule],
  templateUrl: './app.child-components.html',
  styleUrl: './app.child-components.css'
})
export class ChildComponent {
 name = '';

}