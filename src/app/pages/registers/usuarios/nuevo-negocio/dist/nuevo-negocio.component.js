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
exports.NuevoNegocioComponent = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var validator_1 = require("validator");
var sweetalert2_1 = require("sweetalert2");
var NuevoNegocioComponent = /** @class */ (function () {
    function NuevoNegocioComponent(http, sanitizer, proyectoService, usuarioService, router) {
        this.http = http;
        this.sanitizer = sanitizer;
        this.proyectoService = proyectoService;
        this.usuarioService = usuarioService;
        this.router = router;
        this.croppedImg = '';
        this.croppedLogo = '';
        this.croppedPortada = '';
        this.croppedImg1 = '';
        this.croppedImg2 = '';
        this.croppedImg3 = '';
        this.thumbVideo = '';
        this.archivos = '';
        this.croppedSrc = '';
        this.currentTab = 0;
        this.objTipoNeg = [
            {
                nombre: 'Inversión',
                value: 'inn'
            },
            {
                nombre: 'Compra Venta',
                value: 'cmv'
            },
            {
                nombre: 'Sociedad',
                value: 'soc'
            },
            {
                nombre: 'Préstamo',
                value: 'inver'
            }
        ];
        this.objTiempoNeg = [
            {
                nombre: 'Corto plazo',
                value: 'cp'
            },
            {
                nombre: 'Mediano plazo',
                value: 'mp'
            },
            {
                nombre: 'Largo plazo',
                value: 'lp'
            }
        ];
        this.validaNombre = {
            mensaje: '',
            ok: null,
            valor: null
        };
        this.validaDescripcion = {
            mensaje: null,
            ok: null,
            valor: null
        };
        this.validaTipoNeg = {
            mensaje: null,
            ok: null,
            valor: null
        };
        this.validaTiempoNeg = {
            mensaje: null,
            ok: null,
            valor: null
        };
        this.validaMonto = {
            mensaje: null,
            ok: null,
            valor: null
        };
        this.validaCat = {
            mensaje: null,
            ok: null,
            valor: null
        };
        this.validaUb = {
            mensaje: null,
            ok: null,
            valor: null
        };
        this.validaUt = {
            mensaje: null,
            ok: null,
            valor: null
        };
        this.validaReg = {
            mensaje: null,
            ok: null,
            valor: null
        };
        this.validaGarant = {
            mensaje: null,
            ok: null,
            valor: null
        };
        this.otrasNeg = {
            mensaje: null,
            ok: null,
            valor: null
        };
        this.validaLogo = {
            mensaje: null,
            ok: null,
            valor: null
        };
        this.validaPortada = {
            mensaje: null,
            ok: null,
            valor: null
        };
        this.validaImg1 = {
            mensaje: null,
            ok: null,
            valor: null
        };
        this.validaImg2 = {
            mensaje: null,
            ok: null,
            valor: null
        };
        this.validaImg3 = {
            mensaje: null,
            ok: null,
            valor: null
        };
        this.validaVideo = {
            mensaje: null,
            ok: null,
            valor: null
        };
        this.validaArchivos = {
            mensaje: null,
            ok: null,
            valor: null
        };
        this.validaTelefono = {
            mensaje: null,
            ok: null,
            valor: null
        };
        this.validaCodigo = {
            mensaje: null,
            ok: null,
            valor: null
        };
        this.validaPagWeb = {
            mensaje: null,
            ok: null,
            valor: null
        };
    }
    NuevoNegocioComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.smartWizard();
        // llamar las categorias
        this.http.get('../../../../../assets/json/categoria.json')
            // tslint:disable-next-line: deprecation
            .subscribe(function (data) {
            _this.categorias = data;
        });
        // llamar a las ubicaciones
        this.http.get('../../../../../assets/json/ubicacion.json')
            // tslint:disable-next-line: deprecation
            .subscribe(function (data) {
            _this.ubicaciones = data;
        });
    };
    // smartWizard
    NuevoNegocioComponent.prototype.smartWizard = function () {
        this.showTab(this.currentTab);
    };
    // mostrar los tabs
    NuevoNegocioComponent.prototype.showTab = function (currenTab) {
        var btnAtras = document.getElementById('btnAtras');
        var btnSiguiente = document.getElementById('btnSiguiente');
        var btnSubmit = document.getElementById('btnSubmit');
        // array de todos los tabs
        var arrayTabs = document.getElementsByClassName('tabs');
        // mostrar el tab actual
        arrayTabs[currenTab].style.display = 'block';
        // ocultar el boton de atras si estamos en el primer tab
        if (currenTab === 0) {
            btnAtras.style.display = 'none';
        }
        else {
            btnAtras.style.display = 'inline';
        }
        // si llega al final quitar boton siguiente y mostrar el de submit
        if (currenTab === (arrayTabs.length - 1)) {
            btnSiguiente.style.display = 'none';
            btnSubmit.style.display = 'inline';
        }
        else {
            btnSubmit.style.display = 'none';
            btnSiguiente.style.display = 'inline';
        }
    };
    // validar nombre
    NuevoNegocioComponent.prototype.validarNombre = function (e) {
        var value = e.target.value;
        var valor = Array.from(value);
        if (valor.length < 2 || valor.length > 50) {
            this.validaNombre.ok = false;
            this.validaNombre.mensaje = 'Mínimo 2, máximo 50 carácteres';
        }
        else {
            this.validaNombre.ok = true;
            this.validaNombre.valor = value;
        }
    };
    // validar descripcion del negocio
    NuevoNegocioComponent.prototype.validarDesc = function (e) {
        var value = e.target.value;
        var valor = Array.from(value);
        if (valor.length < 2 || valor.length > 1000) {
            this.validaDescripcion.ok = false;
            this.validaDescripcion.mensaje = 'Mínimo 2, máximo 1000 carácteres';
        }
        else {
            this.validaDescripcion.ok = true;
            this.validaDescripcion.valor = value;
        }
    };
    // validar tipo de negocio
    NuevoNegocioComponent.prototype.validarTipo = function (e) {
        var value = e.value;
        var find = this.objTipoNeg.find(function (valor) { return valor.value === value; });
        if (!find) {
            this.validaTipoNeg.ok = false;
            this.validaTipoNeg.mensaje = 'Elija una opción de la lista';
        }
        else {
            this.validaTipoNeg.ok = true;
            this.validaTipoNeg.valor = find.nombre;
        }
    };
    // validar tiempo
    NuevoNegocioComponent.prototype.validarTiempo = function (e) {
        var value = e.value;
        var find = this.objTiempoNeg.find(function (valor) { return valor.value === value; });
        if (!find) {
            this.validaTiempoNeg.ok = false;
            this.validaTiempoNeg.mensaje = 'Elija una opción de la lista';
        }
        else {
            this.validaTiempoNeg.ok = true;
            this.validaTiempoNeg.valor = find.nombre;
        }
    };
    // validacion del monto
    NuevoNegocioComponent.prototype.validarMonto = function (e) {
        var valor = e.target.value;
        if (valor <= 0) {
            this.validaMonto.ok = false;
            this.validaMonto.mensaje = 'Ingrese un monto';
        }
        else {
            if (isNaN(Number(valor))) {
                this.validaMonto.mensaje = 'Debe escribir sólo números';
            }
            else {
                // const newValor = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'USD' }).format(Number(valor));
                // const newValor = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'USD' }).format(valor);
                // console.log(newValor);
                var newValor = Number(valor);
                this.validaMonto.ok = true;
                this.validaMonto.valor = newValor;
            }
        }
    };
    // validar select de categorias
    NuevoNegocioComponent.prototype.validarCategoria = function (e) {
        var value = e.value;
        var categoria = this.categorias;
        var find = categoria.find(function (valor) { return valor.codigo === value; });
        if (!find) {
            this.validaCat.ok = false;
            this.validaCat.mensaje = 'Elija una opción de la lista';
        }
        else {
            this.validaCat.ok = true;
            this.validaCat.valor = find.nombre;
        }
    };
    // validar select de ubicacion
    NuevoNegocioComponent.prototype.validarUbicacion = function (e) {
        var value = e.value;
        var ubicacion = this.ubicaciones;
        var find = ubicacion.find(function (valor) { return valor.codigo === value; });
        if (!find) {
            this.validaUb.ok = false;
            this.validaUb.mensaje = 'Elija una opción de la lista';
        }
        else {
            this.validaUb.ok = true;
            this.validaUb.valor = find.nombre;
        }
    };
    // validar utilidad
    NuevoNegocioComponent.prototype.validarUtilidad = function (e) {
        var valor = e.target.value;
        if (valor <= 0) {
            this.validaUt.ok = false;
            this.validaUt.mensaje = 'Ingrese un monto';
        }
        else {
            if (isNaN(Number(valor))) {
                this.validaUt.mensaje = 'Debe escribir sólo números';
            }
            else {
                var newValor = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'USD' }).format(Number(valor));
                this.validaUt.ok = true;
                this.validaUt.valor = newValor;
            }
        }
    };
    // validar tiempo de retorno
    NuevoNegocioComponent.prototype.validarRegreso = function (e) {
        var valor = e.target.value;
        var value = validator_1["default"].isDecimal(valor.toString(), { force_decimal: true, locale: 'en-US' });
        if (valor <= 0) {
            this.validaReg.ok = false;
            this.validaReg.mensaje = 'Ingrese cantidad de meses';
        }
        else {
            if (value === true) {
                this.validaReg.ok = false;
                this.validaReg.mensaje = 'Ingrese sólo números';
            }
            else {
                this.validaReg.ok = true;
                this.validaReg.valor = valor;
            }
        }
    };
    // validaar garantia
    NuevoNegocioComponent.prototype.validarGarantia = function (e) {
        var value = e.target.value;
        var valor = Array.from(value);
        if (valor.length < 2 || valor.length > 100) {
            this.validaGarant.ok = false;
            this.validaGarant.mensaje = 'Mínimo 2, máximo 100 carácteres';
        }
        else {
            this.validaGarant.ok = true;
            this.validaGarant.valor = value;
        }
    };
    // otras
    NuevoNegocioComponent.prototype.otros = function (e) {
        var value = e.target.value;
        var valor = Array.from(value);
        this.otrasNeg.ok = true;
        this.otrasNeg.valor = value;
    };
    // validaciones por parte de nexPrev
    NuevoNegocioComponent.prototype.validaNexPrev = function () {
        if (!this.validaNombre.ok) {
            this.validaNombre.ok = false;
            this.validaNombre.mensaje = 'Mínimo 2, máximo 50 carácteres';
        }
        if (!this.validaDescripcion.ok) {
            this.validaDescripcion.ok = false;
            this.validaDescripcion.mensaje = 'Mínimo 2, máximo 1000 carácteres';
        }
        if (!this.validaTipoNeg.ok) {
            this.validaTipoNeg.ok = false;
            this.validaTipoNeg.mensaje = 'Elija una opción de la lista';
        }
        if (!this.validaTiempoNeg.ok) {
            this.validaTiempoNeg.ok = false;
            this.validaTiempoNeg.mensaje = 'Elija una opción de la lista';
        }
        if (!this.validaMonto.ok) {
            this.validaMonto.ok = false;
            this.validaMonto.mensaje = 'Ingrese un monto';
        }
        if (!this.validaCat.ok) {
            this.validaCat.ok = false;
            this.validaCat.mensaje = 'Elija una opción de la lista';
        }
        if (!this.validaUb.ok) {
            this.validaUb.ok = false;
            this.validaUb.mensaje = 'Elija una opción de la lista';
        }
        if (!this.validaUt.ok) {
            this.validaUt.ok = false;
            this.validaUt.mensaje = 'Ingrese un monto';
        }
        if (!this.validaReg.ok) {
            this.validaReg.ok = false;
            this.validaReg.mensaje = 'Ingrese cantidad de meses';
        }
        if (!this.validaGarant.ok) {
            this.validaGarant.ok = false;
            this.validaGarant.mensaje = 'Bienes o fondos que respalden la negociación';
        }
        this.otrasNeg.ok = true;
        this.validaPagWeb.ok = true;
        this.validaLogo.ok = true;
        this.validaPortada.ok = true;
        this.validaImg1.ok = true;
        this.validaImg2.ok = true;
        this.validaImg3.ok = true;
        this.validaVideo.ok = true;
        if (!this.validaArchivos.ok) {
            this.validaArchivos.ok = false;
        }
        if (!this.validaTelefono.ok) {
            this.validaTelefono.ok = false;
        }
        var telefono = document.getElementById('telefono');
        if (!telefono.value) {
            this.validaTelefono.ok = false;
            this.validaTelefono.mensaje = 'Debe ingresar un número';
        }
        if (isNaN(telefono.value)) {
            this.validaTelefono.ok = false;
            this.validaTelefono.mensaje = 'Debe ingresar un número';
        }
        if (!this.validaCodigo.ok) {
            this.validaCodigo.ok = false;
            this.validaCodigo.mensaje = 'Elija una opción de la lista';
        }
    };
    // convertir base64 en file
    NuevoNegocioComponent.prototype.convertBase64ToFile = function (url, filename, mime) {
        mime = mime || (url.match(/^data:([^;]+);/) || '')[1];
        return (fetch(url)
            .then(function (res) { return res.arrayBuffer(); })
            .then(function (buf) { return new File([buf], filename, { type: mime }); }));
    };
    // ========================== CROP ========================== //
    // cierra la ventana del crop
    NuevoNegocioComponent.prototype.cerrarCropper = function () {
        var fondoNegro = this.fondoNegro.nativeElement;
        fondoNegro.style.display = 'none';
    };
    // guarda los crops
    NuevoNegocioComponent.prototype.imageCropped = function (e) {
        this.croppedImg = e.base64;
    };
    // boton para recortar los crops
    NuevoNegocioComponent.prototype.recotarImg = function (divImgCroppeImg, tipoImg, fondoNegro, validarImg, imgSrc) {
        // const divImgCroppedLogo = document.getElementById('divImgCroppedLogo');
        // const fondoNegro = document.getElementById('fondoNegro');
        var _this = this;
        divImgCroppeImg.style.display = 'flex';
        fondoNegro.style.display = 'none';
        // guardar la imagen recortada
        if (this.croppedImg !== '') {
            // convetir base64 a file
            this.convertBase64ToFile(this.croppedImg, "" + tipoImg, 'png')
                .then(function (file) {
                switch (imgSrc) {
                    case 'logo':
                        _this.croppedLogo = _this.croppedImg;
                        if (!_this.validaLogo.valor) {
                            // enviar el avatar
                        }
                        else {
                            _this.validaLogo.valor = file;
                        }
                        break;
                    case 'portada':
                        _this.croppedPortada = _this.croppedImg;
                        if (!_this.validaPortada.valor) {
                            // enviar el avatar
                        }
                        else {
                            _this.validaPortada.valor = file;
                        }
                        break;
                    case 'img1':
                        _this.croppedImg1 = _this.croppedImg;
                        if (!_this.validaImg1.valor) {
                            // enviar el avatar
                        }
                        else {
                            _this.validaImg1.valor = file;
                        }
                        break;
                    case 'img2':
                        _this.croppedImg2 = _this.croppedImg;
                        if (!_this.validaImg2.valor) {
                            // enviar el avatar
                        }
                        else {
                            _this.validaImg2.valor = file;
                        }
                        break;
                    case 'img3':
                        _this.croppedImg3 = _this.croppedImg;
                        if (!_this.validaImg3.valor) {
                            // enviar el avatar
                        }
                        else {
                            _this.validaImg3.valor = file;
                        }
                        break;
                }
                validarImg.valor = file; // guardar el archivo en el valor de valida....
            })["catch"](function (err) { return console.log(err); });
        }
    };
    // ========================== TERMINA CROP ========================== //
    // ========================== LOGO ========================== //
    NuevoNegocioComponent.prototype.manejaLogo = function (e) {
        var _this = this;
        var originalFiles = e.target.files[0];
        this.radioImg = 1 / 1;
        var fondoNegro = document.getElementById('fondoNegro');
        var divImgCroppedLogo = document.getElementById('divImgCroppedLogo');
        // verificar que viene una imagen
        if (originalFiles) {
            // validar los mimetypes
            if (originalFiles.type !== 'image/jpeg' && originalFiles.type !== 'image/jpg' && originalFiles.type !== 'image/png') {
                this.validaLogo.ok = false;
                this.validaLogo.valor = null; // poner el avatar
                this.validaLogo.mensaje = 'Permitidos(jpg, png jpeg)';
                // quitar la imagen thumb
                divImgCroppedLogo.style.display = 'none';
                return;
            }
            else {
                this.imageChangedEvent = e; // cargar el crop con la imagen
                this.validaLogo.ok = true;
                // cargar boton recortar
                var btnRecortar = document.getElementById('btnRecortar');
                btnRecortar.style.display = 'block';
                btnRecortar.addEventListener('click', function (evt) {
                    _this.recotarImg(divImgCroppedLogo, 'logo', fondoNegro, _this.validaLogo, 'logo');
                }, { once: true });
            }
        }
        // si no hay cambios o nada cargado
        if (!originalFiles) {
            return;
        }
        fondoNegro.style.display = 'flex';
    };
    // ========================== TERMINA LOGO ========================== //
    // ========================== IMG1 ========================== //
    NuevoNegocioComponent.prototype.manejaImg1 = function (e) {
        var _this = this;
        var originalFiles = e.target.files[0];
        this.radioImg = 16 / 9;
        var fondoNegro = document.getElementById('fondoNegro');
        var divImgCroppedImg1 = document.getElementById('divImgCroppedImg1');
        // verificar que viene una imagen
        if (originalFiles) {
            // validar los mimetypes
            if (originalFiles.type !== 'image/jpeg' && originalFiles.type !== 'image/jpg' && originalFiles.type !== 'image/png') {
                this.validaImg1.ok = false;
                this.validaImg1.valor = null; // poner el avatar
                this.validaImg1.mensaje = 'Permitidos(jpg, png jpeg)';
                // quitar la imagen thumb
                divImgCroppedImg1.style.display = 'none';
                return;
            }
            else {
                this.imageChangedEvent = e; // cargar el crop con la imagen
                this.validaImg1.ok = true;
                // cargar boton recortar
                var btnRecortar = document.getElementById('btnRecortar');
                btnRecortar.style.display = 'block';
                btnRecortar.addEventListener('click', function (evt) {
                    _this.recotarImg(divImgCroppedImg1, 'img1', fondoNegro, _this.validaImg1, 'img1');
                }, { once: true });
            }
        }
        // si no hay cambios o nada cargado
        if (!originalFiles) {
            return;
        }
        fondoNegro.style.display = 'flex';
    };
    // ========================== TERMINA IMG1 ========================== //
    // ========================== IMG2 ========================== //
    NuevoNegocioComponent.prototype.manejaImg2 = function (e) {
        var _this = this;
        var originalFiles = e.target.files[0];
        this.radioImg = 16 / 9;
        var fondoNegro = document.getElementById('fondoNegro');
        var divImgCroppedImg2 = document.getElementById('divImgCroppedImg2');
        // verificar que viene una imagen
        if (originalFiles) {
            // validar los mimetypes
            if (originalFiles.type !== 'image/jpeg' && originalFiles.type !== 'image/jpg' && originalFiles.type !== 'image/png') {
                this.validaImg2.ok = false;
                this.validaImg2.valor = null; // poner el avatar
                this.validaImg2.mensaje = 'Permitidos(jpg, png jpeg)';
                // quitar la imagen thumb
                divImgCroppedImg2.style.display = 'none';
                return;
            }
            else {
                this.imageChangedEvent = e; // cargar el crop con la imagen
                this.validaImg2.ok = true;
                // cargar boton recortar
                var btnRecortar = document.getElementById('btnRecortar');
                btnRecortar.style.display = 'block';
                btnRecortar.addEventListener('click', function (evt) {
                    _this.recotarImg(divImgCroppedImg2, 'img2', fondoNegro, _this.validaImg2, 'img2');
                }, { once: true });
            }
        }
        // si no hay cambios o nada cargado
        if (!originalFiles) {
            return;
        }
        fondoNegro.style.display = 'flex';
    };
    // ========================== TERMINA IMG2 ========================== //
    // ========================== IMG3 ========================== //
    NuevoNegocioComponent.prototype.manejaImg3 = function (e) {
        var _this = this;
        var originalFiles = e.target.files[0];
        this.radioImg = 16 / 9;
        var fondoNegro = document.getElementById('fondoNegro');
        var divImgCroppedImg3 = document.getElementById('divImgCroppedImg3');
        // verificar que viene una imagen
        if (originalFiles) {
            // validar los mimetypes
            if (originalFiles.type !== 'image/jpeg' && originalFiles.type !== 'image/jpg' && originalFiles.type !== 'image/png') {
                this.validaImg3.ok = false;
                this.validaImg3.valor = null; // poner el avatar
                this.validaImg3.mensaje = 'Permitidos(jpg, png jpeg)';
                // quitar la imagen thumb
                divImgCroppedImg3.style.display = 'none';
                return;
            }
            else {
                this.imageChangedEvent = e; // cargar el crop con la imagen
                this.validaImg3.ok = true;
                // cargar boton recortar
                var btnRecortar = document.getElementById('btnRecortar');
                btnRecortar.style.display = 'block';
                btnRecortar.addEventListener('click', function (evt) {
                    _this.recotarImg(divImgCroppedImg3, 'img3', fondoNegro, _this.validaImg3, 'img3');
                }, { once: true });
            }
        }
        // si no hay cambios o nada cargado
        if (!originalFiles) {
            return;
        }
        fondoNegro.style.display = 'flex';
    };
    // ========================== TERMINA IMG3 ========================== //
    // ========================== VIDEO ========================== //
    NuevoNegocioComponent.prototype.manejaVideo = function (e) {
        var _this = this;
        var originalFiles = e.target.files[0];
        var fondoNegro = document.getElementById('fondoNegro');
        var divVideo = document.getElementById('divVideo');
        var videoTag = document.getElementById('video');
        var subirVideo = document.getElementById('subirVideo');
        var tiempo = 0;
        // si el tiempo es mayor a 60 segundos
        setTimeout(function () {
            tiempo = Math.round(videoTag.duration);
            if (tiempo >= 60) {
                _this.validaVideo.ok = false;
                _this.validaVideo.valor = null;
                _this.validaVideo.mensaje = "El video no debe superar los 60 segundos";
                subirVideo.value = null;
                // quitar el video del thumb
                divVideo.style.display = 'none';
                return;
            }
        }, 500);
        // verificar que venga un video
        if (originalFiles) {
            // tslint:disable-next-line: max-line-length
            if (originalFiles.type !== 'video/mp4' && originalFiles.type !== 'video/3gpp' && originalFiles.type !== 'video/x-ms-wmv' && originalFiles.type !== 'video/x-msvideo') {
                this.validaVideo.ok = false;
                this.validaVideo.valor = null; // poner el avatar video
                this.validaVideo.mensaje = 'Permitidos(mp4, 3gp, wmv, avi)';
                subirVideo.value = null;
                // quitar el video del thumb
                divVideo.style.display = 'none';
                return;
            }
            else {
                var reader = new FileReader();
                reader.onload = function (evt) {
                    _this.thumbVideo = evt.target.result;
                    _this.convertBase64ToFile(_this.thumbVideo, 'video', 'mp4')
                        .then(function (file) {
                        _this.validaVideo.valor = file;
                        console.log(_this.validaVideo.valor);
                    })["catch"](function (err) {
                        console.log(err);
                    });
                    videoTag.load();
                    divVideo.style.display = 'block';
                };
                reader.readAsDataURL(originalFiles);
                this.validaVideo.ok = true;
            }
        }
        // si no hay nada o no hay archivos cargados
        if (!originalFiles) {
            return;
        }
    };
    // ========================== TERMINA VIDEO ========================== //
    // ========================== PORTADA ========================== //
    NuevoNegocioComponent.prototype.manejaPortada = function (e) {
        var _this = this;
        var originalFiles = e.target.files[0];
        this.radioImg = 16 / 9;
        var fondoNegro = document.getElementById('fondoNegro');
        var divImgCroppedPortada = document.getElementById('divImgCroppedPortada');
        // verificar que viene una imagen
        if (originalFiles) {
            // validar los mimetypes
            if (originalFiles.type !== 'image/jpeg' && originalFiles.type !== 'image/jpg' && originalFiles.type !== 'image/png') {
                this.validaPortada.ok = false;
                this.validaPortada.valor = null; // poner el avatar
                this.validaPortada.mensaje = 'Permitidos(jpg, png jpeg)';
                // quitar la imagen thumb
                divImgCroppedPortada.style.display = 'none';
                return;
            }
            else {
                this.imageChangedEvent = e; // cargar el crop con la imagen
                this.validaPortada.ok = true;
                // cargar boton recortar
                var btnRecortar = document.getElementById('btnRecortar');
                btnRecortar.style.display = 'block';
                btnRecortar.addEventListener('click', function (evt) {
                    _this.recotarImg(divImgCroppedPortada, 'portada', fondoNegro, _this.validaPortada, 'portada');
                }, { once: true });
            }
        }
        // si no hay cambios o nada cargado
        if (!originalFiles) {
            return;
        }
        fondoNegro.style.display = 'flex';
    };
    // ========================== TERMINA PORTADA ========================== //
    // ========================== ARCHIVOS ========================== //
    NuevoNegocioComponent.prototype.manejaArchivos = function (e) {
        var originalFiles = e.target.files[0];
        // verificar que viene una imagen
        if (originalFiles) {
            // validar los mimetypes
            if (originalFiles.type !== 'application/msword' && originalFiles.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' && originalFiles.type !== 'application/vnd.openxmlformats-officedocument.presentationml.presentation' && originalFiles.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' && originalFiles.type !== 'application/pdf') {
                this.validaArchivos.ok = false;
                this.validaArchivos.valor = null; // poner el avatar
                return;
            }
            else {
                this.validaArchivos.valor = originalFiles;
                this.validaArchivos.ok = true;
            }
        }
        // si no hay cambios o nada cargado
        if (!originalFiles) {
            return;
        }
    };
    // ========================== TERMINA ARCHIVOS ========================== //
    // validar telefono
    NuevoNegocioComponent.prototype.validarTelefono = function (e) {
        var telefono = document.getElementById('telefono');
        var value = validator_1["default"].isNumeric(telefono.value);
        if (value === false) {
            this.validaTelefono.ok = false;
            this.validaTelefono.mensaje = 'Ingrese solo números';
            e.preventDefault();
        }
        else {
            this.validaTelefono.ok = true;
            this.validaTelefono.valor = telefono.value;
        }
    };
    // validar select de codigo telefono
    NuevoNegocioComponent.prototype.validarCodigoTel = function (e) {
        var value = e.value;
        var ubicacion = this.ubicaciones;
        var find = ubicacion.find(function (valor) { return valor.indicativo === value; });
        if (!find) {
            this.validaCodigo.ok = false;
            this.validaCodigo.mensaje = 'Elija una opción de la lista';
        }
        else {
            this.validaCodigo.ok = true;
            this.validaCodigo.valor = find.indicativo;
        }
    };
    // pagina web
    NuevoNegocioComponent.prototype.paginaWeb = function (e) {
        var value = e.target.value;
        var valor = Array.from(value);
        this.validaPagWeb.ok = true;
        this.validaPagWeb.valor = value;
    };
    // hacia adelante o hacia atras de los tabs
    NuevoNegocioComponent.prototype.avanzaAtrasa = function (arrayTabs, tabNumber) {
        // ocultar el tab anterior
        arrayTabs[this.currentTab].style.display = 'none';
        // incrementar el currentab en 1
        this.currentTab = this.currentTab + tabNumber;
        this.showTab(this.currentTab);
        // mover los indicadores
        this.moverIndicadores(this.currentTab, tabNumber);
    };
    // boton siguiente
    NuevoNegocioComponent.prototype.nextPrev = function (e, tabNumber) {
        var arrayTabs = document.getElementsByClassName('tabs'); // array con los tabs
        // validaciones por parte de nexPrev
        this.validaNexPrev();
        // pasos del formulario
        if (tabNumber === 1) { // verifico que el usuario este avanzando
            switch (this.currentTab) {
                // primer tab
                case 0:
                    // tslint:disable-next-line: max-line-length
                    if (this.validaNombre.ok === true && this.validaDescripcion.ok === true && this.validaTipoNeg.ok === true && this.validaMonto.ok === true && this.validaCat.ok === true && this.validaUb.ok === true) { // valido que todos los campos del currenTab esten correctos falta && this.validaTiempoNeg.ok === true
                        this.avanzaAtrasa(arrayTabs, tabNumber);
                    }
                    break;
                // segundo tab
                case 1:
                    if (this.validaUt.ok === true && this.validaReg.ok === true && this.validaGarant.ok === true && this.otrasNeg.ok === true) {
                        this.avanzaAtrasa(arrayTabs, tabNumber);
                    }
                    break;
                // tercer tab
                case 2:
                    // tslint:disable-next-line: max-line-length
                    if (this.validaLogo.ok === true && this.validaPortada.ok === true && this.validaImg1.ok === true && this.validaImg2.ok === true && this.validaImg3.ok === true && this.validaArchivos.ok === true) {
                        this.avanzaAtrasa(arrayTabs, tabNumber);
                    }
                    break;
            }
        }
        if (tabNumber === -1) { // verifico que vaya hacia atras
            this.avanzaAtrasa(arrayTabs, tabNumber);
        }
    };
    // mover indicadores
    NuevoNegocioComponent.prototype.moverIndicadores = function (currenTab, tabNumber) {
        // todos los indicadores
        var indicadores = document.getElementsByClassName('indicadores');
        // span de los textos del boton de movimiento
        var spanMov = this.spanMov.nativeElement;
        // boton indicador
        var botonMov = this.botonMov.nativeElement;
        var anchoIndicador = indicadores[currenTab].offsetWidth;
        var aumentaLeft = (currenTab * anchoIndicador);
        // mover boton
        // botonMov.style.marginLeft = `${aumentaLeft}px`;
        botonMov.style.transform = "translate3d(" + aumentaLeft + "px, 0px, 0px)";
        botonMov.style.transition = 'all 0.5s';
        botonMov.style.transitionTimingFunction = 'cubic-bezier(0.29, 1.42, 0.79 1) 0s';
        spanMov.innerText = indicadores[currenTab].innerText;
        // efecto animate dependiendo del sentido
        if (tabNumber === 1) { }
    };
    // boton que publica el negocio
    NuevoNegocioComponent.prototype.publicarNegocio = function (e) {
        return __awaiter(this, void 0, Promise, function () {
            var token, tokenDecod, dataProyecto;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.validaNexPrev();
                        if (!(this.validaNombre.ok === true &&
                            this.validaDescripcion.ok === true &&
                            this.validaTipoNeg.ok === true &&
                            // this.validaTiempoNeg.ok === true &&
                            this.validaMonto.ok === true &&
                            this.validaCat.ok === true &&
                            this.validaUb.ok === true &&
                            this.validaUt.ok === true &&
                            this.validaReg.ok === true &&
                            this.validaGarant.ok === true &&
                            this.otrasNeg.ok === true &&
                            this.validaLogo.ok === true &&
                            this.validaPortada.ok === true &&
                            this.validaImg1.ok === true &&
                            this.validaImg2.ok === true &&
                            this.validaImg3.ok === true &&
                            this.validaVideo.ok === true &&
                            this.validaArchivos.ok === true &&
                            this.validaTelefono.ok === true &&
                            this.validaCodigo.ok === true &&
                            this.validaPagWeb.ok === true)) return [3 /*break*/, 2];
                        token = localStorage.getItem('token');
                        return [4 /*yield*/, this.usuarioService.decodificarToken(token).toPromise()];
                    case 1:
                        tokenDecod = _a.sent();
                        dataProyecto = new FormData();
                        dataProyecto.append('nombre', this.validaNombre.valor);
                        dataProyecto.append('descripcion', this.validaDescripcion.valor);
                        dataProyecto.append('tipoNegocio', this.validaTipoNeg.valor);
                        dataProyecto.append('tiempo', this.validaTiempoNeg.valor);
                        dataProyecto.append('monto', this.validaMonto.valor);
                        dataProyecto.append('categoria', this.validaCat.valor);
                        dataProyecto.append('ubicacion', this.validaUb.valor);
                        dataProyecto.append('utilidad', this.validaUt.valor);
                        dataProyecto.append('retorno', this.validaReg.valor);
                        dataProyecto.append('garantia', this.validaGarant.valor);
                        dataProyecto.append('otras', this.otrasNeg.valor);
                        dataProyecto.append('logo', this.validaLogo.valor);
                        dataProyecto.append('portada', this.validaPortada.valor);
                        dataProyecto.append('img', this.validaImg1.valor);
                        dataProyecto.append('img', this.validaImg2.valor);
                        dataProyecto.append('img', this.validaImg3.valor);
                        dataProyecto.append('video', this.validaVideo.valor);
                        dataProyecto.append('docs', this.validaArchivos.valor);
                        dataProyecto.append('codigoTel', this.validaCodigo.valor);
                        dataProyecto.append('numeroTel', this.validaTelefono.valor);
                        dataProyecto.append('pagWeb', this.validaPagWeb.valor);
                        dataProyecto.append('usuario', tokenDecod.usuarioDBToken.usuarioDB._id);
                        dataProyecto.append('nombreUsuario', "" + tokenDecod.usuarioDBToken.usuarioDB.nombre);
                        dataProyecto.append('apellidoUsuario', "" + tokenDecod.usuarioDBToken.usuarioDB.apellido);
                        dataProyecto.append('correoUsuario', "" + tokenDecod.usuarioDBToken.usuarioDB.correo);
                        // enviar la peticion
                        this.proyectoService.crearProyecto(dataProyecto)
                            // tslint:disable-next-line: deprecation
                            .subscribe(function (event) {
                            if (event.type === http_1.HttpEventType.UploadProgress) {
                                var progressBar = _this.progressBar.nativeElement;
                                var divBarra = _this.divBarra.nativeElement;
                                var btnPublicar = _this.btnSubmit.nativeElement;
                                var btnPrev = _this.btnPrev.nativeElement;
                                progressBar.style.backgroundColor = 'rgb(233, 236, 239)';
                                var porcentaje = Math.round(event.loaded / event.total * 100);
                                divBarra.style.width = porcentaje + "%";
                                btnPublicar.style.cursor = 'no-drop';
                                btnPublicar.setAttribute('disabled', 'true');
                                btnPrev.style.cursor = 'no-drop';
                                btnPrev.setAttribute('disabled', 'true');
                                btnPublicar.innerText = 'Publicando...';
                            }
                            else {
                                // console.log(event);
                                if (event.body !== undefined) {
                                    if (event.body.ok === true) {
                                        console.log(event.body);
                                        sweetalert2_1["default"].fire('Información', 'Negocio creado', 'info');
                                        _this.router.navigate(['/user-dashboard/mis-negocios']);
                                    }
                                    else if (event.body.ok === false) {
                                        sweetalert2_1["default"].fire('Información', 'No se pudo crear el negocio', 'error');
                                        window.location.reload();
                                    }
                                }
                            }
                        });
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    // desaparecer tooltip
    NuevoNegocioComponent.prototype.fadeOutTooltip = function (e) {
        var tooltipDocs = document.getElementById('tooltipDocs');
        tooltipDocs.style.display = 'none';
    };
    // tooltip docs
    NuevoNegocioComponent.prototype.infoDocs = function (e) {
        var tooltipDocs = document.getElementById('tooltipDocs');
        tooltipDocs.style.display = 'flex';
        tooltipDocs.style.position = 'absolute';
        tooltipDocs.style.marginTop = '-60px';
        tooltipDocs.style.backgroundColor = 'black';
        tooltipDocs.style.color = 'white';
        tooltipDocs.style.width = 'auto';
        tooltipDocs.style.padding = '5px';
        tooltipDocs.style.borderRadius = '3px';
        tooltipDocs.style.textAlign = 'center';
    };
    __decorate([
        core_1.ViewChild('botonMov', { static: true })
    ], NuevoNegocioComponent.prototype, "botonMov");
    __decorate([
        core_1.ViewChild('spanMov', { static: true })
    ], NuevoNegocioComponent.prototype, "spanMov");
    __decorate([
        core_1.ViewChild('inputLogo', { static: true })
    ], NuevoNegocioComponent.prototype, "inputLogo");
    __decorate([
        core_1.ViewChild('inputPortada', { static: true })
    ], NuevoNegocioComponent.prototype, "inputPortada");
    __decorate([
        core_1.ViewChild('fondoNegro', { static: true })
    ], NuevoNegocioComponent.prototype, "fondoNegro");
    __decorate([
        core_1.ViewChild('progressBar', { static: true })
    ], NuevoNegocioComponent.prototype, "progressBar");
    __decorate([
        core_1.ViewChild('divBarra', { static: false })
    ], NuevoNegocioComponent.prototype, "divBarra");
    __decorate([
        core_1.ViewChild('btnSubmit', { static: true, read: core_1.ElementRef })
    ], NuevoNegocioComponent.prototype, "btnSubmit");
    __decorate([
        core_1.ViewChild('btnPrev', { static: true, read: core_1.ElementRef })
    ], NuevoNegocioComponent.prototype, "btnPrev");
    NuevoNegocioComponent = __decorate([
        core_1.Component({
            selector: 'app-nuevo-negocio',
            templateUrl: './nuevo-negocio.component.html',
            styleUrls: ['./nuevo-negocio.component.css']
        })
    ], NuevoNegocioComponent);
    return NuevoNegocioComponent;
}());
exports.NuevoNegocioComponent = NuevoNegocioComponent;
