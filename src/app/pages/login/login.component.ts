import { Component } from '@angular/core';
import { ValidationErrorComponent } from './validation-error/validation-error.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { StorageService } from '@app/services/storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, ValidationErrorComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private storageService: StorageService, private router: Router) {
    if (this.storageService.isLoggedIn()) this.router.navigate(['/category']);
  }

  form: any = {
    username: null,
    password: null,
  };

  onSubmit() {
    const { username, password } = this.form;

    console.log('Username:', username);
    console.log('Password:', password);

    this.storageService.saveUser({ username: 'test' });
    this.router.navigate(['/category']);
  }
}
