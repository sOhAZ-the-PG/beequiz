import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Submit } from '@app/models/submit';
import { StorageService } from '@app/services/storage.service';
import { ToastService } from '@app/services/toast.service';
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
    private storageService: StorageService,
    private questionSerivce: QuestionService,
    private toastService: ToastService,
    private router: Router
  ) {}

  submit() {
    this.questionSerivce.submit(this.answers).subscribe({
      next: (result) => {
        if (result.isSuccess) {
          this.storageService.saveScore(result.data!);
          this.router.navigate(['/result']);
        } else {
          this.toastService.add('Fail to submit answer!');
        }
      },
      error: (err) => {},
    });
  }
}
