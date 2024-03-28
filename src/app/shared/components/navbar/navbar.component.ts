import { Component } from '@angular/core';
import { StorageService } from '@services/storage.service';

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

  get getName(): string {
    let names = this.storageService.getUser()!.fullName.split(' ');
    return (
      names[0] + (names[1] != null ? ' ' + names[1].substring(0, 1) + '.' : '')
    );
  }
}
