import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { CamaraRepresentantesComponent } from './camara-representantes/camara-representantes.component';
import { SenadoComponent } from './senado/senado.component';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'camara', component: CamaraRepresentantesComponent },
  { path: 'senado', component: SenadoComponent },
  { path: ':codigo/camara', component: CamaraRepresentantesComponent },
  { path: ':codigo/senado', component: SenadoComponent },
  { path: ':codigo', component: InicioComponent },
  { path: 'cod/:codigo', component: InicioComponent },
  { path: 'cod/:codigo/camara', component: CamaraRepresentantesComponent },
  { path: 'cod/:codigo/senado', component: SenadoComponent },
];
