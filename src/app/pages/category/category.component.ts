import { Component } from '@angular/core';
import { NavbarComponent } from '@app/shared/components/navbar/navbar.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent {}
