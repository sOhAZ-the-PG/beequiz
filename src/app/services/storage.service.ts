import { Injectable } from '@angular/core';
import { QuestionCategory } from '@app/models/question';
import { EncryptService } from '@services/encrypt.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private encryptService: EncryptService) {}

  public static readonly USER_KEY = 'user-auth';
  public static readonly CATEGORY_KEY = 'category';
  public static readonly QUESTION_KEY = 'question';
  public static readonly CURRENT_KEY = 'current';
  public static readonly ANSWER_KEY = 'answer';

  clean(): void {
    sessionStorage.clear();
  }

  public saveUser(user: any): void {
    sessionStorage.removeItem(StorageService.USER_KEY);
    sessionStorage.setItem(
      StorageService.USER_KEY,
      this.encryptService.encrypt(JSON.stringify(user))
    );
  }

  public getUser(): any {
    const user = sessionStorage.getItem(StorageService.USER_KEY);
    return user ? JSON.parse(this.encryptService.decrypt(user)) : null;
  }

  public isLoggedIn(): boolean {
    return sessionStorage.getItem(StorageService.USER_KEY) !== null;
  }

  public saveCategory(category: any): void {
    sessionStorage.removeItem(StorageService.CATEGORY_KEY);
    sessionStorage.setItem(
      StorageService.CATEGORY_KEY,
      this.encryptService.encrypt(JSON.stringify(category))
    );
  }

  public getCategory(): any {
    const category = sessionStorage.getItem(StorageService.CATEGORY_KEY);
    return category ? JSON.parse(this.encryptService.decrypt(category)) : null;
  }

  public haveCategory(): boolean {
    return sessionStorage.getItem(StorageService.CATEGORY_KEY) !== null;
  }

  public saveQuestion(question: QuestionCategory): void {
    sessionStorage.removeItem(StorageService.QUESTION_KEY);
    sessionStorage.setItem(
      StorageService.QUESTION_KEY,
      JSON.stringify(question)
    );
  }

  public getQuestion(): any {
    const question = sessionStorage.getItem(StorageService.QUESTION_KEY);
    return question ? JSON.parse(question) : null;
  }

  public haveQuestion(): boolean {
    return sessionStorage.getItem(StorageService.QUESTION_KEY) !== null;
  }

  public removeQuestion(): void {
    sessionStorage.removeItem(StorageService.QUESTION_KEY);
  }

  public saveCurrentQuiz(sequence: number): void {
    sessionStorage.removeItem(StorageService.CURRENT_KEY);
    sessionStorage.setItem(StorageService.CURRENT_KEY, sequence.toString());
  }

  public getCurrentQuiz(): any {
    const current = sessionStorage.getItem(StorageService.CURRENT_KEY);
    return current ? Number(current) : null;
  }

  public initAnswer(total: number): void {
    sessionStorage.removeItem(StorageService.ANSWER_KEY);
    let answers: string[] = new Array(total).fill('');
    sessionStorage.setItem(StorageService.ANSWER_KEY, JSON.stringify(answers));
  }

  public saveAnswer(index: number, answer: string): void {
    let answers = JSON.parse(
      sessionStorage.getItem(StorageService.ANSWER_KEY)!
    );
    answers[index] = answer;
    sessionStorage.setItem(StorageService.ANSWER_KEY, JSON.stringify(answers));
  }

  public getAnswerAtIndex(index: number): string {
    let answers = JSON.parse(
      sessionStorage.getItem(StorageService.ANSWER_KEY)!
    );
    return answers[index];
  }

  public getAnswers(): any {
    return JSON.parse(sessionStorage.getItem(StorageService.ANSWER_KEY)!);
  }

  public removeAnswers(): void {
    sessionStorage.removeItem(StorageService.ANSWER_KEY);
  }

  public setExpiredTime(minute: number): void {
    let currentDateObj = new Date();
    let numberOfMlSeconds = currentDateObj.getTime();
    let addMlSeconds = minute * 60 * 1000;
    let newDateObj = new Date(numberOfMlSeconds + addMlSeconds);
    let question = this.getQuestion() as QuestionCategory;
    question.expired = this.encryptService.encrypt(
      newDateObj.toDateString() + ' ' + newDateObj.toTimeString()
    );
    sessionStorage.setItem(
      StorageService.QUESTION_KEY,
      JSON.stringify(question)
    );
  }

  public getExpiredTime(): Date {
    let question = this.getQuestion() as QuestionCategory;
    const date = new Date(this.encryptService.decrypt(question.expired));
    return date;
  }
}
