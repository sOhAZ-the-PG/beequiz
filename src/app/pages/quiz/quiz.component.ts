import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionCategory, QuestionInfo } from '@app/models/question';
import { QuestionService } from '@app/services/question.service';
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
  questions: QuestionInfo[] = [];
  question: QuestionInfo = new QuestionInfo();
  show: boolean = true;

  constructor(
    private questionSerivce: QuestionService,
    public storageService: StorageService,
    private router: Router
  ) {
    if (this.storageService.haveQuestion()) {
      this.questions = storageService.getQuestion().questionInfo;
      this.question = this.questions[this.currentQuiz - 1];
    } else {
      this.questionSerivce
        .getQuestionList(storageService.getCategory().questionCategoryId)
        .subscribe({
          next: (data: QuestionCategory) => {
            storageService.saveQuestion(data);
            this.questions = data.questionInfo;
            this.question = this.questions[0];
            this.storageService.saveCurrentQuiz(1);
            this.storageService.initAnswer(this.totalQuestion);
          },
        });
    }
  }

  selectedAnswer: string = '';

  get categoryTitle(): string {
    return this.storageService.getCategory()!.title;
  }

  get totalQuestion(): number {
    return this.storageService.getQuestion().totalQuestion;
  }

  get currentQuiz(): number {
    return this.storageService.getCurrentQuiz();
  }

  setAnswer(answer: string) {
    this.selectedAnswer = answer;
  }

  previous() {
    if (this.currentQuiz !== 1) {
      this.question = this.questions[this.currentQuiz - 2];
      this.storageService.saveCurrentQuiz(this.currentQuiz - 1);
      this.selectedAnswer = this.storageService.getAnswerAtIndex(
        this.currentQuiz - 1
      );
    }
  }

  next() {
    if (this.currentQuiz == this.totalQuestion) {
      this.storageService.saveAnswer(this.currentQuiz - 1, this.selectedAnswer);
      //submit
    } else {
      this.storageService.saveAnswer(this.currentQuiz - 1, this.selectedAnswer);
      this.question = this.questions[this.currentQuiz];
      this.storageService.saveCurrentQuiz(this.currentQuiz + 1);
      this.selectedAnswer = this.storageService.getAnswerAtIndex(
        this.currentQuiz - 1
      );
    }
  }
}
