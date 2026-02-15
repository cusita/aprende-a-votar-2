import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ListaCamara } from '../listas-camara.constants';
import {
  CONFIGURACION_POR_DEFECTO,
  ConfiguracionCandidatosItem,
  obtenerConfiguracionPorCodigo,
} from '../configuracion';
import { obtenerListasCamaraConfiguradas } from '../listas-configuracion';

@Component({
  selector: 'app-camara-representantes',
  imports: [CommonModule],
  templateUrl: './camara-representantes.component.html',
  styleUrl: './camara-representantes.component.scss',
})
export class CamaraRepresentantesComponent implements OnInit, OnDestroy {
  listas: ListaCamara[] = [];
  configuracion: ConfiguracionCandidatosItem | null = CONFIGURACION_POR_DEFECTO;
  codigo: string | null = CONFIGURACION_POR_DEFECTO?.codigo ?? null;
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
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    const codigo = this.route.snapshot.paramMap.get('codigo');
    const configuracion = obtenerConfiguracionPorCodigo(codigo) ?? CONFIGURACION_POR_DEFECTO;

    this.configuracion = configuracion;
    this.codigo = configuracion?.codigo ?? null;
    this.listas = obtenerListasCamaraConfiguradas(
      configuracion?.camara?.numeroCandidato,
      configuracion?.camara?.partido,
    );
  }

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
    if (lista.preferente) {
      return;
    }

    if (!lista.elegido) {
      this.mensajeModal = 'Te equivocaste. Vuelve a intentarlo.';
      this.esCorrecto = false;
      this.mostrarModal = true;
      return;
    }

    this.partidoSeleccionadoPorLogo = lista;
    this.mostrarXPartido = true;
    this.mostrarMarcaX = true;
    this.mensajeModal = '¡Muy bien! Has elegido correctamente.';
    this.esCorrecto = true;
    this.timerModal = setTimeout(() => {
      this.mostrarModal = true;
      this.cdr.detectChanges();
    }, 1000);
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

    if (!lista.preferente) {
      this.mostrarMarcaX = true;
      this.mensajeModal = '¡Muy bien! Has elegido correctamente.';
      this.esCorrecto = true;
      this.timerModal = setTimeout(() => {
        this.mostrarModal = true;
        this.cdr.detectChanges();
      }, 1000);
      return;
    }

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
    if (this.codigo) {
      this.router.navigate(['/cod', this.codigo]);
      return;
    }

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
    if (this.codigo) {
      this.router.navigate(['/cod', this.codigo]);
      return;
    }

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
