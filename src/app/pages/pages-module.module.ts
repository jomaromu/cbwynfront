import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// ngx-image-cropper
import { ImageCropperModule } from 'ngx-image-cropper';

// angular material
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

// modulos
import { SharedModuleModule } from '../shared/shared-module.module';

// rutas de paginas
import { PAGES_ROUTES } from './pages-routing.module';

// componentes
// ADMIN
import { AdminComponent } from './registers/admin/admin.component';

// pipes
import { PipeNegociosPipe } from '../pipes/pipe-negocios.pipe';

// USUARIOS
import { DashUserComponent } from './registers/usuarios/dash-user/dash-user.component';
import { AceptadosComponent } from './registers/usuarios/aceptados/aceptados.component';
import { RevisionComponent } from './registers/usuarios/revision/revision.component';
import { FavoritosComponent } from './registers/usuarios/favoritos/favoritos.component';
import { NotificacionesComponent } from './registers/usuarios/notificaciones/notificaciones.component';
import { UserComponent } from './registers/usuarios/user.component';
import { NegociacionesComponent } from './registers/usuarios/negociaciones/negociaciones.component';
import { NuevoNegocioComponent } from './registers/usuarios/nuevo-negocio/nuevo-negocio.component';
import { MisNegociosComponent } from './registers/usuarios/mis-negocios/mis-negocios.component';
import { InteresadosEmprendeComponent } from './registers/usuarios/interesados-emprende/interesados-emprende.component';
import { CerradosEmprendeComponent } from './registers/usuarios/cerrados-emprende/cerrados-emprende.component';
import { IntereadosInverComponent } from './registers/usuarios/intereados-inver/intereados-inver.component';
import { RechazadosComponent } from './registers/usuarios/rechazados/rechazados.component';
import { CheckoutComponent } from './registers/usuarios/checkout/checkout.component';
import { MultimediaPipe } from '../pipes/multimedia.pipe';

@NgModule({
  declarations: [
    DashUserComponent,
    AceptadosComponent,
    RevisionComponent,
    FavoritosComponent,
    NotificacionesComponent,
    UserComponent,
    AdminComponent,
    NegociacionesComponent,
    NuevoNegocioComponent,
    MisNegociosComponent,
    InteresadosEmprendeComponent,
    CerradosEmprendeComponent,
    IntereadosInverComponent,
    RechazadosComponent,
    PipeNegociosPipe,
    // MultimediaPipe,
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    ImageCropperModule,
    SharedModuleModule,
    RouterModule,
    PAGES_ROUTES,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule

  ], exports: [
  ]
})
export class PagesModuleModule { }
