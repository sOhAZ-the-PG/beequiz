import { Component } from '@angular/core';
import { StorageService } from '@app/services/storage.service';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss',
})
export class ResultComponent {
  constructor(private storageService: StorageService) {
    this.storageService.removeAnswers();
  }
}
