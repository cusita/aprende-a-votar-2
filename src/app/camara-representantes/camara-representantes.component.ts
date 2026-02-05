import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LISTAS_CAMARA, ListaCamara } from '../listas-camara.constants';

@Component({
  selector: 'app-camara-representantes',
  imports: [CommonModule],
  templateUrl: './camara-representantes.component.html',
  styleUrl: './camara-representantes.component.scss',
})
export class CamaraRepresentantesComponent implements OnInit, OnDestroy {
  listas: ListaCamara[] = LISTAS_CAMARA;
  mostrarModal = false;
  mensajeModal = '';
  esCorrecto = false;
  candidatoSeleccionado: { numero: number; elegido: boolean } | null = null;
  mostrarMarcaX = false;
  mostrarXPartido = false;
  mostrarXCandidato = false;
  listaSeleccionada: ListaCamara | null = null;
  partidoSeleccionadoPorLogo: ListaCamara | null = null;
  private timerModal: any = null;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {}

  onSeleccionarCandidato(candidato: { numero: number; elegido: boolean }, lista: ListaCamara) {
    // Si el candidato no es elegido, error inmediato
    if (!candidato.elegido) {
      this.mensajeModal = 'Te equivocaste. Vuelve a intentarlo.';
      this.esCorrecto = false;
      this.mostrarModal = true;
      return;
    }

    // El candidato es elegido - mostrar X inmediatamente
    this.candidatoSeleccionado = candidato;
    this.listaSeleccionada = lista;
    this.mostrarXCandidato = true;

    // Verificar si ya seleccionó el partido correcto por el logo
    if (this.partidoSeleccionadoPorLogo && this.partidoSeleccionadoPorLogo.elegido) {
      // Verificar si es el mismo partido
      if (this.partidoSeleccionadoPorLogo === lista) {
        // ¡Éxito! Tiene partido elegido y candidato elegido
        this.mostrarMarcaX = true;
        this.mensajeModal = '¡Muy bien! Has elegido correctamente.';
        this.esCorrecto = true;
        this.timerModal = setTimeout(() => {
          this.mostrarModal = true;
          this.cdr.detectChanges();
        }, 1000);
      } else {
        // Seleccionó candidato de otro partido
        this.mensajeModal = 'Te equivocaste. Vuelve a intentarlo.';
        this.esCorrecto = false;
        this.mostrarModal = true;
      }
    }
    // Si no ha seleccionado el partido por logo, solo marcar el candidato y esperar
  }

  onClickListaNoPreferente(lista: ListaCamara) {
    // Si la lista no es preferente, error
    if (!lista.preferente) {
      this.mensajeModal = 'Te equivocaste. Vuelve a intentarlo.';
      this.esCorrecto = false;
      this.mostrarModal = true;
      return;
    }
  }

  onClickLogoPartido(lista: ListaCamara, event: Event) {
    event.stopPropagation();
    
    // Si el partido no es elegido, error inmediato
    if (!lista.elegido) {
      this.mensajeModal = 'Te equivocaste. Vuelve a intentarlo.';
      this.esCorrecto = false;
      this.mostrarModal = true;
      return;
    }

    // El partido es elegido - mostrar X inmediatamente
    this.partidoSeleccionadoPorLogo = lista;
    this.mostrarXPartido = true;

    // Verificar si ya seleccionó el candidato correcto
    if (this.candidatoSeleccionado && this.candidatoSeleccionado.elegido && this.listaSeleccionada === lista) {
      // ¡Éxito! Tiene partido elegido y candidato elegido del mismo partido
      this.mostrarMarcaX = true;
      this.mensajeModal = '¡Muy bien! Has elegido correctamente.';
      this.esCorrecto = true;
      this.timerModal = setTimeout(() => {
        this.mostrarModal = true;
        this.cdr.detectChanges();
      }, 1000);
    }
    // Si no ha seleccionado candidato o no es del mismo partido, solo marcar y esperar
  }

  cerrarModalYVolver() {
    this.mostrarModal = false;
    if (this.timerModal) {
      clearTimeout(this.timerModal);
      this.timerModal = null;
    }
    this.limpiarDatos();
    this.router.navigate(['/']);
  }

  limpiarDatos() {
    this.candidatoSeleccionado = null;
    this.listaSeleccionada = null;
    this.partidoSeleccionadoPorLogo = null;
    this.mensajeModal = '';
    this.esCorrecto = false;
    this.mostrarMarcaX = false;
    this.mostrarXPartido = false;
    this.mostrarXCandidato = false;
    if (this.timerModal) {
      clearTimeout(this.timerModal);
      this.timerModal = null;
    }
  }

  volver() {
    this.limpiarDatos();
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    if (this.timerModal) {
      clearTimeout(this.timerModal);
      this.timerModal = null;
    }
    this.limpiarDatos();
  }
}
