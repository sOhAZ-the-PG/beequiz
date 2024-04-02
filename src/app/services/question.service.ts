import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { Category } from '@app/models/category';
import { QuestionCategory } from '@app/models/question';
import { Result } from '@app/models/result';
import { User } from '@app/models/user';
import { Submit } from '@app/models/submit';
import { Score } from '@app/models/score';

const API_URL = 'https://training-homework.calllab.net/v1';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(
    private client: HttpClient,
    private storageService: StorageService
  ) {}

  login(username: string, password: string): Observable<Result<User>> {
    return this.client.post<Result<User>>(
      API_URL + '/login',
      { username, password },
      httpOptions
    );
  }

  getCategory(): Observable<Result<Category[]>> {
    return this.client.get<Result<Category[]>>(
      API_URL + '/questions/categories',
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.storageService.getUser()!.accessToken}`,
        }),
      }
    );
  }

  getQuestionList(categoryId: string): Observable<Result<QuestionCategory>> {
    return this.client.get<Result<QuestionCategory>>(
      API_URL + '/questions/categories/' + categoryId,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.storageService.getUser()!.accessToken}`,
        }),
      }
    );
  }

  submit(answers: Submit): Observable<Result<Score>> {
    return this.client.post<Result<Score>>(
      API_URL + '/questions/submit-assignment',
      answers,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.storageService.getUser()!.accessToken}`,
        }),
      }
    );
  }
}
