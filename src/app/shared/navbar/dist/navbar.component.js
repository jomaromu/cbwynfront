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
exports.NavbarComponent = void 0;
var core_1 = require("@angular/core");
var environment_1 = require("../../../environments/environment");
var NavbarComponent = /** @class */ (function () {
    function NavbarComponent(usuarioService, router, breakPointObserver) {
        this.usuarioService = usuarioService;
        this.router = router;
        this.breakPointObserver = breakPointObserver;
        this.flag = false;
        this.objIdioma = {
            spain: null,
            england: null
        };
        this.estadoUsuario = {
            ok: null,
            ruta: null
        };
    }
    NavbarComponent.prototype.ngOnInit = function () {
        this.logo = environment_1.environment.logo;
        this.objIdioma.spain = environment_1.environment.spainFlag;
        this.objIdioma.england = environment_1.environment.englandFlag;
        // chequear estado del usuario logueado
        this.checkLogueado();
        this.btnResponsivo();
    };
    // chequear estado del usuario logueado
    NavbarComponent.prototype.checkLogueado = function () {
        return __awaiter(this, void 0, Promise, function () {
            var token, usuario, ruta;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = localStorage.getItem('token');
                        if (!!token) return [3 /*break*/, 1];
                        return [2 /*return*/];
                    case 1: return [4 /*yield*/, this.usuarioService.decodificarToken(token).toPromise()];
                    case 2:
                        usuario = _a.sent();
                        // usuario logueado
                        if (usuario.ok === true) {
                            this.estadoUsuario.ok = true;
                            ruta = usuario.usuarioDBToken.usuarioDB.role;
                            switch (ruta) {
                                case 'CBWYNROLE':
                                    this.estadoUsuario.ruta = '/user-dashboard';
                                    break;
                            }
                        }
                        else if (usuario.ok === false || usuario.ok === undefined || usuario.ok === null) {
                            this.estadoUsuario.ok = false;
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // salir del sistema
    NavbarComponent.prototype.salir = function () {
        var token = localStorage.getItem('token');
        if (!token) {
            this.router.navigate(['/inicio']);
        }
        else {
            localStorage.removeItem('token');
            this.router.navigate(['/entrar']);
        }
    };
    // traducir pagina
    NavbarComponent.prototype.traduceIngles = function (e) {
        var googleSelect2 = document.getElementsByClassName('goog-te-combo')[0];
        googleSelect2.value = 'en';
        googleSelect2.dispatchEvent(new Event('change'));
        // console.log(googleSelect2);
    };
    NavbarComponent.prototype.traduceEspaniol = function (e) {
        var googleSelect2 = document.getElementsByClassName('goog-te-combo')[0];
        googleSelect2.value = 'es';
        googleSelect2.dispatchEvent(new Event('change'));
        // console.log(googleSelect2);
    };
    NavbarComponent.prototype.btnResponsivo = function () {
        var _this = this;
        var paddingTop = document.getElementById('paddingTop');
        var imgLogo = document.getElementById('imgLogo');
        var row = document.getElementById('row');
        var contenedorPrincipal = this.contenedorPrincipal.nativeElement;
        var navPrincipal = this.navPrincipal.nativeElement;
        var ulItems = this.ulItems.nativeElement;
        var ulEntrar = this.ulEntrar.nativeElement;
        var bars = this.bars.nativeElement;
        bars.classList.add('fas', 'fa-bars');
        bars.style.fontSize = '1.4rem';
        // bars.style.zIndex = `9999`;
        var ulNavbar = document.getElementsByClassName('ulNavbar');
        var arrayUlnavbar = Array.from(ulNavbar);
        paddingTop.style.height = navPrincipal.clientHeight + "px";
        // paddingTop.style.width = `100vh`;
        // paddingTop.style.zIndex = '-999';
        var navResp = this.navResp.nativeElement;
        navResp.style.position = 'fixed';
        navResp.style.left = "0px";
        navResp.style.top = navPrincipal.clientHeight + "px";
        navResp.style.display = 'none';
        navResp.style.flexDirection = 'column';
        navResp.style.justifyContent = 'center';
        navResp.style.alignItems = 'center';
        navResp.style.width = '100vw';
        navResp.style.overflowY = 'scroll';
        setInterval(function () {
            navResp.style.height = window.innerHeight - navPrincipal.clientHeight + "px";
        }, 300);
        // navResp.style.height = 'auto';
        navResp.style.backgroundColor = 'white';
        navResp.style.border = '1px solid rgb(196, 196, 196)';
        // navResp.style.border = '1px solid red';
        navResp.style.zIndex = "9999";
        navResp.style.overflowY = 'scroll';
        ulItems.style.flexDirection = 'column';
        ulItems.style.justifyContent = 'center';
        ulItems.style.alignItems = 'center';
        // ulItems.style.backgroundColor = 'blue';
        ulItems.style.width = '80%';
        ulItems.style.margin = '0px';
        ulItems.style.padding = '0px';
        ulEntrar.style.flexDirection = 'column';
        ulEntrar.style.justifyContent = 'center';
        ulEntrar.style.alignItems = 'center';
        // ulEntrar.style.backgroundColor = 'green';
        ulEntrar.style.width = '80%';
        ulEntrar.style.marginRight = '0px';
        ulEntrar.style.padding = '0px';
        this.breakPointObserver
            .observe(['(max-width: 768px)'])
            .subscribe(function (state) {
            if (state.matches) {
                arrayUlnavbar.forEach(function (ulNav) {
                    ulNav.style.display = 'none';
                });
                // imgLogo.style.width = '50px';
                navPrincipal.style.height = '60px';
                // navPrincipal.style.flexDirection = 'column';
                ulItems.style.flexDirection = 'column';
                ulItems.style.width = '80%';
                ulEntrar.style.flexDirection = 'column';
                ulEntrar.style.width = '80%';
                bars.style.display = 'flex';
            }
            else {
                navPrincipal.style.height = '70px';
                // imgLogo.style.width = '60px';
                arrayUlnavbar.forEach(function (ulNav) {
                    ulNav.style.display = 'flex';
                });
                navPrincipal.style.flexDirection = 'row';
                ulItems.style.flexDirection = 'row';
                ulItems.style.width = 'auto';
                ulEntrar.style.flexDirection = 'row';
                ulEntrar.style.width = 'auto';
                bars.style.display = 'none';
                navResp.style.display = 'none';
                navPrincipal.append(ulItems, ulEntrar);
            }
        });
        this.breakPointObserver
            .observe(['(max-height: 404px)'])
            .subscribe(function (state) {
            if (state.matches) {
                ulItems.style.marginTop = navPrincipal.clientHeight + "px";
            }
            else {
                ulItems.style.margin = '0px';
            }
        });
        bars.addEventListener('click', function () {
            if (_this.flag === false) {
                ulEntrar.style.display = 'flex';
                ulItems.style.display = 'flex';
                navResp.classList.remove('animate__fadeOut');
                navResp.classList.add('animate__fadeIn');
                navResp.style.display = 'flex';
                navResp.append(ulItems, ulEntrar);
                bars.classList.remove('fa-bars');
                bars.classList.add('fa-times');
                _this.flag = true;
                // console.log(this.flag);
            }
            else {
                bars.classList.remove('fa-times');
                bars.classList.add('fa-bars');
                navResp.classList.add('animate__fadeOut');
                navResp.classList.remove('animate__fadeIn');
                setTimeout(function () {
                    navResp.style.display = 'none';
                }, 500);
                _this.flag = false;
                // console.log(this.flag);
            }
        });
    };
    __decorate([
        core_1.ViewChild('bars', { static: true })
    ], NavbarComponent.prototype, "bars");
    __decorate([
        core_1.ViewChild('navResp', { static: true })
    ], NavbarComponent.prototype, "navResp");
    __decorate([
        core_1.ViewChild('contenedorPrincipal', { static: true })
    ], NavbarComponent.prototype, "contenedorPrincipal");
    __decorate([
        core_1.ViewChild('ulEntrar', { static: true })
    ], NavbarComponent.prototype, "ulEntrar");
    __decorate([
        core_1.ViewChild('ulItems', { static: true })
    ], NavbarComponent.prototype, "ulItems");
    __decorate([
        core_1.ViewChild('navPrincipal', { static: true })
    ], NavbarComponent.prototype, "navPrincipal");
    NavbarComponent = __decorate([
        core_1.Component({
            selector: 'app-navbar',
            templateUrl: './navbar.component.html',
            styleUrls: ['./navbar.component.css']
        })
    ], NavbarComponent);
    return NavbarComponent;
}());
exports.NavbarComponent = NavbarComponent;
