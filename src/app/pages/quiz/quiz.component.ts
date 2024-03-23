import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionCategory, QuestionInfo } from '@app/models/question';
import { QuestionService } from '@app/services/question.service';
import { StorageService } from '@services/storage.service';
import { NavbarComponent } from '@shared/components/navbar/navbar.component';
import { TimeupComponent } from './timeup/timeup.component';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, NavbarComponent, TimeupComponent],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss',
})
export class QuizComponent {
  questions: QuestionInfo[] = [];
  question: QuestionInfo = new QuestionInfo();

  progressBarWidth: number = 0;

  quizIds: number[] = [];
  selectedAnswer: string = '';

  isTimeUp: boolean = false;
  finalAnswers: any;

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

      let current = new Date();
      // Do your operations
      let expired = storageService.getExpiredTime();
      let seconds = (expired.getTime() - current.getTime()) / 100;
      setTimeout(() => {
        this.progress(
          seconds,
          6000,
          document.querySelector('#progressBar') as HTMLElement
        );
      }, 100);
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
            let expired = storageService.getQuestion().timeLimitOfMinuteUnit;
            storageService.setExpiredTime(expired);
            setTimeout(() => {
              this.progress(
                expired * 600 - 1,
                expired * 600,
                document.querySelector('#progressBar') as HTMLElement
              );
            }, 100);
          },
        });
    }
  }

  progress(timeleft: number, timetotal: number, element: HTMLElement) {
    this.progressBarWidth = (timeleft * element.offsetWidth) / timetotal;

    if (timeleft > 0) {
      setTimeout(() => {
        this.progress(timeleft - 1, timetotal, element);
      }, 100);
    } else {
      //TODO build answers for submit and remove question data and asnwers
      //TODO show popup time up!
      //finalAnswer
      this.isTimeUp = true;
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
      //finalAnswer
      this.questionSerivce.submit(this.finalAnswers);
      this.router.navigate(['/result']);
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
