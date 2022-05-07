import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// componentes
import { InicioComponent } from './pages/noRegisters/inicio/inicio.component';
import { NegociosComponent } from './pages/noRegisters/negocios/negocios.component';
import { ContactoComponent } from './pages/noRegisters/contacto/contacto.component';
import { EntrarComponent } from './pages/noRegisters/entrar/entrar.component';
import { RegistrarseComponent } from './pages/noRegisters/registrarse/registrarse.component';
import { NegocioComponent } from './pages/noRegisters/negocio/negocio.component';

// modulos
import { PagesModuleModule } from './pages/pages-module.module';

// guards
import { UserGuard } from './guards/user.guard';
import { LoginRegGuard } from './guards/login-reg.guard';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'negocios', component: NegociosComponent },
  { path: 'negocio', component: NegocioComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'entrar', component: EntrarComponent, canActivate: [LoginRegGuard] },
  { path: 'registrarse', component: RegistrarseComponent, canActivate: [LoginRegGuard] },
  { path: '', component: InicioComponent },
  { path: '**', redirectTo: 'inicio', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' }),
  PagesModuleModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
