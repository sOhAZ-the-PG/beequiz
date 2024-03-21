import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@app/models/user';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { Category } from '@app/models/category';

const API_URL = 'http://localhost:3001';
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

  login(username: string, password: string): Observable<User> {
    return this.client.post(
      API_URL + '/login',
      { username, password },
      httpOptions
    );
  }

  getCategory(): Observable<Category[]> {
    return this.client.get<Category[]>(API_URL + '/v1/questions/categories', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.storageService.getUser()!.accessToken}`,
      }),
    });
  }
}
