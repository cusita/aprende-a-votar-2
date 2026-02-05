import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  CONFIGURACION_POR_DEFECTO,
  ConfiguracionCandidatosItem,
  obtenerConfiguracionPorCodigo,
} from '../configuracion';

@Component({
  selector: 'app-inicio',
  imports: [CommonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent implements OnInit {
  configuracion: ConfiguracionCandidatosItem | null = null;
  codigo: string | null = null;
  mostrarMensajeRutaInvalida = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    const codigo = this.route.snapshot.paramMap.get('codigo');
    const configuracion = obtenerConfiguracionPorCodigo(codigo);

    if (!configuracion) {
      this.mostrarMensajeRutaInvalida = true;
      this.configuracion = null;
      this.codigo = null;
      return;
    }

    this.mostrarMensajeRutaInvalida = false;
    this.configuracion = configuracion;
    this.codigo = configuracion.codigo;
  }

  navegarACamara() {
    if (this.codigo) {
      this.router.navigate(['/cod', this.codigo, 'camara']);
      return;
    }

    this.router.navigate(['/camara']);
  }

  navegarASenado() {
    if (this.codigo) {
      this.router.navigate(['/cod', this.codigo, 'senado']);
      return;
    }

    this.router.navigate(['/senado']);
  }

  get tieneSoloUnBoton(): boolean {
    const cantidad = (this.configuracion?.camara ? 1 : 0) + (this.configuracion?.senado ? 1 : 0);
    return cantidad === 1;
  }
}
