"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserComponent = void 0;
var core_1 = require("@angular/core");
var environment_1 = require("../../../../environments/environment");
var UserComponent = /** @class */ (function () {
    function UserComponent() {
        this.itemSidebar = [];
    }
    UserComponent.prototype.ngOnInit = function () {
        this.logo = environment_1.environment.logo;
        this.items();
        this.rutaPrincipal = '/user-dashboard/dashboard';
    };
    UserComponent.prototype.items = function () {
        this.itemSidebar.push({
            icono: 'nav-icon fas fa-chart-line',
            nombre: 'Panel de control',
            routerlink: '/user-dashboard/dashboard',
            span: false
        }, {
            icono: 'nav-icon fas fa-user-alt',
            nombre: 'Emprendedor',
            routerlink: '/user-dashboard/nuevo',
            span: false,
            row: true,
            itemsThree: [
                {
                    icono: 'nav-icon fas fa-plus',
                    nombre: 'Nuevo negocio',
                    routerlink: '/user-dashboard/nuevo',
                    span: false
                },
                {
                    icono: 'nav-icon fas fa-building',
                    nombre: 'Mis negocios',
                    routerlink: '/user-dashboard/mis-negocios',
                    span: false
                },
                {
                    icono: 'nav-icon fas fa-handshake',
                    nombre: 'Negociaciones',
                    routerlink: '/user-dashboard/interesados',
                    span: false,
                    row: true,
                    itemsThree: [
                        // {
                        //   icono: 'nav-icon fas fa-dollar-sign',
                        //   nombre: 'Interesados',
                        //   routerlink: '/user-dashboard/interesados',
                        //   span: false,
                        // },
                        {
                            icono: 'nav-icon fas fa-store-slash',
                            nombre: 'Cerrados',
                            routerlink: '/user-dashboard/cerrados',
                            span: false
                        }
                    ]
                },
            ]
        }, {
            icono: 'nav-icon fas fa-user-tie',
            nombre: 'Inversionista',
            routerlink: '/user-dashboard/aceptados',
            span: false,
            row: true,
            itemsThree: [
                // {
                //   icono: 'nav-icon fas fa-check-double',
                //   nombre: 'Aceptados',
                //   routerlink: '/user-dashboard/aceptados',
                //   span: false
                // },
                // {
                //   icono: 'nav-icon fas fa-eye',
                //   nombre: 'En revisión',
                //   routerlink: '/user-dashboard/revision',
                //   span: false
                // },
                {
                    icono: 'nav-icon fas fa-heart',
                    nombre: 'Favoritos',
                    routerlink: '/user-dashboard/favoritos',
                    span: false
                },
                {
                    icono: 'nav-icon fas fa-heart',
                    nombre: 'Cerrados',
                    routerlink: '/user-dashboard/favoritos',
                    span: false
                },
            ]
        });
    };
    UserComponent = __decorate([
        core_1.Component({
            selector: 'app-user',
            templateUrl: './user.component.html',
            styleUrls: ['./user.component.css']
        })
    ], UserComponent);
    return UserComponent;
}());
exports.UserComponent = UserComponent;
