import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-authenticated-layout',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './authenticated-layout.html',
  styleUrl: './authenticated-layout.css',
})
export class AuthenticatedLayout {}
