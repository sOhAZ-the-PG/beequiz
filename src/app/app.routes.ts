import { Routes } from '@angular/router';
import { LoginComponent } from '@pages/login/login.component';
import { CategoryComponent } from '@pages/category/category.component';
import { QuizComponent } from '@pages/quiz/quiz.component';
import { ResultComponent } from '@pages/result/result.component';
import { authGuard } from '@app/guards/auth.guard';
import { noauthGuard } from '@app/guards/noauth.guard';
import { haveCategoryGuard } from '@app/guards/have-category.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [noauthGuard] },
  { path: 'category', component: CategoryComponent, canActivate: [authGuard] },
  { path: 'quiz', component: QuizComponent, canActivate: [haveCategoryGuard] },
  { path: 'result', component: ResultComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
