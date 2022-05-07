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
exports.NegocioComponent = void 0;
var core_1 = require("@angular/core");
var sweetalert2_1 = require("sweetalert2");
var NegocioComponent = /** @class */ (function () {
    function NegocioComponent(poyectoService, route, router, breakPointObserver, usuarioService) {
        this.poyectoService = poyectoService;
        this.route = route;
        this.router = router;
        this.breakPointObserver = breakPointObserver;
        this.usuarioService = usuarioService;
        this.monto = 0;
        this.categSimilar = [];
        this.negocio = null;
    }
    NegocioComponent.prototype.ngOnInit = function () {
        this.scroll();
        this.getNegocioId();
    };
    // obtener negocio por id
    NegocioComponent.prototype.getNegocioId = function () {
        return __awaiter(this, void 0, Promise, function () {
            var negocio;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.idNegocio = this.route.snapshot.queryParamMap.get('id');
                        return [4 /*yield*/, this.poyectoService.obtenerNegocio(this.idNegocio).toPromise()];
                    case 1:
                        negocio = _a.sent();
                        if (!negocio.negocioDB) {
                            sweetalert2_1["default"].fire('Información', 'Negocio no disponible', 'info');
                            this.router.navigate(['/negocios']);
                        }
                        if (negocio.ok === false) {
                            sweetalert2_1["default"].fire('Información', 'Negocio no disponible', 'info');
                            this.router.navigate(['/negocios']);
                        }
                        else {
                            // console.log(negocio);
                            this.negocio = negocio;
                            // negocios con categoria similar
                            this.negociosSimilares(this.negocio);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    NegocioComponent.prototype.negociosSimilares = function (negocioActual) {
        return __awaiter(this, void 0, Promise, function () {
            var categoriaActual, todosLosNeg, arrayTodos, catSimilar, excluidos;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        categoriaActual = negocioActual.negocioDB.categoria;
                        return [4 /*yield*/, this.poyectoService.obtenerTodos().toPromise()];
                    case 1:
                        todosLosNeg = _b.sent();
                        arrayTodos = todosLosNeg.negocioDB;
                        catSimilar = arrayTodos.filter(function (negocio) { return negocio.categoria === categoriaActual; });
                        excluidos = catSimilar.filter(function (negExcluido) { return negExcluido._id !== negocioActual.negocioDB._id; });
                        (_a = this.categSimilar).push.apply(_a, catSimilar);
                        return [2 /*return*/];
                }
            });
        });
    };
    NegocioComponent.prototype.slide = function (e) {
        var srcThumb = e.target.getAttribute('src');
        var imgPrincipal = document.getElementById('imgPrincipal');
        this.srcTumbs = srcThumb;
        imgPrincipal.setAttribute('src', srcThumb);
    };
    NegocioComponent.prototype.scroll = function () {
        window.scroll(0, 0);
    };
    NegocioComponent.prototype.contactar = function (e, idNegocio, negocio) {
        return __awaiter(this, void 0, Promise, function () {
            var token, monto, usuario, idUsuario, role, body, fondo_1, alert_1, wrapDescAlert, divIcon, i, titulo, wrapButtons, aceptar_1, cancelar_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = localStorage.getItem('token');
                        localStorage.setItem('statusCheck', 'true');
                        monto = negocio.negocioDB.monto;
                        if (monto >= 0 && monto <= 9999) {
                            this.monto = 1.99;
                        }
                        else if (monto >= 10000 && monto <= 999999) {
                            this.monto = 3.99;
                        }
                        else if (monto > 999999) {
                            this.monto = 8.99;
                        }
                        if (!!token) return [3 /*break*/, 1];
                        this.router.navigate(['/entrar']);
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.usuarioService.decodificarToken(token).toPromise()];
                    case 2:
                        usuario = _a.sent();
                        idUsuario = usuario.usuarioDBToken.usuarioDB._id;
                        role = usuario.usuarioDBToken.usuarioDB.role;
                        if (role === 'ADMINROLE') {
                            console.log('permitido solo para CBWYNROLE');
                        }
                        if (role === 'CBWYNROLE') {
                            if (negocio.negocioDB.usuario === idUsuario) {
                                // soy yo mismo
                                console.log('no puede contactar a su mismo usuario');
                                sweetalert2_1["default"].fire('Mensaje', 'No puede contactar a su mismo usuario', 'error');
                            }
                            else {
                                body = document.body;
                                fondo_1 = document.createElement('div');
                                alert_1 = document.createElement('div');
                                wrapDescAlert = document.createElement('div');
                                divIcon = document.createElement('div');
                                i = document.createElement('i');
                                titulo = document.createElement('h3');
                                wrapButtons = document.createElement('div');
                                aceptar_1 = document.createElement('div');
                                cancelar_1 = document.createElement('div');
                                // fondo
                                fondo_1.style.position = 'fixed';
                                fondo_1.style.top = '0px';
                                fondo_1.style.left = '0px';
                                fondo_1.style.backgroundColor = 'rgba(128, 128, 128, 0.3)';
                                fondo_1.style.display = 'flex';
                                fondo_1.style.justifyContent = 'center';
                                fondo_1.style.alignItems = 'center';
                                fondo_1.style.width = '100vw';
                                fondo_1.style.height = '100vh';
                                fondo_1.style.zIndex = '9999';
                                // alert
                                alert_1.classList.remove('animate__animated', 'animate__fadeOutUp');
                                alert_1.classList.add('animate__animated', 'animate__fadeInDown');
                                // alert.style.setProperty('--animate-duration', '0.4s');
                                alert_1.style.width = '500px';
                                alert_1.style.height = '250px';
                                alert_1.style.backgroundImage = 'linear-gradient(rgb(97, 196, 226), rgb(61, 176, 211))';
                                alert_1.style.padding = '20px';
                                alert_1.style.borderRadius = '20px';
                                alert_1.style.boxShadow = '1px 3px 15px gray';
                                // wrapDescAlert
                                wrapDescAlert.style.width = '100%';
                                wrapDescAlert.style.height = '100%';
                                // wrapDescAlert.style.border = '1px solid white';
                                wrapDescAlert.style.display = 'flex';
                                wrapDescAlert.style.justifyContent = 'space-between';
                                wrapDescAlert.style.flexDirection = 'column';
                                // icon
                                divIcon.style.width = '40px';
                                divIcon.style.height = '40px';
                                // divIcon.style.border = '1px solid white';
                                divIcon.style.display = 'flex';
                                divIcon.style.justifyContent = 'center';
                                divIcon.style.alignItems = 'center';
                                // i
                                i.classList.add('fas', 'fa-exclamation-triangle');
                                i.style.fontSize = '25px';
                                i.style.color = 'rgb(234, 234, 234)';
                                // titulo
                                titulo.innerText = "Contactar a este Emprendedor tendr\u00E1 un cargo de: $" + this.monto + "(USD)";
                                // titulo.style.border = '1px solid white';
                                titulo.style.width = '100%';
                                titulo.style.textAlign = 'center';
                                titulo.style.fontSize = '1.3rem';
                                titulo.style.fontWeight = '400';
                                titulo.style.color = 'rgb(234, 234, 234)';
                                titulo.style.fontFamily = '"Nunito Sans", sans-serif';
                                // wrapButtons
                                wrapButtons.style.width = '100%';
                                // wrapButtons.style.border = '1px solid white';
                                wrapButtons.style.display = 'flex';
                                wrapButtons.style.justifyContent = 'space-evenly';
                                wrapButtons.style.alignItems = 'center';
                                // aceptar
                                aceptar_1.innerHTML = "<span style=\"font-size: 1rem; color: rgb(234, 234, 234); font-weight: 900; font-family: 'Nunito Sans', sans-serif\">Contactar</span>";
                                aceptar_1.style.width = '130px';
                                aceptar_1.style.height = '40px';
                                // aceptar.style.border = '1px solid white';
                                aceptar_1.style.display = 'flex';
                                aceptar_1.style.justifyContent = 'center';
                                aceptar_1.style.alignItems = 'center';
                                aceptar_1.style.backgroundColor = 'rgb(11, 147, 188)';
                                aceptar_1.style.cursor = 'pointer';
                                aceptar_1.style.transition = 'all 0.3s';
                                // cancelar
                                cancelar_1.innerHTML = "<span style=\"font-size: 1rem; color: rgb(234, 234, 234); font-weight: 900; font-family: 'Nunito Sans', sans-serif\">Volver</span>";
                                cancelar_1.style.width = '130px';
                                cancelar_1.style.height = '40px';
                                // cancelar.style.border = '1px solid white';
                                cancelar_1.style.display = 'flex';
                                cancelar_1.style.justifyContent = 'center';
                                cancelar_1.style.alignItems = 'center';
                                cancelar_1.style.marginLeft = '25px';
                                cancelar_1.style.backgroundColor = 'rgb(72, 79, 86)';
                                cancelar_1.style.cursor = 'pointer';
                                cancelar_1.style.transition = 'all 0.3s';
                                wrapButtons.append(aceptar_1, cancelar_1);
                                divIcon.append(i);
                                wrapDescAlert.append(divIcon, titulo, wrapButtons);
                                alert_1.append(wrapDescAlert);
                                fondo_1.append(alert_1);
                                body.append(fondo_1);
                                // eventos hover
                                aceptar_1.addEventListener('mouseenter', function (event) {
                                    aceptar_1.style.backgroundColor = 'rgb(3, 122, 155)';
                                });
                                aceptar_1.addEventListener('mouseleave', function (event) {
                                    aceptar_1.style.backgroundColor = 'rgb(11, 147, 188)';
                                });
                                cancelar_1.addEventListener('mouseenter', function (event) {
                                    cancelar_1.style.backgroundColor = 'rgb(44, 48, 53)';
                                });
                                cancelar_1.addEventListener('mouseleave', function (event) {
                                    cancelar_1.style.backgroundColor = 'rgb(72, 79, 86)';
                                });
                                // eventos para cancelar
                                cancelar_1.addEventListener('click', function (event) {
                                    localStorage.removeItem('statusCheck');
                                    alert_1.classList.add('animate__fadeOutUp');
                                    alert_1.classList.remove('animate__fadeInDown');
                                    setTimeout(function () {
                                        fondo_1.style.display = 'none';
                                    }, 800);
                                });
                                // eventos para aceptar
                                aceptar_1.addEventListener('click', function (event) {
                                    alert_1.classList.add('animate__fadeOutUp');
                                    alert_1.classList.remove('animate__fadeInDown');
                                    setTimeout(function () {
                                        fondo_1.style.display = 'none';
                                    }, 800);
                                    _this.router.navigate(['/checkout'], { queryParams: { negocio: idNegocio } });
                                });
                            }
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        core_1.ViewChild('wrapNegocio', { static: true })
    ], NegocioComponent.prototype, "wrapNegocio");
    NegocioComponent = __decorate([
        core_1.Component({
            selector: 'app-negocio',
            templateUrl: './negocio.component.html',
            styleUrls: ['./negocio.component.css']
        })
    ], NegocioComponent);
    return NegocioComponent;
}());
exports.NegocioComponent = NegocioComponent;
