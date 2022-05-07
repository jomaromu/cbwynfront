"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/common/http");
var layout_1 = require("@angular/cdk/layout");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
// modulos personalizados
var pages_module_module_1 = require("./pages/pages-module.module");
var shared_module_module_1 = require("./shared/shared-module.module");
// sockets
var ngx_socket_io_1 = require("ngx-socket-io");
var config = { url: "" + environment_1.environment.urlBack, options: {} };
// componentes
var inicio_component_1 = require("./pages/noRegisters/inicio/inicio.component");
var negocios_component_1 = require("./pages/noRegisters/negocios/negocios.component");
var contacto_component_1 = require("./pages/noRegisters/contacto/contacto.component");
var entrar_component_1 = require("./pages/noRegisters/entrar/entrar.component");
var registrarse_component_1 = require("./pages/noRegisters/registrarse/registrarse.component");
var negocio_component_1 = require("./pages/noRegisters/negocio/negocio.component");
var negocio_shared_component_1 = require("./shared/negocio-shared/negocio-shared.component");
// angular material
var animations_1 = require("@angular/platform-browser/animations");
var button_1 = require("@angular/material/button");
var input_1 = require("@angular/material/input");
var select_1 = require("@angular/material/select");
var checkbox_1 = require("@angular/material/checkbox");
var form_field_1 = require("@angular/material/form-field");
var reduce_texto_pipe_1 = require("./pipes/reduce-texto.pipe");
var sort_pipe_1 = require("./pipes/sort.pipe");
// scripts
var navbar_1 = require("./scripts/navbar");
var traductor_1 = require("./scripts/traductor");
var environment_1 = require("src/environments/environment");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                inicio_component_1.InicioComponent,
                negocios_component_1.NegociosComponent,
                contacto_component_1.ContactoComponent,
                entrar_component_1.EntrarComponent,
                registrarse_component_1.RegistrarseComponent,
                negocio_component_1.NegocioComponent,
                negocio_shared_component_1.NegocioSharedComponent,
                // MultimediaPipe,
                reduce_texto_pipe_1.ReduceTextoPipe,
                sort_pipe_1.SortPipe,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                http_1.HttpClientModule,
                pages_module_module_1.PagesModuleModule,
                shared_module_module_1.SharedModuleModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                animations_1.BrowserAnimationsModule,
                layout_1.LayoutModule,
                button_1.MatButtonModule,
                input_1.MatInputModule,
                select_1.MatSelectModule,
                checkbox_1.MatCheckboxModule,
                form_field_1.MatFormFieldModule,
                ngx_socket_io_1.SocketIoModule.forRoot(config)
            ],
            exports: [
                negocio_shared_component_1.NegocioSharedComponent,
            ],
            providers: [
                navbar_1.NavbarResponsivo,
                traductor_1.Traductor
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
