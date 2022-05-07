"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
// componentes
var inicio_component_1 = require("./pages/noRegisters/inicio/inicio.component");
var negocios_component_1 = require("./pages/noRegisters/negocios/negocios.component");
var contacto_component_1 = require("./pages/noRegisters/contacto/contacto.component");
var entrar_component_1 = require("./pages/noRegisters/entrar/entrar.component");
var registrarse_component_1 = require("./pages/noRegisters/registrarse/registrarse.component");
var negocio_component_1 = require("./pages/noRegisters/negocio/negocio.component");
// modulos
var pages_module_module_1 = require("./pages/pages-module.module");
var login_reg_guard_1 = require("./guards/login-reg.guard");
var routes = [
    { path: 'inicio', component: inicio_component_1.InicioComponent },
    { path: 'negocios', component: negocios_component_1.NegociosComponent },
    { path: 'negocio', component: negocio_component_1.NegocioComponent },
    { path: 'contacto', component: contacto_component_1.ContactoComponent },
    { path: 'entrar', component: entrar_component_1.EntrarComponent, canActivate: [login_reg_guard_1.LoginRegGuard] },
    { path: 'registrarse', component: registrarse_component_1.RegistrarseComponent, canActivate: [login_reg_guard_1.LoginRegGuard] },
    { path: '', component: inicio_component_1.InicioComponent },
    { path: '**', redirectTo: 'inicio', pathMatch: 'full' },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' }),
                pages_module_module_1.PagesModuleModule],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
