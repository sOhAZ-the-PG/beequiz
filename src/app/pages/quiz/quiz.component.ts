import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '@services/storage.service';
import { NavbarComponent } from '@shared/components/navbar/navbar.component';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss',
})
export class QuizComponent {
  constructor(private storageService: StorageService, private router: Router) {}

  answers: string[] = ['310', '255', '123', '453'];
  selectedAnswer: string = '';

  get categoryTitle(): string {
    return this.storageService.getCategory()!.title;
  }

  setAnswer(answer: string) {
    this.selectedAnswer = answer;
  }
}
