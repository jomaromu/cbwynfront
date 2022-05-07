"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.CheckoutComponent = void 0;
var core_1 = require("@angular/core");
var sweetalert2_1 = require("sweetalert2");
var CheckoutComponent = /** @class */ (function () {
    function CheckoutComponent(route, proyectoService, router, usuarioService, http) {
        this.route = route;
        this.proyectoService = proyectoService;
        this.router = router;
        this.usuarioService = usuarioService;
        this.http = http;
        this.monto = 0;
        this.bandera = true;
        this.contador = 0;
        this.nuevoValor = [''];
        this.valorTarjeta = [''];
        this.valorAnio = [''];
        this.valorMes = [''];
        this.valorCVC = [''];
        this.objNombre = {
            idMensaje: 0,
            estado: false,
            mensaje: ''
        };
        this.objApellido = {
            idMensaje: 0,
            estado: false,
            mensaje: ''
        };
        this.objCodigo = {
            idMensaje: 0,
            estado: false,
            mensaje: '',
            mensajeTel: '(Opcional)'
        };
        this.objTel = {
            idMensaje: 0,
            estado: false,
            mensaje: '',
            mensajeTel: '(Opcional)'
        };
        this.objTarjeta = {
            idMensaje: 0,
            estado: false,
            mensaje: '',
            mensajeTel: '(Opcional)'
        };
        this.objMM = {
            idMensaje: 0,
            estado: false,
            mensaje: '',
            mensajeTel: '(Opcional)'
        };
        this.objYY = {
            idMensaje: 0,
            estado: false,
            mensaje: '',
            mensajeTel: '(Opcional)'
        };
        this.objCVC = {
            idMensaje: 0,
            estado: false,
            mensaje: '',
            mensajeTel: '(Opcional)'
        };
        this.objCheck = {
            idMensaje: 0,
            estado: true
        };
    }
    CheckoutComponent.prototype.ngOnInit = function () {
        this.scroll();
        this.validarCheckout();
        this.cargarCodigoTel();
    };
    CheckoutComponent.prototype.validarCheckout = function () {
        return __awaiter(this, void 0, Promise, function () {
            var statusCheck, token, _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        statusCheck = localStorage.getItem('statusCheck');
                        token = localStorage.getItem('token');
                        _a = this;
                        return [4 /*yield*/, this.usuarioService.decodificarToken(token).toPromise()];
                    case 1:
                        _a.usuario = _b.sent();
                        if (!statusCheck) {
                            this.router.navigate(['/negocios']);
                        }
                        else {
                            this.route.queryParams.subscribe(function (paramNegocio) { return __awaiter(_this, void 0, void 0, function () {
                                var negocio;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.proyectoService.obtenerNegocio(paramNegocio.negocio).toPromise()];
                                        case 1:
                                            negocio = _a.sent();
                                            if (negocio.ok === true) {
                                                this.negocio = negocio.negocioDB;
                                                // console.log(this.negocio);
                                                this.importe = this.geIimporte;
                                            }
                                            else if (negocio.ok === false) {
                                                this.router.navigate(['/negocios']);
                                                localStorage.removeItem('statusCheck');
                                            }
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(CheckoutComponent.prototype, "geIimporte", {
        get: function () {
            var monto = this.negocio.monto;
            if (monto >= 0 && monto <= 9999) {
                this.monto = 1.99;
            }
            else if (monto >= 10000 && monto <= 999999) {
                this.monto = 3.99;
            }
            else if (monto > 999999) {
                this.monto = 8.99;
            }
            // const monto = this.negocio.monto;
            // const importe = (monto * 0.001);
            return this.monto;
        },
        enumerable: false,
        configurable: true
    });
    CheckoutComponent.prototype.validaNombre = function (e) {
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
    CheckoutComponent.prototype.validaApellido = function (e) {
        var cantValue = e.length;
        if (cantValue >= 50) {
            this.objApellido.idMensaje = 1;
            this.objApellido.estado = true;
            this.objApellido.mensaje = 'Demasiados carácteres';
        }
        else if (cantValue <= 0) {
            this.objApellido.idMensaje = 2;
            this.objApellido.estado = true;
            this.objApellido.mensaje = 'El campo no debe estar vacío';
        }
        else {
            this.objApellido.estado = false;
            this.objNombre.idMensaje = 5;
        }
    };
    CheckoutComponent.prototype.validarCodigoTel = function (e, inputTel) {
        var value = e.value;
        var ubicacion = this.indicativo;
        var find = ubicacion.find(function (valor) { return valor.codigo === value; });
        if (value === 'ninguno') {
            this.objCodigo.mensajeTel = '(Opcional)';
        }
        if (value === 'ninguno' && inputTel.value.length >= 0) {
            this.objTel.estado = false;
            this.objCodigo.estado = false;
            inputTel.value = '';
        }
        if (value === 'ninguno' && inputTel.value.length <= 0) {
            this.objTel.estado = false;
            this.objCodigo.estado = false;
            this.objCodigo.idMensaje = 5;
        }
        if (!find) {
            return;
        }
        else {
            if (inputTel.value.length <= 0) {
                this.objTel.idMensaje = 1;
                this.objTel.estado = true;
                this.objCodigo.estado = false;
                this.objCodigo.mensajeTel = 'Obligatorio';
                this.objTel.mensaje = 'Escriba un número';
            }
            if (inputTel.value.length > 0) {
                this.objCodigo.estado = false;
                this.objCodigo.idMensaje = 5;
            }
        }
    };
    CheckoutComponent.prototype.validaTel = function (e, selecTCodigo) {
        var valor = e.target.value;
        var expReg = new RegExp('^[0-9]+$');
        if (expReg.test(valor) === false) {
            e.target.value = this.nuevoValor[0];
            if (valor.length <= 0 && (selecTCodigo.value !== undefined || selecTCodigo.value !== 'ninguno')) {
                this.objTel.idMensaje = 1;
                this.objTel.estado = true;
                this.objTel.mensaje = 'Escriba un número';
            }
            if (valor.length <= 0 && selecTCodigo.value === 'ninguno') {
                this.objTel.idMensaje = 5;
                this.objTel.estado = false;
                this.objCodigo.estado = false;
            }
        }
        else {
            this.nuevoValor[0] = valor;
            if (valor.length <= 1) {
                this.nuevoValor[0] = '';
            }
            if (selecTCodigo.value === undefined || selecTCodigo.value === 'ninguno') {
                this.objCodigo.idMensaje = 3;
                this.objCodigo.estado = true;
                this.objCodigo.mensaje = 'Elija un código';
            }
            if (valor.length > 0 && (selecTCodigo.value !== 'ninguno' || selecTCodigo.value !== undefined)) {
                this.objTel.idMensaje = 5;
                this.objTel.estado = false;
            }
        }
    };
    CheckoutComponent.prototype.validartarjeta = function (e) {
        var valor = e.target.value;
        var expReg = new RegExp('^[0-9]+$');
        if (expReg.test(valor) === false) {
            e.target.value = this.valorTarjeta[0];
        }
        else {
            this.valorTarjeta[0] = valor;
            if (valor.length <= 1) {
                this.valorTarjeta[0] = '';
            }
            if (valor.length > 15) {
                // e.target.value = this.valorTarjeta[0];
                var val = Array.from(this.valorTarjeta[0]);
                var recorte = val.splice(0, 16);
                var data = recorte.join('');
                e.target.value = data;
            }
            if (valor.length < 16) {
                this.objTarjeta.estado = true;
                this.objTarjeta.idMensaje = 1;
                this.objTarjeta.mensaje = 'Mínimo 16 carácteres';
            }
            if (valor.length === 16) {
                this.objTarjeta.estado = false;
            }
        }
    };
    CheckoutComponent.prototype.validarMes = function (e) {
        var valor = e.target.value;
        var expReg = new RegExp('^[0-9]+$');
        if (expReg.test(valor) === false) {
            e.target.value = this.valorMes[0];
        }
        else {
            this.valorMes[0] = valor;
            if (valor.length <= 1) {
                this.valorMes[0] = '';
            }
            if (valor.length > 2) {
                // e.target.value = this.valorMes[0];
                var val = Array.from(this.valorMes[0]);
                var recorte = val.splice(0, 2);
                var data = recorte.join('');
                e.target.value = data;
            }
            if (valor.length < 2) {
                this.objMM.estado = true;
                this.objMM.idMensaje = 1;
            }
            if (valor.length === 2) {
                this.objMM.estado = false;
            }
        }
    };
    CheckoutComponent.prototype.validarAnio = function (e) {
        var valor = e.target.value;
        var expReg = new RegExp('^[0-9]+$');
        if (expReg.test(valor) === false) {
            e.target.value = this.valorAnio[0];
        }
        else {
            this.valorAnio[0] = valor;
            if (valor.length <= 1) {
                this.valorAnio[0] = '';
            }
            if (valor.length > 4) {
                // e.target.value = this.valorAnio[0];
                var val = Array.from(this.valorAnio[0]);
                var recorte = val.splice(0, 4);
                var data = recorte.join('');
                e.target.value = data;
            }
            if (valor.length < 4) {
                this.objYY.estado = true;
                this.objYY.idMensaje = 1;
            }
            if (valor.length === 4) {
                this.objYY.estado = false;
                this.objYY.idMensaje = 1;
            }
        }
    };
    CheckoutComponent.prototype.validarCVC = function (e) {
        var valor = e.target.value;
        var expReg = new RegExp('^[0-9]+$');
        if (expReg.test(valor) === false) {
            e.target.value = this.valorCVC[0];
        }
        else {
            this.valorCVC[0] = valor;
            if (valor.length <= 1) {
                this.valorCVC[0] = '';
            }
            if (valor.length > 3) {
                // e.target.value = this.valorCVC[0];
                var val = Array.from(this.valorCVC[0]);
                var recorte = val.splice(0, 3);
                var data = recorte.join('');
                e.target.value = data;
            }
            if (valor.length < 3) {
                this.objCVC.estado = true;
                this.objCVC.idMensaje = 1;
            }
            if (valor.length === 3) {
                this.objCVC.estado = false;
            }
        }
    };
    CheckoutComponent.prototype.checkPoliticas = function (e) {
        var estadoCheck = e.target.checked;
        var aTerminos = document.getElementsByClassName('aTerminos');
        if (estadoCheck === false) {
            this.objCheck.estado = true;
            var arrayTerminos = Array.from(aTerminos);
            arrayTerminos.forEach(function (ele) {
                ele.style.color = 'tomato';
            });
        }
        if (estadoCheck === true) {
            this.objCheck.estado = false;
            this.objCheck.idMensaje = 1;
            var arrayTerminos = Array.from(aTerminos);
            arrayTerminos.forEach(function (ele) {
                ele.style.color = 'rgb(63, 63, 63)';
            });
        }
    };
    CheckoutComponent.prototype.procesarPago = function (e, negocio) {
        var _this = this;
        // ruta negocio docs
        var splitDoc = negocio.docs[0].split('\\');
        var pathNegocio = splitDoc[splitDoc.length - 2] + "/" + splitDoc[splitDoc.length - 1];
        var usuario = this.usuario.usuarioDBToken.usuarioDB;
        // console.log(this.usuario.usuarioDBToken.usuarioDB);
        // console.log(negocio);
        var objDatatUsuario = {
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            correo: usuario.correo,
            idNegocio: negocio._id,
            pathNegocio: pathNegocio,
            codigoTel: negocio.codigoTel,
            numeroTel: negocio.numeroTel
        };
        var data = new FormData();
        data.append('nombreUsuario', "" + objDatatUsuario.nombre);
        data.append('apellidoUsuario', "" + objDatatUsuario.apellido);
        data.append('correoUsuario', "" + objDatatUsuario.correo);
        data.append('idNegocio', "" + objDatatUsuario.idNegocio);
        data.append('pathNegocio', "" + objDatatUsuario.pathNegocio);
        // this.proyectoService.correoContacto(data)
        //   .subscribe(resp => {
        //     console.log(resp);
        //   });
        var aTerminos = document.getElementsByClassName('aTerminos');
        var checkPoliticas = document.getElementById('checkPoliticas');
        var checkPol = checkPoliticas.checked;
        if (this.objNombre.idMensaje === 0) {
            this.objNombre.idMensaje = 2;
            this.objNombre.estado = true;
            this.objNombre.mensaje = 'El campo no debe estar vacío';
        }
        if (this.objApellido.idMensaje === 0) {
            this.objApellido.idMensaje = 2;
            this.objApellido.estado = true;
            this.objApellido.mensaje = 'El campo no debe estar vacío';
        }
        if (this.objTarjeta.idMensaje === 0) {
            this.objTarjeta.idMensaje = 1;
            this.objTarjeta.estado = true;
            this.objTarjeta.mensaje = 'Mínimo 16 carácteres';
        }
        if (this.objMM.idMensaje === 0) {
            this.objMM.idMensaje = 1;
            this.objMM.estado = true;
        }
        if (this.objYY.idMensaje === 0) {
            this.objYY.idMensaje = 1;
            this.objYY.estado = true;
        }
        if (this.objCVC.idMensaje === 0) {
            this.objCVC.idMensaje = 1;
            this.objCVC.estado = true;
        }
        if (checkPol === true) {
            var arrayTerminos = Array.from(aTerminos);
            arrayTerminos.forEach(function (ele) {
                ele.style.color = 'rgb(63, 63, 63)';
            });
        }
        else {
            var arrayTerminos = Array.from(aTerminos);
            arrayTerminos.forEach(function (ele) {
                ele.style.color = 'tomato';
            });
        }
        if (this.objNombre.estado === false &&
            this.objApellido.estado === false &&
            this.objCodigo.estado === false &&
            this.objTel.estado === false &&
            this.objTarjeta.estado === false &&
            this.objMM.estado === false &&
            this.objYY.estado === false &&
            this.objCVC.estado === false &&
            this.objCheck.estado === false) {
            // console.log('ok');
            // const data = new FormData();
            // mensaje temporal (quitar cuando existan las apis)
            sweetalert2_1["default"].fire({
                title: "En estos momentos no podemos procesar pagos, sin embargo puede contactarnos a trav\u00E9s del formulario de contacto",
                showDenyButton: false,
                showCancelButton: true,
                confirmButtonText: "Formulario de contacto",
                cancelButtonText: 'Regresar'
            }).then(function (result) {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    _this.router.navigate(['/contacto']);
                }
                else if (result.isDenied) {
                    return;
                }
            });
        }
    };
    CheckoutComponent.prototype.cargarCodigoTel = function () {
        var _this = this;
        var url = "../../../../../assets/json/ubicacion.json";
        this.http.get(url).subscribe(function (data) {
            _this.indicativo = data;
            // console.log(this.indicativo);
        });
    };
    CheckoutComponent.prototype.scroll = function () {
        window.scroll(0, 0);
    };
    __decorate([
        core_1.ViewChild('codigo', { static: false })
    ], CheckoutComponent.prototype, "codigo");
    CheckoutComponent = __decorate([
        core_1.Component({
            selector: 'app-checkout',
            templateUrl: './checkout.component.html',
            styleUrls: ['./checkout.component.css']
        })
    ], CheckoutComponent);
    return CheckoutComponent;
}());
exports.CheckoutComponent = CheckoutComponent;
