import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '@services/storage.service';
import { NavbarComponent } from '@shared/components/navbar/navbar.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent {
  constructor(private storageService: StorageService, private router: Router) {}

  categories: any[] = [
    {
      questionCategoryId: 'dd543a8a-298b-4390-9bd4-d852490e1a56',
      title: 'ตอบคำถามการบวกลบเลขเบื้องต้น 101',
    },
    {
      questionCategoryId: 'dd543a8a-298b-4390-9bd4-d852490e1a56',
      title: 'ตอบคำถามการบวกลบเลขเบื้องต้น 102',
    },
    {
      questionCategoryId: 'dd543a8a-298b-4390-9bd4-d852490e1a56',
      title: 'ตอบคำถามการคูณหารเลขเบื้องต้น 201',
    },
    {
      questionCategoryId: 'dd543a8a-298b-4390-9bd4-d852490e1a56',
      title: 'ตอบคำถามการคูณหารเลขเบื้องต้น 202',
    },
  ];

  goToQuiz(category: any) {
    this.storageService.saveCategory(category);
    this.router.navigate(['/quiz']);
  }
}
