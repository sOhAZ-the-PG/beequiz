import { Component } from '@angular/core';
import { ValidationErrorComponent } from './validation-error/validation-error.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, ValidationErrorComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  form: any = {
    username: null,
    password: null,
  };

  onSubmit() {
    const { username, password } = this.form;

    console.log('Username:', username);
    console.log('Password:', password);
  }
}
