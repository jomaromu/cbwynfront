import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// modulos personalizados
import { PagesModuleModule } from './pages/pages-module.module';
import { SharedModuleModule } from './shared/shared-module.module';

// sockets
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = { url: `${environment.urlBack}`, options: {} };

// componentes
import { InicioComponent } from './pages/noRegisters/inicio/inicio.component';
import { NegociosComponent } from './pages/noRegisters/negocios/negocios.component';
import { ContactoComponent } from './pages/noRegisters/contacto/contacto.component';
import { EntrarComponent } from './pages/noRegisters/entrar/entrar.component';
import { RegistrarseComponent } from './pages/noRegisters/registrarse/registrarse.component';
import { NegocioComponent } from './pages/noRegisters/negocio/negocio.component';
import { NegocioSharedComponent } from './shared/negocio-shared/negocio-shared.component';

// angular material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';

// pipes
import { MultimediaPipe } from './pipes/multimedia.pipe';
import { ReduceTextoPipe } from './pipes/reduce-texto.pipe';
import { SortPipe } from './pipes/sort.pipe';

// scripts
import { NavbarResponsivo } from './scripts/navbar';
import { Traductor } from './scripts/traductor';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    NegociosComponent,
    ContactoComponent,
    EntrarComponent,
    RegistrarseComponent,
    NegocioComponent,
    NegocioSharedComponent,
    // MultimediaPipe,
    ReduceTextoPipe,
    SortPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PagesModuleModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatFormFieldModule,
    SocketIoModule.forRoot(config)
  ],
  exports: [
    NegocioSharedComponent,
    // MultimediaPipe
  ],
  providers: [
    NavbarResponsivo,
    Traductor
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
