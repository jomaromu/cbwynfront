"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NoRegistersModule = void 0;
var platform_browser_1 = require("@angular/platform-browser");
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/common/http");
// componentes
var inicio_component_1 = require("./noRegisters/inicio/inicio.component");
var negocios_component_1 = require("./noRegisters/negocios/negocios.component");
var contacto_component_1 = require("./noRegisters/contacto/contacto.component");
var entrar_component_1 = require("./noRegisters/entrar/entrar.component");
var registrarse_component_1 = require("./noRegisters/registrarse/registrarse.component");
var negocio_component_1 = require("./noRegisters/negocio/negocio.component");
// modulos
var shared_module_module_1 = require("../shared/shared-module.module");
var multimedia_pipe_1 = require("../pipes/multimedia.pipe");
var NoRegistersModule = /** @class */ (function () {
    function NoRegistersModule() {
    }
    NoRegistersModule = __decorate([
        core_1.NgModule({
            declarations: [
                inicio_component_1.InicioComponent,
                negocios_component_1.NegociosComponent,
                contacto_component_1.ContactoComponent,
                entrar_component_1.EntrarComponent,
                registrarse_component_1.RegistrarseComponent,
                negocio_component_1.NegocioComponent,
                multimedia_pipe_1.MultimediaPipe
            ],
            imports: [
                common_1.CommonModule,
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                http_1.HttpClientModule,
                shared_module_module_1.SharedModuleModule
            ]
        })
    ], NoRegistersModule);
    return NoRegistersModule;
}());
exports.NoRegistersModule = NoRegistersModule;
