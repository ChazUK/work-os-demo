import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-public-layout',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './public-layout.html',
  styleUrl: './public-layout.css',
})
export class PublicLayout {
  private authService = inject(AuthService);
  public loginUrl$: Observable<{ url: string }>;

  constructor() {
    this.loginUrl$ = this.authService.getLoginUrl();
  }
}
