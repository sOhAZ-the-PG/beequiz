import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '@app/models/category';
import { QuestionService } from '@app/services/question.service';
import { ToastService } from '@app/services/toast.service';
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
  categories: Category[] = [];

  constructor(
    private questionSerivce: QuestionService,
    private storageService: StorageService,
    private toastService: ToastService,
    private router: Router
  ) {
    this.storageService.removeScore();

    this.questionSerivce.getCategory().subscribe({
      next: (result) => {
        if (result.isSuccess) {
          this.categories = result.data!;
        } else {
          this.toastService.add('Fail to load category!');
        }
      },
      error: (err) => {
        if (err.error.statusCode === 401) {
          this.storageService.logOut();
          this.toastService.add('Session expired!');
          this.router.navigate(['/login']);
        }
      },
    });
  }

  goToQuiz(category: Category) {
    this.storageService.saveCategory(category);
    this.storageService.removeQuestion();
    this.router.navigate(['/quiz']);
  }
}
