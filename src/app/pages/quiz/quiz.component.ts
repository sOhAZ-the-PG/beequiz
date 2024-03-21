import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionInfo } from '@app/models/question';
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

  question: QuestionInfo = {
    questionId: '5aa050e0-86e1-4314-a914-981ada4f6b69',
    sequence: 1,
    title: 'ข้อใดได้ผลรวม 20',
    questionAnswerInfo: [
      {
        questionAnswerId: 'da06ed71-c434-45ba-beb3-dd6e2d9bc961',
        sequence: 1,
        answer: '5+5+5+5',
      },
      {
        questionAnswerId: '3a7dfa36-19ce-4d52-95ec-929fdea6fdf4',
        sequence: 2,
        answer: '-5-5+5+10',
      },
      {
        questionAnswerId: 'a3011895-8136-488d-9a04-746cd060ef31',
        sequence: 3,
        answer: '-6-1+5+10',
      },
      {
        questionAnswerId: '84a3b803-a5dd-4987-be77-1d162937ab50',
        sequence: 4,
        answer: '-1-8+10',
      },
    ],
  };

  selectedAnswer: string = '';

  get categoryTitle(): string {
    return this.storageService.getCategory()!.title;
  }

  setAnswer(answer: string) {
    this.selectedAnswer = answer;
  }
}
