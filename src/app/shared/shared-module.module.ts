import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// angular material
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';

// componentes
import { NavbarComponent } from './navbar/navbar.component';
import { BannerComponent } from './banner/banner.component';
import { NoFoundComponent } from './no-found/no-found.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PerfilComponent } from './perfil/perfil.component';
import { FooterComponent } from './footer/footer.component';
import { NoStokComponent } from './no-stok/no-stok.component';
import { EditarNegocioComponent } from './editar-negocio/editar-negocio.component';
import { TablaFavComponent } from './tabla-fav/tabla-fav.component';

// pipes
import { PipeTrimPipe } from '../pipes/pipe-trim.pipe';
import { MultimediaPipe } from '../pipes/multimedia.pipe';

// cropper
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  declarations: [
    PipeTrimPipe,
    NavbarComponent,
    BannerComponent,
    NoFoundComponent,
    SidebarComponent,
    PerfilComponent,
    FooterComponent,
    NoStokComponent,
    EditarNegocioComponent,
    TablaFavComponent,
    MultimediaPipe
  ],

  imports: [
    CommonModule,
    RouterModule,
    MatTreeModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule,
    FormsModule,
    ReactiveFormsModule,
    ImageCropperModule
  ],
  exports: [
    NavbarComponent,
    BannerComponent,
    NoFoundComponent,
    SidebarComponent,
    PerfilComponent,
    FooterComponent,
    NoStokComponent,
    EditarNegocioComponent,
    TablaFavComponent,
    MultimediaPipe
  ]
})
export class SharedModuleModule { }
