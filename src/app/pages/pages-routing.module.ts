import { Routes, RouterModule } from '@angular/router';

// componentes

// ADMIN
import { AdminComponent } from './registers/admin/admin.component';

// USUARIOS
import { DashUserComponent } from './registers/usuarios/dash-user/dash-user.component';
import { AceptadosComponent } from './registers/usuarios/aceptados/aceptados.component';
import { RevisionComponent } from './registers/usuarios/revision/revision.component';
import { FavoritosComponent } from './registers/usuarios/favoritos/favoritos.component';
import { UserComponent } from './registers/usuarios/user.component';
import { NegociacionesComponent } from './registers/usuarios/negociaciones/negociaciones.component';
import { NuevoNegocioComponent } from './registers/usuarios/nuevo-negocio/nuevo-negocio.component';
import { MisNegociosComponent } from './registers/usuarios/mis-negocios/mis-negocios.component';
import { InteresadosEmprendeComponent } from './registers/usuarios/interesados-emprende/interesados-emprende.component';
import { CerradosEmprendeComponent } from './registers/usuarios/cerrados-emprende/cerrados-emprende.component';
import { IntereadosInverComponent } from './registers/usuarios/intereados-inver/intereados-inver.component';
import { RechazadosComponent } from './registers/usuarios/rechazados/rechazados.component';
import { NotificacionesComponent } from './registers/usuarios/notificaciones/notificaciones.component';
import { CheckoutComponent } from './registers/usuarios/checkout/checkout.component';

// guards
import { UserGuard } from '../guards/user.guard';
import { StatusCheckGuard } from '../guards/status-check.guard';

const pagesRoutes: Routes = [
  { path: 'administrador', component: AdminComponent },
  {
    path: 'user-dashboard', component: UserComponent, canActivate: [UserGuard],
    children: [
      { path: 'dashboard', component: DashUserComponent },
      { path: 'nuevo', component: NuevoNegocioComponent },
      { path: 'mis-negocios', component: MisNegociosComponent },
      { path: 'negociaciones', component: NegociacionesComponent },
      { path: 'interesados', component: InteresadosEmprendeComponent },
      { path: 'cerrados', component: CerradosEmprendeComponent },
      { path: 'aceptados', component: AceptadosComponent },
      { path: 'revision', component: RevisionComponent },
      { path: 'favoritos', component: FavoritosComponent },
      { path: 'negociaciones', component: NegociacionesComponent },
      { path: 'interesados-inver', component: IntereadosInverComponent },
      { path: 'rechazados', component: RechazadosComponent },
      { path: 'notificaciones', component: NotificacionesComponent },
      { path: '', component: DashUserComponent },
      { path: '**', pathMatch: 'full', redirectTo: 'user-dashboard' },
    ]
  },
  { path: 'checkout', component: CheckoutComponent, canActivate: [UserGuard] },
];

// export class RoutingModuleModule { }
export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
