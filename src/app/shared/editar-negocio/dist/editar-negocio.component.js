"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EditarNegocioComponent = void 0;
var core_1 = require("@angular/core");
var sweetalert2_1 = require("sweetalert2");
var EditarNegocioComponent = /** @class */ (function () {
    function EditarNegocioComponent(fb, proyectoService, usuarioService) {
        this.fb = fb;
        this.proyectoService = proyectoService;
        this.usuarioService = usuarioService;
        this.editar = new core_1.EventEmitter();
        this.negociosUsuario = new core_1.EventEmitter();
        this.progress = false;
    }
    EditarNegocioComponent.prototype.ngOnInit = function () {
        this.inicializarFormulario();
    };
    EditarNegocioComponent.prototype.inicializarFormulario = function () {
        this.forma = this.fb.group({
            nombre: [this.negocio.nombre],
            descripcion: [this.negocio.descripcion],
            monto: [this.negocio.monto]
        });
    };
    EditarNegocioComponent.prototype.cerrarModal = function () {
        this.editar.emit(false);
    };
    EditarNegocioComponent.prototype.editarNegocio = function (e) {
        var _this = this;
        this.actualizaNeg = {
            nombre: this.forma.controls.nombre.value,
            descripcion: this.forma.controls.descripcion.value,
            monto: this.forma.controls.monto.value
        };
        // hacer peticion
        this.proyectoService.actualizarNegocio(this.negocio._id, this.actualizaNeg)
            // tslint:disable-next-line: deprecation
            .subscribe(function (resp) {
            if (resp.ok === false) {
                sweetalert2_1["default"].fire('Mensaje', "" + resp.mensaje, 'error');
            }
            else {
                sweetalert2_1["default"].fire('Mensaje', "" + resp.mensaje, 'info');
                _this.cerrarModal();
                _this.getNegociosUsuario();
                console.log(_this.negociosDelUsuario);
            }
        });
    };
    __decorate([
        core_1.Input()
    ], EditarNegocioComponent.prototype, "negocio");
    __decorate([
        core_1.Output()
    ], EditarNegocioComponent.prototype, "editar");
    __decorate([
        core_1.Output()
    ], EditarNegocioComponent.prototype, "negociosUsuario");
    EditarNegocioComponent = __decorate([
        core_1.Component({
            selector: 'app-editar-negocio',
            templateUrl: './editar-negocio.component.html',
            styleUrls: ['./editar-negocio.component.css']
        })
    ], EditarNegocioComponent);
    return EditarNegocioComponent;
}());
exports.EditarNegocioComponent = EditarNegocioComponent;
