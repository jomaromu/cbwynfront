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
exports.UsuarioService = void 0;
var core_1 = require("@angular/core");
var environment_1 = require("../../environments/environment");
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var sweetalert2_1 = require("sweetalert2");
var UsuarioService = /** @class */ (function () {
    function UsuarioService(http, socket, router) {
        this.http = http;
        this.socket = socket;
        this.router = router;
        this.checkStatus();
    }
    // registrar un usuario
    UsuarioService.prototype.registarUsuario = function (usuario) {
        var url = environment_1.environment.urlBack + "/usuario/registrar";
        // hacer peticion
        return this.http.post(url, usuario)
            .pipe(operators_1.map(function (data) {
            return data;
        }));
    };
    // loguear un usuario
    UsuarioService.prototype.loguearUsuario = function (usuario) {
        var url = environment_1.environment.urlBack + "/usuario/entrar";
        // hacer peticion
        return this.http.post(url, usuario)
            .pipe(operators_1.map(function (data) {
            return data;
        }));
    };
    // decodificar token
    UsuarioService.prototype.decodificarToken = function (token) {
        var url = environment_1.environment.urlBack + "/usuario/decodedToken";
        var header = new http_1.HttpHeaders({ token: token });
        // hacer peticion
        return this.http.get(url, { headers: header })
            .pipe(operators_1.map(function (data) {
            return data;
        }));
    };
    // obtener usuario por ID
    UsuarioService.prototype.obtenerUsuario = function (id) {
        var url = environment_1.environment.urlBack + "/usuario/getUserId";
        var header = new http_1.HttpHeaders({ id: id });
        return this.http.get(url, { headers: header })
            .pipe(operators_1.map(function (data) {
            return data;
        }));
    };
    // obtener negocios por usuario
    UsuarioService.prototype.obtenerNegociosUsuario = function (id) {
        var header = new http_1.HttpHeaders({ id: id });
        var url = environment_1.environment.urlBack + "/usuario/negociosUsuario";
        return this.http.get(url, { headers: header })
            .pipe(operators_1.map(function (data) {
            return data;
        }));
    };
    // actualizar perfil
    UsuarioService.prototype.actualizarPerfil = function (data, idSocket) {
        var url = environment_1.environment.urlBack + "/usuario/actualizarPerfil";
        var header = new http_1.HttpHeaders({ idSocket: idSocket });
        return this.http.put(url, data, { headers: header })
            .pipe(operators_1.map(function (resp) {
            return resp;
        }));
    };
    // verifica estado de la conexion
    UsuarioService.prototype.checkStatus = function () {
        var _this = this;
        console.log('inicia checstatus');
        // escuchar el servidor
        this.socket.on('connect', function () {
            console.log('conectado al servidor');
            _this.socketStatus = true;
        });
        this.socket.on('disconnect', function () {
            console.log('Desconectado del servidor');
            _this.socketStatus = false;
        });
    };
    // actualizar token
    UsuarioService.prototype.actualizarToken = function () {
        return __awaiter(this, void 0, Promise, function () {
            var token, tokenDecod;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = localStorage.getItem('token');
                        if (!!token) return [3 /*break*/, 1];
                        return [2 /*return*/];
                    case 1: return [4 /*yield*/, this.decodificarToken(token).toPromise()];
                    case 2:
                        tokenDecod = _a.sent();
                        if (tokenDecod.ok === true) {
                            this.decodificarToken(token)
                                .pipe(operators_1.mergeMap(function (resp1) { return _this.obtenerUsuario(resp1.usuarioDBToken.usuarioDB._id); })
                            // tslint:disable-next-line: deprecation
                            ).subscribe(function (data) {
                                localStorage.setItem('token', data.token);
                            });
                        }
                        else {
                            // localStorage.removeItem('token');
                            sweetalert2_1["default"].fire({
                                title: 'Mensaje',
                                text: 'parece que no tiene una sesión activa, Inicie sesión para poder entrar al sistema.',
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Ok'
                            }).then(function (result) {
                                if (result.isConfirmed) {
                                    _this.router.navigate(['/inicio']);
                                    localStorage.removeItem('token');
                                }
                            });
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // SOCKETS
    UsuarioService.prototype.actualizarDatosUsuario = function () {
        var _this = this;
        return new rxjs_1.Observable(function (subscriber) {
            _this.socket.on('actualizar-perfil', function (callback) {
                subscriber.next(callback);
            });
        });
    };
    UsuarioService.prototype.usuariosConectados = function () {
        var _this = this;
        console.log('desde usuarioConectado servicios');
        return new rxjs_1.Observable(function (subscriber) {
            _this.socket.on('usuarios-conectados', function (callback) {
                subscriber.next(callback);
            });
        });
    };
    UsuarioService.prototype.emitGetIds = function () {
        this.socket.emit('emitGetIds');
    };
    UsuarioService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], UsuarioService);
    return UsuarioService;
}());
exports.UsuarioService = UsuarioService;
