import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-timeup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timeup.component.html',
  styleUrl: './timeup.component.scss',
})
export class TimeupComponent {
  @Input('show') show: boolean = false;
  @Input('answers') answers: any;
}
