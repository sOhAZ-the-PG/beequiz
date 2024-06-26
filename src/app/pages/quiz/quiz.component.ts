import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionCategory, QuestionInfo } from '@app/models/question';
import { QuestionService } from '@app/services/question.service';
import { StorageService } from '@services/storage.service';
import { NavbarComponent } from '@shared/components/navbar/navbar.component';
import { TimeupComponent } from './timeup/timeup.component';
import { EncryptService } from '@app/services/encrypt.service';
import { Submit, SubmitAnswer, SubmitQuestion } from '@app/models/submit';
import { ToastService } from '@app/services/toast.service';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, NavbarComponent, TimeupComponent],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss',
})
export class QuizComponent {
  questionCategory: QuestionCategory = new QuestionCategory();
  question: QuestionInfo = new QuestionInfo();

  progressBarWidth: number = 0;

  quizIds: number[] = [];
  selectedAnswer: string[] = [];

  isTimeUp: boolean = false;
  finalAnswers: Submit = new Submit();

  constructor(
    private questionSerivce: QuestionService,
    public storageService: StorageService,
    private encryptService: EncryptService,
    private toastService: ToastService,
    private router: Router
  ) {
    if (this.storageService.haveQuestion()) {
      this.questionCategory = this.storageService.getQuestion();
      this.quizIds = Array(this.totalQuestion)
        .fill(0)
        .map((x, i) => i + 1);
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
          next: (result) => {
            if (result.isSuccess) {
              storageService.saveQuestion(result.data!);
              this.questionCategory = result.data!;
              this.quizIds = Array(this.totalQuestion)
                .fill(0)
                .map((x, i) => i + 1);
              this.question = this.questions[0];
              this.storageService.saveCurrentQuiz(1);
              this.storageService.initAnswer(this.totalQuestion);
              let expired = this.questionCategory.timeLimitOfMinuteUnit;
              storageService.setExpiredTime(expired);
              this.questionCategory.expired =
                this.storageService.getQuestion().expired;

              setTimeout(() => {
                this.progress(
                  expired * 600 - 1,
                  expired * 600,
                  document.querySelector('#progressBar') as HTMLElement
                );
              }, 100);
            } else {
              this.toastService.add('Fail to load questions!');
            }
          },
        });
    }
  }

  progress(timeleft: number, timetotal: number, element: HTMLElement) {
    if (Math.floor(timeleft) % 100 == 0) {
      let current = new Date();
      let expired = new Date(
        this.encryptService.decrypt(this.questionCategory.expired)
      );
      timeleft = (expired.getTime() - current.getTime()) / 100;
    }

    this.progressBarWidth = (timeleft * element.offsetWidth) / timetotal;

    if (timeleft > 0) {
      setTimeout(() => {
        this.progress(timeleft - 1, timetotal, element);
      }, 100);
    } else {
      this.finalAnswers.questionCategoryId =
        this.questionCategory.questionCategoryId;
      this.questions.forEach((q, i) => {
        let answers: SubmitAnswer[] = [];
        this.storageService.getAnswerAtIndex(i).forEach((a) => {
          answers.push(new SubmitAnswer(a));
        });
        this.finalAnswers.questions.push(
          new SubmitQuestion(q.questionId, answers)
        );
      });

      this.isTimeUp = true;
    }
  }

  get categoryTitle(): string {
    return this.storageService.getCategory()!.title;
  }

  get totalQuestion(): number {
    return this.questionCategory.totalQuestion;
  }

  get questions(): QuestionInfo[] {
    return this.questionCategory.questionInfo;
  }

  get currentQuiz(): number {
    return this.storageService.getCurrentQuiz();
  }

  get isAllAnswer(): boolean {
    let answers = this.storageService.getAnswers();
    for (let i = 0; i < answers.length; i++) {
      if (answers[i].length === 0) return false;
    }
    return true;
  }

  setAnswer(answer: string) {
    const index = this.selectedAnswer.indexOf(answer);
    if (index > -1) {
      this.selectedAnswer.splice(index, 1);
    } else this.selectedAnswer.push(answer);
    this.storageService.saveAnswer(this.currentQuiz - 1, this.selectedAnswer);
  }

  isAlreadyAnswer(id: number): boolean {
    return this.storageService.getAnswerAtIndex(id - 1).length > 0;
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
      // Submit
      this.storageService.saveAnswer(this.currentQuiz - 1, this.selectedAnswer);
      this.finalAnswers.questionCategoryId =
        this.questionCategory.questionCategoryId;
      this.questions.forEach((q, i) => {
        let answers: SubmitAnswer[] = [];
        this.storageService.getAnswerAtIndex(i).forEach((a) => {
          answers.push(new SubmitAnswer(a));
        });
        this.finalAnswers.questions.push(
          new SubmitQuestion(q.questionId, answers)
        );
      });
      this.questionSerivce.submit(this.finalAnswers).subscribe({
        next: (result) => {
          if (result.isSuccess) {
            this.storageService.saveScore(result.data!);
            this.router.navigate(['/result']);
          } else {
            this.toastService.add('Fail to submit answer!');
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
