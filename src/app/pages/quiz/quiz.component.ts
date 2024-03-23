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

  quizIds: number[] = [];
  selectedAnswer: string = '';

  constructor(
    private questionSerivce: QuestionService,
    public storageService: StorageService,
    private router: Router
  ) {
    if (this.storageService.haveQuestion()) {
      this.quizIds = Array(this.totalQuestion)
        .fill(0)
        .map((x, i) => i + 1);
      this.questions = storageService.getQuestion().questionInfo;
      this.question = this.questions[this.currentQuiz - 1];
      this.selectedAnswer = this.storageService.getAnswerAtIndex(
        this.currentQuiz - 1
      );
    } else {
      this.questionSerivce
        .getQuestionList(storageService.getCategory().questionCategoryId)
        .subscribe({
          next: (data: QuestionCategory) => {
            storageService.saveQuestion(data);
            this.quizIds = Array(this.totalQuestion)
              .fill(0)
              .map((x, i) => i + 1);
            this.questions = data.questionInfo;
            this.question = this.questions[0];
            this.storageService.saveCurrentQuiz(1);
            this.storageService.initAnswer(this.totalQuestion);
          },
        });
    }
  }

  get categoryTitle(): string {
    return this.storageService.getCategory()!.title;
  }

  get totalQuestion(): number {
    return this.storageService.getQuestion().totalQuestion;
  }

  get currentQuiz(): number {
    return this.storageService.getCurrentQuiz();
  }

  get isAllAnswer(): boolean {
    return this.storageService.getAnswers().indexOf('') > -1;
  }

  setAnswer(answer: string) {
    this.selectedAnswer = answer;
    this.storageService.saveAnswer(this.currentQuiz - 1, this.selectedAnswer);
  }

  isAlreadyAnswer(id: number): boolean {
    return this.storageService.getAnswerAtIndex(id - 1) !== '';
  }

  previous() {
    if (this.currentQuiz !== 1) {
      this.question = this.questions[this.currentQuiz - 2];
      this.storageService.saveCurrentQuiz(this.currentQuiz - 1);
      this.selectedAnswer = this.storageService.getAnswerAtIndex(
        this.currentQuiz - 1
      );
      (
        document.querySelector('#quiz_' + this.currentQuiz)! as HTMLElement
      ).focus();
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
      (
        document.querySelector('#quiz_' + this.currentQuiz)! as HTMLElement
      ).focus();
    }
  }

  goTo(id: number) {
    this.question = this.questions[id - 1];
    this.storageService.saveCurrentQuiz(id);
    this.selectedAnswer = this.storageService.getAnswerAtIndex(id - 1);
  }
}
