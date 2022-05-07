"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SharedModuleModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
// angular material
var tree_1 = require("@angular/material/tree");
var icon_1 = require("@angular/material/icon");
var input_1 = require("@angular/material/input");
var button_1 = require("@angular/material/button");
var progress_bar_1 = require("@angular/material/progress-bar");
// componentes
var navbar_component_1 = require("./navbar/navbar.component");
var banner_component_1 = require("./banner/banner.component");
var no_found_component_1 = require("./no-found/no-found.component");
var sidebar_component_1 = require("./sidebar/sidebar.component");
var perfil_component_1 = require("./perfil/perfil.component");
var footer_component_1 = require("./footer/footer.component");
var no_stok_component_1 = require("./no-stok/no-stok.component");
var editar_negocio_component_1 = require("./editar-negocio/editar-negocio.component");
var tabla_fav_component_1 = require("./tabla-fav/tabla-fav.component");
// pipes
var pipe_trim_pipe_1 = require("../pipes/pipe-trim.pipe");
var multimedia_pipe_1 = require("../pipes/multimedia.pipe");
// cropper
var ngx_image_cropper_1 = require("ngx-image-cropper");
var SharedModuleModule = /** @class */ (function () {
    function SharedModuleModule() {
    }
    SharedModuleModule = __decorate([
        core_1.NgModule({
            declarations: [
                pipe_trim_pipe_1.PipeTrimPipe,
                navbar_component_1.NavbarComponent,
                banner_component_1.BannerComponent,
                no_found_component_1.NoFoundComponent,
                sidebar_component_1.SidebarComponent,
                perfil_component_1.PerfilComponent,
                footer_component_1.FooterComponent,
                no_stok_component_1.NoStokComponent,
                editar_negocio_component_1.EditarNegocioComponent,
                tabla_fav_component_1.TablaFavComponent,
                multimedia_pipe_1.MultimediaPipe
            ],
            imports: [
                common_1.CommonModule,
                router_1.RouterModule,
                tree_1.MatTreeModule,
                icon_1.MatIconModule,
                input_1.MatInputModule,
                button_1.MatButtonModule,
                progress_bar_1.MatProgressBarModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                ngx_image_cropper_1.ImageCropperModule
            ],
            exports: [
                navbar_component_1.NavbarComponent,
                banner_component_1.BannerComponent,
                no_found_component_1.NoFoundComponent,
                sidebar_component_1.SidebarComponent,
                perfil_component_1.PerfilComponent,
                footer_component_1.FooterComponent,
                no_stok_component_1.NoStokComponent,
                editar_negocio_component_1.EditarNegocioComponent,
                tabla_fav_component_1.TablaFavComponent,
                multimedia_pipe_1.MultimediaPipe
            ]
        })
    ], SharedModuleModule);
    return SharedModuleModule;
}());
exports.SharedModuleModule = SharedModuleModule;
