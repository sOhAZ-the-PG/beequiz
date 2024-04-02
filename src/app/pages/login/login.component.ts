import { Component } from '@angular/core';
import { ValidationErrorComponent } from '@pages/login/validation-error/validation-error.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { StorageService } from '@services/storage.service';
import { QuestionService } from '@services/question.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ToastService } from '@app/services/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, ValidationErrorComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    private questionSerivce: QuestionService,
    private storageService: StorageService,
    private toastService: ToastService,
    private router: Router
  ) {}

  form: any = {
    username: null,
    password: null,
  };

  onSubmit() {
    const { username, password } = this.form;

    this.questionSerivce.login(username, password).subscribe({
      next: (result) => {
        if (result.isSuccess) {
          this.storageService.saveUser(result.data!);
          this.router.navigate(['/category']);
        } else {
          this.toastService.add('Fail to log in!');
        }
      },
      error: (err) => {
        if (err.status === 401) {
          this.toastService.add('Incorrect username or password!');
        }
      },
    });
  }
}
