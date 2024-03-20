import { Component } from '@angular/core';
import { ValidationErrorComponent } from '@pages/login/validation-error/validation-error.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { StorageService } from '@services/storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, ValidationErrorComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private storageService: StorageService, private router: Router) {}

  form: any = {
    username: null,
    password: null,
  };

  onSubmit() {
    const { username, password } = this.form;

    console.log('Username:', username);
    console.log('Password:', password);

    this.storageService.saveUser({ username: username });
    this.router.navigate(['/category']);
  }
}
