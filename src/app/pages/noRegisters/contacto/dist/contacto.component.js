"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ContactoComponent = void 0;
var core_1 = require("@angular/core");
var sweetalert2_1 = require("sweetalert2");
var ContactoComponent = /** @class */ (function () {
    function ContactoComponent(breakPointObserver, proyectoService) {
        this.breakPointObserver = breakPointObserver;
        this.proyectoService = proyectoService;
        this.objNombre = {
            idMensaje: 0,
            estado: false,
            mensaje: ''
        };
        this.objCorreo = {
            idMensaje: 0,
            estado: false,
            mensaje: ''
        };
        this.objMensaje = {
            idMensaje: 0,
            estado: false,
            mensaje: ''
        };
    }
    ContactoComponent.prototype.ngOnInit = function () {
        this.paddingTop();
    };
    ContactoComponent.prototype.paddingTop = function () {
        var paddingTop = document.getElementById('paddingTop');
        paddingTop.style.display = 'none';
        // setInterval(() => {
        //   this.breakPointObserver.observe(['(max-width: 1400px)'])
        //     .subscribe((state: BreakpointState) => {
        //       const wrapContact = document.getElementById('wrapContact');
        //       if (state.matches) {
        //         wrapContact.style.height = `${window.innerHeight - 70}px`;
        //       }
        //       wrapContact.style.height = `${window.innerHeight - 70}px`;
        //     });
        // }, 300);
    };
    ContactoComponent.prototype.validaNombre = function (e) {
        var cantValue = e.length;
        if (cantValue >= 50) {
            this.objNombre.idMensaje = 1;
            this.objNombre.estado = true;
            this.objNombre.mensaje = 'Demasiados carácteres';
        }
        else if (cantValue <= 0) {
            this.objNombre.idMensaje = 2;
            this.objNombre.estado = true;
            this.objNombre.mensaje = 'El campo no debe estar vacío';
        }
        else {
            this.objNombre.estado = false;
            this.objNombre.idMensaje = 5;
        }
    };
    ContactoComponent.prototype.validaCorreo = function (e) {
        var cantValue = e.length;
        var pathReg = new RegExp('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$');
        if (cantValue >= 50) {
            this.objCorreo.idMensaje = 1;
            this.objCorreo.estado = true;
            this.objCorreo.mensaje = 'Demasiados carácteres';
        }
        else if (cantValue <= 0) {
            this.objCorreo.idMensaje = 2;
            this.objCorreo.estado = true;
            this.objCorreo.mensaje = 'El campo no debe estar vacío';
        }
        else if (cantValue > 0 && cantValue <= 50) {
            var esCorreo = pathReg.test(e.toLowerCase());
            if (esCorreo === true) {
                this.objCorreo.estado = false;
                this.objCorreo.idMensaje = 5;
            }
            else {
                this.objCorreo.estado = true;
                this.objCorreo.idMensaje = 3;
                this.objCorreo.mensaje = "Correo invalido";
            }
        }
    };
    ContactoComponent.prototype.validarMensaje = function (e) {
        var cantValue = e.length;
        if (cantValue >= 300) {
            this.objMensaje.idMensaje = 1;
            this.objMensaje.estado = true;
            this.objMensaje.mensaje = 'Demasiados carácteres';
        }
        else if (cantValue <= 0) {
            this.objMensaje.idMensaje = 2;
            this.objMensaje.estado = true;
            this.objMensaje.mensaje = 'El campo no debe estar vacío';
        }
        else {
            this.objMensaje.estado = false;
            this.objMensaje.idMensaje = 5;
        }
    };
    ContactoComponent.prototype.enviarMensaje = function (e) {
        if (this.objNombre.idMensaje === 0) {
            this.objNombre.idMensaje = 2;
            this.objNombre.estado = true;
            this.objNombre.mensaje = 'El campo no debe estar vacío';
        }
        if (this.objCorreo.idMensaje === 0) {
            this.objCorreo.idMensaje = 2;
            this.objCorreo.estado = true;
            this.objCorreo.mensaje = 'El campo no debe estar vacío';
        }
        if (this.objMensaje.idMensaje === 0) {
            this.objMensaje.idMensaje = 2;
            this.objMensaje.estado = true;
            this.objMensaje.mensaje = 'El campo no debe estar vacío';
        }
        if (this.objNombre.estado === false &&
            this.objCorreo.estado === false &&
            this.objMensaje.estado === false) {
            var data = new FormData();
            var nombre_1 = this.nombre.nativeElement;
            var correo_1 = this.correo.nativeElement;
            var mensaje_1 = this.mensaje.nativeElement;
            data.append('nombre', "" + nombre_1.value);
            data.append('correo', "" + correo_1.value.toLowerCase());
            data.append('mensaje', "" + mensaje_1.value);
            var body = document.body;
            var fondo_1 = document.createElement('div');
            var loading = document.createElement('img');
            fondo_1.style.position = 'fixed';
            fondo_1.style.top = '0px';
            fondo_1.style.left = '0px';
            fondo_1.style.width = '100vw';
            fondo_1.style.height = '100vh';
            fondo_1.style.display = 'flex';
            fondo_1.style.justifyContent = 'center';
            fondo_1.style.alignItems = 'center';
            fondo_1.style.backgroundColor = 'rgba(199, 199, 199, 0.3)';
            fondo_1.style.zIndex = '9999';
            loading.setAttribute('src', '../../../../assets/img/loading.gif');
            loading.style.width = '70px';
            fondo_1.append(loading);
            body.append(fondo_1);
            setInterval(function () {
                fondo_1.style.width = '100vw';
                fondo_1.style.height = '100vh';
            }, 300);
            this.proyectoService.correoPlataforma(data)
                .subscribe(function (resp) {
                if (resp.ok === true) {
                    fondo_1.style.display = 'none';
                    setTimeout(function () {
                        sweetalert2_1["default"].fire('Mensaje', 'Gracias por su mensaje, muy pronto nos pondremos en contacto con usted', 'info');
                    }, 300);
                    nombre_1.value = '';
                    correo_1.value = '';
                    mensaje_1.value = '';
                }
                if (resp.ok === false) {
                    fondo_1.style.display = 'none';
                    setTimeout(function () {
                        sweetalert2_1["default"].fire('Mensaje', 'Parece que hay un error, intentelo más tarde', 'error');
                    }, 300);
                    nombre_1.value = '';
                    correo_1.value = '';
                    mensaje_1.value = '';
                }
            });
        }
    };
    __decorate([
        core_1.ViewChild('nombre', { static: true })
    ], ContactoComponent.prototype, "nombre");
    __decorate([
        core_1.ViewChild('correo', { static: true })
    ], ContactoComponent.prototype, "correo");
    __decorate([
        core_1.ViewChild('mensaje', { static: true })
    ], ContactoComponent.prototype, "mensaje");
    ContactoComponent = __decorate([
        core_1.Component({
            selector: 'app-contacto',
            templateUrl: './contacto.component.html',
            styleUrls: ['./contacto.component.css']
        })
    ], ContactoComponent);
    return ContactoComponent;
}());
exports.ContactoComponent = ContactoComponent;
