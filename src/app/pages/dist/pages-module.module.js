"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PagesModuleModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
// ngx-image-cropper
var ngx_image_cropper_1 = require("ngx-image-cropper");
// angular material
var button_1 = require("@angular/material/button");
var input_1 = require("@angular/material/input");
var select_1 = require("@angular/material/select");
var checkbox_1 = require("@angular/material/checkbox");
// modulos
var shared_module_module_1 = require("../shared/shared-module.module");
// rutas de paginas
var pages_routing_module_1 = require("./pages-routing.module");
// componentes
// ADMIN
var admin_component_1 = require("./registers/admin/admin.component");
// pipes
var pipe_negocios_pipe_1 = require("../pipes/pipe-negocios.pipe");
// USUARIOS
var dash_user_component_1 = require("./registers/usuarios/dash-user/dash-user.component");
var aceptados_component_1 = require("./registers/usuarios/aceptados/aceptados.component");
var revision_component_1 = require("./registers/usuarios/revision/revision.component");
var favoritos_component_1 = require("./registers/usuarios/favoritos/favoritos.component");
var notificaciones_component_1 = require("./registers/usuarios/notificaciones/notificaciones.component");
var user_component_1 = require("./registers/usuarios/user.component");
var negociaciones_component_1 = require("./registers/usuarios/negociaciones/negociaciones.component");
var nuevo_negocio_component_1 = require("./registers/usuarios/nuevo-negocio/nuevo-negocio.component");
var mis_negocios_component_1 = require("./registers/usuarios/mis-negocios/mis-negocios.component");
var interesados_emprende_component_1 = require("./registers/usuarios/interesados-emprende/interesados-emprende.component");
var cerrados_emprende_component_1 = require("./registers/usuarios/cerrados-emprende/cerrados-emprende.component");
var intereados_inver_component_1 = require("./registers/usuarios/intereados-inver/intereados-inver.component");
var rechazados_component_1 = require("./registers/usuarios/rechazados/rechazados.component");
var checkout_component_1 = require("./registers/usuarios/checkout/checkout.component");
var PagesModuleModule = /** @class */ (function () {
    function PagesModuleModule() {
    }
    PagesModuleModule = __decorate([
        core_1.NgModule({
            declarations: [
                dash_user_component_1.DashUserComponent,
                aceptados_component_1.AceptadosComponent,
                revision_component_1.RevisionComponent,
                favoritos_component_1.FavoritosComponent,
                notificaciones_component_1.NotificacionesComponent,
                user_component_1.UserComponent,
                admin_component_1.AdminComponent,
                negociaciones_component_1.NegociacionesComponent,
                nuevo_negocio_component_1.NuevoNegocioComponent,
                mis_negocios_component_1.MisNegociosComponent,
                interesados_emprende_component_1.InteresadosEmprendeComponent,
                cerrados_emprende_component_1.CerradosEmprendeComponent,
                intereados_inver_component_1.IntereadosInverComponent,
                rechazados_component_1.RechazadosComponent,
                pipe_negocios_pipe_1.PipeNegociosPipe,
                // MultimediaPipe,
                checkout_component_1.CheckoutComponent
            ],
            imports: [
                common_1.CommonModule,
                ngx_image_cropper_1.ImageCropperModule,
                shared_module_module_1.SharedModuleModule,
                router_1.RouterModule,
                pages_routing_module_1.PAGES_ROUTES,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                button_1.MatButtonModule,
                input_1.MatInputModule,
                select_1.MatSelectModule,
                checkbox_1.MatCheckboxModule
            ], exports: []
        })
    ], PagesModuleModule);
    return PagesModuleModule;
}());
exports.PagesModuleModule = PagesModuleModule;
