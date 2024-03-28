import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Score } from '@app/models/score';
import { StorageService } from '@app/services/storage.service';
import { NavbarComponent } from '@app/shared/components/navbar/navbar.component';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss',
})
export class ResultComponent {
  constructor(private storageService: StorageService, private router: Router) {
    this.storageService.removeAnswers();
  }

  get getScore(): Score {
    return this.storageService.getScore();
  }

  goBack() {
    this.router.navigate(['/category']);
  }
}
