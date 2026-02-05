import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { CamaraRepresentantesComponent } from './camara-representantes/camara-representantes.component';
import { SenadoComponent } from './senado/senado.component';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'camara', component: CamaraRepresentantesComponent },
  { path: 'senado', component: SenadoComponent },
];
