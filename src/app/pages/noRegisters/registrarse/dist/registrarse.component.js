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
exports.RegistrarseComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var environment_1 = require("../../../../environments/environment");
var sweetalert2_1 = require("sweetalert2");
var RegistrarseComponent = /** @class */ (function () {
    function RegistrarseComponent(fb, usuarioService, router) {
        this.fb = fb;
        this.usuarioService = usuarioService;
        this.router = router;
        this.usuarioModel = ({
            correo: null,
            password: null,
            soyMayor: null,
            fechaAlta: null,
            role: environment_1.environment.roleUsuario
        });
        // tslint:disable-next-line: quotemark
        this.pattherCorreo = ("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$").toLocaleLowerCase();
        // propiedades de validaciones
        this.msgCorreo = {
            invalido: null,
            mensajes: []
        };
        this.msgPass = {
            invalido: null,
            mensajes: []
        };
        this.msgMayor = {
            invalido: null,
            mensajes: []
        };
    }
    RegistrarseComponent.prototype.ngOnInit = function () {
        this.detectarPaddingTop();
        // crear formulario
        this.crearFormulario();
    };
    // crear el formulario
    RegistrarseComponent.prototype.crearFormulario = function () {
        this.forma = this.fb.group({
            correo: [null, [forms_1.Validators.required, forms_1.Validators.pattern(this.pattherCorreo)]],
            pass1: [null, [forms_1.Validators.required, forms_1.Validators.minLength(6)]],
            pass2: [null, [forms_1.Validators.required, forms_1.Validators.minLength(6)]],
            soyMayor: [true, forms_1.Validators.requiredTrue]
        });
    };
    // verificar cantidad igual en passwords
    RegistrarseComponent.prototype.passIgualesCant = function () {
        // si el campo es null o esta vacio
        if (this.forma.controls.pass1.value === null || this.forma.controls.pass1.value === '') {
            this.msgPass.invalido = true;
            this.msgPass.mensajes[0] = 'El campo está vacío';
        }
        // si el campo es null y no esta vacio
        if (this.forma.controls.pass1.value !== null && this.forma.controls.pass1.value !== '') {
            // si pass1 es menor a 6 caracteres
            if (this.forma.controls.pass1.value.length < 6) {
                this.msgPass.invalido = true;
                this.msgPass.mensajes[0] = 'Mínimo 6 carácteres';
            }
            // si pass1 es mayor a 5 y no son iguales los pass
            if (this.forma.controls.pass1.value.length > 5 && (this.forma.controls.pass1.value !== this.forma.controls.pass2.value)) {
                this.msgPass.invalido = true;
                this.msgPass.mensajes[0] = 'Las contraseñas no son iguales';
            }
            // si pass1 es mayora 5 y es igual a pass2
            if (this.forma.controls.pass1.value.length > 5 && (this.forma.controls.pass1.value === this.forma.controls.pass2.value)) {
                this.msgPass.invalido = false;
            }
        }
    };
    // verificar correo correcto
    RegistrarseComponent.prototype.correoValido = function () {
        // si es campo esta vacio
        if (this.forma.controls.correo.value === null || this.forma.controls.correo.value === '') {
            this.msgCorreo.invalido = true;
            this.msgCorreo.mensajes[0] = 'El campo está vacío';
        }
        // si el campo no esta vacio
        if (this.forma.controls.correo.value !== null && this.forma.controls.correo.value !== '') {
            if (this.forma.controls.correo.status === 'INVALID') {
                this.msgCorreo.invalido = true;
                this.msgCorreo.mensajes[0] = 'Correo invávlido';
            }
            if (this.forma.controls.correo.status === 'VALID') {
                this.msgCorreo.invalido = false;
            }
        }
    };
    // verificar si es mayor
    RegistrarseComponent.prototype.soyMayorValido = function () {
        if (this.forma.controls.soyMayor.status === 'INVALID') {
            this.msgMayor.invalido = true;
            this.msgMayor.mensajes[0] = 'Debe ser mayor de edad';
        }
        if (this.forma.controls.soyMayor.status === 'VALID') {
            this.msgMayor.invalido = false;
        }
    };
    Object.defineProperty(RegistrarseComponent.prototype, "fechaALta", {
        // obtener fecha actual
        get: function () {
            var dia = new Date().getDay();
            var mes = new Date().getMonth();
            var anio = new Date().getFullYear();
            var fecha = new Date(anio, mes, dia);
            return fecha;
        },
        enumerable: false,
        configurable: true
    });
    // metodo que registra un usuario
    RegistrarseComponent.prototype.registrarUsuario = function () {
        return __awaiter(this, void 0, Promise, function () {
            var btnRegistrarse, txtRegistrarse, correoUsuario, passUsuario, soyMayor, resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        btnRegistrarse = this.btnRegistrarse.nativeElement;
                        txtRegistrarse = this.txtRegistrarse.nativeElement;
                        // metodos con las validaciones
                        this.correoValido();
                        this.passIgualesCant();
                        this.soyMayorValido();
                        correoUsuario = this.forma.controls.correo.value;
                        passUsuario = this.forma.controls.pass1.value;
                        soyMayor = this.forma.controls.soyMayor.value;
                        // intefaz del usuario
                        this.usuarioModel.correo = correoUsuario;
                        this.usuarioModel.password = passUsuario;
                        this.usuarioModel.soyMayor = soyMayor;
                        this.usuarioModel.fechaAlta = this.fechaALta;
                        if (!(this.msgCorreo.invalido === false && this.msgMayor.invalido === false && this.msgPass.invalido === false)) return [3 /*break*/, 2];
                        btnRegistrarse.setAttribute('disabled', 'true');
                        btnRegistrarse.style.cursor = 'no-drop';
                        txtRegistrarse.innerText = 'Registrandose...';
                        return [4 /*yield*/, this.usuarioService.registarUsuario(this.usuarioModel).toPromise()];
                    case 1:
                        resp = _a.sent();
                        if (resp.ok === true) {
                            btnRegistrarse.setAttribute('disabled', '');
                            btnRegistrarse.style.cursor = 'no-drop';
                            txtRegistrarse.innerText = 'Registrandose...';
                            sweetalert2_1["default"].fire('Mensaje', resp.usuarioDB.correo + " Registrado correctamente", 'success');
                            // redirigir a inicio
                            this.router.navigate(['/entrar']);
                        }
                        else if (resp.ok === false) {
                            sweetalert2_1["default"].fire('Mensaje', "" + resp.mensaje, 'error');
                            btnRegistrarse.removeAttribute('disabled');
                            btnRegistrarse.style.cursor = 'pointer';
                            txtRegistrarse.innerText = 'Registrarme';
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    RegistrarseComponent.prototype.detectarPaddingTop = function () {
        var detectPaddingTop = setInterval(function () {
            var paddingTop = document.getElementById('paddingTop');
            if (!paddingTop || (paddingTop.clientHeight === 0)) {
                clearInterval(detectPaddingTop);
            }
            else {
                paddingTop.style.height = '0px';
                clearInterval(detectPaddingTop);
            }
        }, 10);
    };
    __decorate([
        core_1.ViewChild('btnRegistrarse', { static: true })
    ], RegistrarseComponent.prototype, "btnRegistrarse");
    __decorate([
        core_1.ViewChild('txtRegistrarse', { static: true })
    ], RegistrarseComponent.prototype, "txtRegistrarse");
    RegistrarseComponent = __decorate([
        core_1.Component({
            selector: 'app-registrarse',
            templateUrl: './registrarse.component.html',
            styleUrls: ['./registrarse.component.css']
        })
    ], RegistrarseComponent);
    return RegistrarseComponent;
}());
exports.RegistrarseComponent = RegistrarseComponent;
