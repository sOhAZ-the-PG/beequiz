import { Component } from '@angular/core';
import { StorageService } from '@app/services/storage.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(public storageService: StorageService) {}

  logout() {
    this.storageService.clean();
    location.reload();
  }
}
