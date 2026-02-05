import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  imports: [],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {
  constructor(private router: Router) {}

  navegarACamara() {
    this.router.navigate(['/camara']);
  }

  navegarASenado() {
    this.router.navigate(['/senado']);
  }
}
