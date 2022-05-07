"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MisNegociosComponent = void 0;
var core_1 = require("@angular/core");
var sweetalert2_1 = require("sweetalert2");
var MisNegociosComponent = /** @class */ (function () {
    function MisNegociosComponent(usuarioService, proyectoService, router) {
        this.usuarioService = usuarioService;
        this.proyectoService = proyectoService;
        this.router = router;
        this.editar = false;
    }
    MisNegociosComponent.prototype.ngOnInit = function () {
        // obtener los negocios del usuario
        this.obtenerNegociosUsuario();
    };
    // obtener negocios por usuario
    MisNegociosComponent.prototype.obtenerNegociosUsuario = function () {
        var _this = this;
        var token = localStorage.getItem('token');
        this.usuarioService.decodificarToken(token).toPromise().then(function (data) {
            _this.usuarioService.obtenerNegociosUsuario(data.usuarioDBToken.usuarioDB._id).toPromise().then(function (data2) {
                _this.negocios = data2.negocioDB;
                // console.log(this.negocios);
            });
        });
    };
    // ver negocio
    MisNegociosComponent.prototype.verNegocio = function (e, idNegocio) {
        this.router.navigate(["/negocio"], { queryParams: { id: idNegocio } });
    };
    // eliminar negocio
    MisNegociosComponent.prototype.eliminarNegocio = function (e, negocio) {
        var _this = this;
        sweetalert2_1["default"].fire({
            icon: 'info',
            title: '¿Desea eliminar este negocio y todos sus registros?',
            showCancelButton: true,
            confirmButtonText: "Ok"
        }).then(function (result) {
            if (result.isConfirmed) {
                _this.proyectoService.eliminarNegocio(negocio)
                    // tslint:disable-next-line: deprecation
                    .subscribe(function (data) {
                    console.log(data);
                    // obtener todos los negocios del usuario
                    _this.obtenerNegociosUsuario();
                });
                sweetalert2_1["default"].fire('Mensaje', 'Negocio eliminado', 'success');
            }
        });
    };
    // editar negocio
    MisNegociosComponent.prototype.editarNegocio = function (e, negocio) {
        this.editar = true;
        this.negocio = negocio;
    };
    MisNegociosComponent.prototype.cerrarModal = function (e) {
        this.editar = e;
    };
    MisNegociosComponent.prototype.negociosDelUsuario = function (e) {
        if (e === true) {
            this.obtenerNegociosUsuario();
        }
    };
    MisNegociosComponent = __decorate([
        core_1.Component({
            selector: 'app-mis-negocios',
            templateUrl: './mis-negocios.component.html',
            styleUrls: ['./mis-negocios.component.css']
        })
    ], MisNegociosComponent);
    return MisNegociosComponent;
}());
exports.MisNegociosComponent = MisNegociosComponent;
