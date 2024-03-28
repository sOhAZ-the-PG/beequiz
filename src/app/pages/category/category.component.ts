import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '@app/models/category';
import { QuestionService } from '@app/services/question.service';
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
    private router: Router
  ) {
    this.storageService.removeScore();

    this.questionSerivce.getCategory().subscribe({
      next: (result) => {
        if (result.isSuccess) {
          this.categories = result.data!;
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
