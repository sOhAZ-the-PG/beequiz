import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Submit } from '@app/models/submit';
import { QuestionService } from '@services/question.service';

@Component({
  selector: 'app-timeup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timeup.component.html',
  styleUrl: './timeup.component.scss',
})
export class TimeupComponent {
  @Input('show') show: boolean = false;
  @Input('answers') answers: Submit = new Submit();

  constructor(
    private questionSerivce: QuestionService,
    private router: Router
  ) {}

  submit() {
    this.questionSerivce.submit(this.answers);
    this.router.navigate(['/result']);
  }
}
