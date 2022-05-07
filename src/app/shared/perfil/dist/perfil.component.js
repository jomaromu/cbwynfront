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
exports.PerfilComponent = void 0;
var core_1 = require("@angular/core");
var multimedia_pipe_1 = require("../../pipes/multimedia.pipe");
var validator_1 = require("validator");
var sweetalert2_1 = require("sweetalert2");
var PerfilComponent = /** @class */ (function () {
    function PerfilComponent(usuarioService, multimediaPipe) {
        this.usuarioService = usuarioService;
        this.multimediaPipe = multimediaPipe;
        this.imageChangedEvent = '';
        this.croppedImage = '';
        this.datosUsuario = {
            nombre: null,
            apellido: null,
            email: null,
            address: null,
            role: null,
            ubicacion: null,
            avatar: null
        };
    }
    PerfilComponent.prototype.ngOnInit = function () {
        this.perfilUsuario();
        this.actualizarPerfil();
        // obtener ids socketidsSocket
        this.usuariosCOnectados();
        this.usuarioService.emitGetIds();
    };
    PerfilComponent.prototype.perfilUsuario = function () {
        return __awaiter(this, void 0, Promise, function () {
            var token;
            var _this = this;
            return __generator(this, function (_a) {
                token = localStorage.getItem('token');
                if (!token) {
                    return [2 /*return*/];
                }
                else {
                    this.usuarioService.decodificarToken(token)
                        .subscribe(function (usuario) {
                        var usuarioDB = usuario.usuarioDBToken.usuarioDB;
                        _this.usuario = usuarioDB;
                        // console.log(usuarioDB);
                        _this.datosUsuario.nombre = usuarioDB.nombre || 'John';
                        _this.datosUsuario.apellido = usuarioDB.apellido || 'Doe';
                        _this.datosUsuario.email = usuarioDB.correo;
                        _this.datosUsuario.avatar = usuarioDB.avatar;
                        switch (usuarioDB.role) {
                            case 'CBWYNROLE': {
                                _this.datosUsuario.role = 'Emprendedor/Inversionista';
                                break;
                            }
                            case 'ADMINROLE': {
                                _this.datosUsuario.role = 'Administrador';
                                break;
                            }
                            default: {
                                _this.datosUsuario.role = 'Undefined';
                                break;
                            }
                        }
                    });
                }
                return [2 /*return*/];
            });
        });
    };
    PerfilComponent.prototype.editarUsuario = function () {
        var _this = this;
        var body = document.body;
        var fondo = document.createElement('div');
        var wrapAlert = document.createElement('div');
        var divInputs = document.createElement('div');
        var inputNombre = document.createElement('input');
        var inputApellido = document.createElement('input');
        var img = document.createElement('img');
        var divImg = document.createElement('div');
        var form = document.createElement('form');
        var cerrar = document.createElement('i');
        var boton = document.createElement('button');
        var camera = document.createElement('i');
        var inputFile = document.createElement('input');
        var labelFile = document.createElement('label');
        // fondo
        fondo.style.position = 'fixed';
        fondo.style.top = '0px';
        fondo.style.left = '0px';
        fondo.style.backgroundColor = 'rgba(183, 183, 183, 0.3)';
        fondo.style.width = '100vw';
        fondo.style.height = '100vh';
        fondo.style.zIndex = '9999';
        fondo.style.display = 'flex';
        fondo.style.justifyContent = 'center';
        fondo.style.alignItems = 'center';
        fondo.style.display = 'flex';
        fondo.setAttribute('id', 'fondo');
        // wrapAlert
        wrapAlert.style.width = '430px';
        wrapAlert.style.height = 'auto';
        wrapAlert.style.backgroundColor = 'white';
        wrapAlert.style.borderRadius = '5px';
        wrapAlert.style.boxShadow = '1px 1px 10px rgba(183, 183, 183, 0.3)';
        wrapAlert.style.position = 'relative';
        wrapAlert.style.padding = '20px';
        wrapAlert.classList.add('animate__animated', 'animate__bounceIn');
        wrapAlert.setAttribute('id', 'wrapAlert');
        // cerrar
        cerrar.classList.add('far', 'fa-times-circle');
        cerrar.style.position = 'absolute';
        cerrar.style.cursor = 'pointer';
        cerrar.style.fontSize = '1.7rem';
        cerrar.style.right = '20px';
        cerrar.style.top = '20px';
        // img
        // divImg.style.border = '1px solid pink';
        divImg.style.width = '150px';
        divImg.style.height = '150px';
        divImg.style.marginTop = '80px';
        divImg.style.display = 'flex';
        divImg.style.justifyContent = 'center';
        divImg.style.alignItems = 'center';
        divImg.style.position = 'relative';
        // divImg.style.zIndex = '99';
        divImg.style.cursor = 'pointer';
        divImg.style.borderRadius = '50%';
        divImg.style.overflow = 'hidden';
        var avatar = document.getElementById('avatar').getAttribute('src');
        img.setAttribute('src', "" + avatar);
        img.setAttribute('id', 'imgAvatar');
        img.style.height = '100%';
        img.style.borderRadius = '50%';
        img.style.border = '1px solid rgba(183, 183, 183)';
        // img.style.cursor = 'pointer';
        camera.classList.add('fas', 'fa-camera');
        camera.style.position = 'absolute';
        camera.style.fontSize = '2rem';
        camera.style.color = 'rgb(9, 173, 208)';
        // camera.style.cursor = 'pointer';
        // input file
        inputFile.setAttribute('type', 'file');
        inputFile.style.position = 'absolute';
        inputFile.style.visibility = 'hidden';
        inputFile.setAttribute('id', 'inputFile');
        labelFile.setAttribute('for', 'inputFile');
        labelFile.style.position = 'absolute';
        labelFile.style.width = '150px';
        labelFile.style.height = '150px';
        // labelFile.style.border = '1px solid green';
        labelFile.style.top = '0px';
        labelFile.style.left = '0px';
        labelFile.style.borderRadius = '50%';
        labelFile.style.cursor = 'pointer';
        labelFile.style.zIndex = '99';
        divImg.append(img, inputFile, labelFile, camera);
        // form
        // form.style.border = '1px solid blue';
        form.style.width = '100%';
        form.style.height = '100%';
        form.style.display = 'flex';
        form.style.flexDirection = 'column';
        form.style.justifyContent = 'center';
        form.style.alignItems = 'center';
        // inputs
        // divInputs.style.border = '1px solid red';
        divInputs.style.marginTop = '25px';
        divInputs.style.width = '100%';
        divInputs.style.display = 'flex';
        divInputs.style.flexDirection = 'row';
        divInputs.style.justifyContent = 'space-between';
        divInputs.style.alignItems = 'center';
        inputNombre.setAttribute('type', 'text');
        inputNombre.style.width = '45%';
        inputNombre.style.height = '30px';
        inputNombre.style.border = '1px solid rgb(183, 183, 183)';
        inputNombre.value = this.datosUsuario.nombre;
        inputApellido.setAttribute('type', 'text');
        inputApellido.style.width = '45%';
        inputApellido.style.height = '30px';
        inputApellido.style.border = '1px solid rgb(183, 183, 183)';
        inputApellido.value = this.datosUsuario.apellido;
        // boton
        boton.style.width = '150px';
        boton.style.height = '40px';
        boton.style.alignSelf = 'flex-start';
        boton.style.backgroundColor = 'rgb(9, 173, 208)';
        boton.style.color = 'white';
        boton.style.marginTop = '25px';
        boton.innerText = 'Actualizar datos';
        divInputs.append(inputNombre, inputApellido);
        form.append(cerrar, divImg, divInputs, boton);
        wrapAlert.append(form);
        fondo.append(wrapAlert);
        body.append(fondo);
        // EVENTOS
        // cerrar
        cerrar.addEventListener('click', function (e) {
            // console.log('ok');
            inputFile.value = '';
            body.removeChild(fondo);
        });
        // cropper
        inputFile.addEventListener('change', function (e) {
            _this.imageChangedEvent = e;
            var wrapCropper = document.getElementById('wrapCropper');
            wrapCropper.style.display = 'flex';
            var idFondo = document.getElementById('fondo');
            idFondo.style.visibility = 'hidden';
        });
        // actualizar datos
        boton.addEventListener('click', function (e) { return __awaiter(_this, void 0, void 0, function () {
            var nombre, apellido, nombrePermitido, apellidoPermitido, loading, data, resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        e.preventDefault();
                        nombre = inputNombre.value;
                        apellido = inputApellido.value;
                        nombrePermitido = validator_1["default"].isAlphanumeric(nombre, 'es-ES');
                        apellidoPermitido = validator_1["default"].isAlphanumeric(apellido, 'es-ES');
                        loading = document.createElement('img');
                        loading.setAttribute('src', '../../../assets/img/loading.gif');
                        loading.style.position = 'absolute';
                        loading.style.width = '100px';
                        loading.style.zIndex = '9999';
                        fondo.append(loading);
                        // valida nombre
                        if (nombre.length > 10) {
                            alert('Maximo 10 caracteres');
                        }
                        else {
                            if (nombrePermitido === true) {
                            }
                            else {
                                alert('El campo del nombre no debe estar vacio, ni tener espacios');
                            }
                        }
                        // valida apellido
                        if (apellido.length > 10) {
                            alert('Maximo 10 caracteres');
                        }
                        else {
                            if (apellidoPermitido === true) {
                            }
                            else {
                                alert('El campo del apellido no debe estar vacio, ni tener espacios');
                            }
                        }
                        if (!(nombrePermitido === true && apellidoPermitido === true)) return [3 /*break*/, 2];
                        data = new FormData();
                        data.append('idUsuario', "" + this.usuario._id);
                        data.append('nombre', "" + nombre);
                        data.append('apellido', "" + apellido);
                        data.append('avatar', this.avatar);
                        return [4 /*yield*/, this.usuarioService.actualizarPerfil(data, this.idSOcket).toPromise()];
                    case 1:
                        resp = _a.sent();
                        // console.log('enviar datos', this.idSOcket);
                        this.usuarioService.actualizarToken();
                        if (resp.ok === true) {
                            body.removeChild(fondo);
                            sweetalert2_1["default"].fire('Mensaje', 'Datos actualizados', 'info');
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
    };
    PerfilComponent.prototype.cerrarCropper = function () {
        var idFondo = document.getElementById('fondo');
        var wrapCropper = document.getElementById('wrapCropper');
        var inputFile = document.getElementById('inputFile');
        inputFile.value = '';
        wrapCropper.style.display = 'none';
        idFondo.style.visibility = 'visible';
    };
    PerfilComponent.prototype.fileChangeEvent = function (event) {
        this.imageChangedEvent = event;
    };
    PerfilComponent.prototype.imageCropped = function (event) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                this.croppedImage = event.base64;
                return [2 /*return*/];
            });
        });
    };
    // convertir base64 en file
    PerfilComponent.prototype.convertBase64ToFile = function (url, filename, mime) {
        mime = mime || (url.match(/^data:([^;]+);/) || '')[1];
        return (fetch(url)
            .then(function (res) { return res.arrayBuffer(); })
            .then(function (buf) { return new File([buf], filename, { type: mime }); }));
    };
    // recortar cropp
    PerfilComponent.prototype.recortarCropp = function () {
        return __awaiter(this, void 0, Promise, function () {
            var _a, wrapCropper, inputFile, imgAvatar, idFondo;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(this.croppedImage !== '')) return [3 /*break*/, 2];
                        // convetir base64 a file
                        _a = this;
                        return [4 /*yield*/, this.convertBase64ToFile(this.croppedImage, "avatar", 'png')];
                    case 1:
                        // convetir base64 a file
                        _a.avatar = _b.sent();
                        wrapCropper = document.getElementById('wrapCropper');
                        inputFile = document.getElementById('inputFile');
                        imgAvatar = document.getElementById('imgAvatar');
                        imgAvatar.setAttribute('src', "" + this.croppedImage);
                        wrapCropper.style.display = 'none';
                        idFondo = document.getElementById('fondo');
                        idFondo.style.visibility = 'visible';
                        _b.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    // SOCKETS
    PerfilComponent.prototype.actualizarPerfil = function () {
        var _this = this;
        this.usuarioService.actualizarDatosUsuario()
            .subscribe(function (resp) {
            _this.datosUsuario.nombre = resp.nombre;
            _this.datosUsuario.apellido = resp.apellido;
            _this.datosUsuario.avatar = resp.avatar;
        });
    };
    PerfilComponent.prototype.usuariosCOnectados = function () {
        var _this = this;
        this.suscripcionIds = this.usuarioService.usuariosConectados()
            .subscribe(function (resp) {
            _this.idSOcket = resp;
            // console.log(this.idSOcket);
        });
    };
    PerfilComponent = __decorate([
        core_1.Component({
            selector: 'app-perfil',
            templateUrl: './perfil.component.html',
            styleUrls: ['./perfil.component.css'],
            providers: [multimedia_pipe_1.MultimediaPipe]
        })
    ], PerfilComponent);
    return PerfilComponent;
}());
exports.PerfilComponent = PerfilComponent;
