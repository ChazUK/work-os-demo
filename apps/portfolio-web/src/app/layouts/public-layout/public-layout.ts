import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-public-layout',
  imports: [RouterOutlet, RouterLink, AsyncPipe],
  templateUrl: './public-layout.html',
  styleUrl: './public-layout.css',
})
export class PublicLayout {
  private authService = inject(AuthService);
  public user$: Observable<User | null>;

  constructor() {
    this.user$ = this.authService.user$;
  }
}
