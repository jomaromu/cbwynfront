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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.NegociosComponent = void 0;
var core_1 = require("@angular/core");
var sweetalert2_1 = require("sweetalert2");
var NegociosComponent = /** @class */ (function () {
    function NegociosComponent(proyectoService, usuarioService, proyectosService, route, breakPointObserver, router) {
        this.proyectoService = proyectoService;
        this.usuarioService = usuarioService;
        this.proyectosService = proyectosService;
        this.route = route;
        this.breakPointObserver = breakPointObserver;
        this.router = router;
        this.monto = 0;
        // la cantdiad de texto va basado en el size de la pagina
        this.cantTexto = 40;
        this.cantDesc = 100;
        this.heart = '../../../../assets/img/heart.svg';
        this.TodosLosNeg = [];
        this.criterioBusqueda = {
            cantidad: null,
            categoria: null,
            ubicacion: null
        };
    }
    NegociosComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.scroll();
        this.responsivo();
        this.cargaNegociosInicial();
        this.proyectoService.getDataBusqueda()
            // tslint:disable-next-line: deprecation
            .subscribe(function (data) {
            _this.criterioBusqueda = data;
        });
        this.posicionDivBusqueda();
        this.cargarFavoritos();
    };
    NegociosComponent.prototype.reudceTexto = function () {
        var _this = this;
        this.breakPointObserver
            .observe(['(max-width: 1800px)'])
            .subscribe(function (state) {
            if (state.matches) {
                _this.cantTexto = 40;
                _this.cantDesc = 100;
            }
        });
    };
    NegociosComponent.prototype.posicionDivBusqueda = function () {
        var _this = this;
        window.addEventListener('scroll', function (e) {
            var divBusqueda = _this.divBusqueda.nativeElement;
            var offset = divBusqueda.offsetTop;
            var scroll = document.scrollingElement.scrollTop;
            _this.breakPointObserver
                .observe(['(max-width: 768px)'])
                .subscribe(function (state) {
                if (state.matches) {
                    if (scroll >= 158) {
                        divBusqueda.style.position = 'fixed';
                        // divBusqueda.style.width = '700px';
                        divBusqueda.style.top = '-35px';
                    }
                    else {
                        divBusqueda.style.position = 'initial';
                    }
                }
                else {
                    if (scroll >= 208) {
                        divBusqueda.style.position = 'fixed';
                        // divBusqueda.style.width = '700px';
                        divBusqueda.style.top = '-25px';
                    }
                    else {
                        divBusqueda.style.position = 'initial';
                    }
                }
            });
            _this.breakPointObserver
                .observe(['(max-width: 576px)'])
                .subscribe(function (state) {
                if (state.matches) {
                    // console.log(scroll);
                    if (scroll >= 128) {
                        divBusqueda.style.position = 'fixed';
                        // divBusqueda.style.width = '700px';
                        divBusqueda.style.top = '-45px';
                    }
                    else {
                        divBusqueda.style.position = 'initial';
                    }
                }
            });
            _this.breakPointObserver
                .observe(['(max-width: 440px)'])
                .subscribe(function (state) {
                if (state.matches) {
                    // console.log(scroll);
                    if (scroll >= 105) {
                        divBusqueda.style.position = 'fixed';
                        // divBusqueda.style.width = '700px';
                        divBusqueda.style.top = '-45px';
                    }
                    else {
                        divBusqueda.style.position = 'initial';
                    }
                }
            });
            _this.breakPointObserver
                .observe(['(max-width: 400px)'])
                .subscribe(function (state) {
                if (state.matches) {
                    // console.log(scroll);
                    if (scroll >= 120) {
                        divBusqueda.style.position = 'fixed';
                        // divBusqueda.style.width = '700px';
                        divBusqueda.style.top = '-60px';
                    }
                    else {
                        divBusqueda.style.position = 'initial';
                    }
                }
            });
            _this.breakPointObserver
                .observe(['(max-width: 340px)'])
                .subscribe(function (state) {
                if (state.matches) {
                    // console.log(scroll);
                    if (scroll >= 105) {
                        divBusqueda.style.position = 'fixed';
                        // divBusqueda.style.width = '700px';
                        divBusqueda.style.top = '-45px';
                    }
                    else {
                        divBusqueda.style.position = 'initial';
                    }
                }
            });
        });
    };
    NegociosComponent.prototype.busqueda = function (e, pais, categoria, cantidad) {
        var _this = this;
        var valuePais = pais.value;
        var valueCategoria = categoria.value;
        var valueCantidad = cantidad.value;
        var divVerMas = document.getElementById('divVerMas');
        // console.log(cantidad.value);
        this.objetoCriterio = {
            ubicacion: valuePais,
            categoria: valueCategoria,
            cantidad: valueCantidad
        };
        this.proyectoService.busqueda(this.objetoCriterio)
            .subscribe(function (data) {
            // this.TodosLosNeg = data.negocioDB;
            var actual = data.negocioDB.splice(0, 5);
            var negocios = data.negocioDB;
            _this.arrayTemp = __spreadArrays(negocios);
            // console.log(this.arrayTemp);
            if (_this.arrayTemp.length <= 0) {
                divVerMas.style.display = 'none';
            }
            else {
                divVerMas.style.display = 'block';
            }
            _this.TodosLosNeg = actual;
            _this.cargarFavoritos();
            // console.log(actual);
            // console.log(data.negocioDB);
            // console.log(actual);
        });
    };
    NegociosComponent.prototype.verTodos = function () {
        var _this = this;
        var opcionPais = this.opcionPais.nativeElement;
        var opcionCategoria = this.opcionCategoria.nativeElement;
        var opcionCantidad = this.opcionCantidad.nativeElement;
        opcionPais.value = 'null';
        opcionCategoria.value = 'null';
        opcionCantidad.value = 'null';
        this.objetoCriterio = {
            ubicacion: 'null',
            categoria: 'null',
            cantidad: 'null'
        };
        var divVerMas = document.getElementById('divVerMas');
        this.proyectoService.busqueda(this.objetoCriterio)
            .subscribe(function (data) {
            // this.TodosLosNeg = data.negocioDB;
            var actual = data.negocioDB.splice(0, 5);
            var negocios = data.negocioDB;
            _this.arrayTemp = __spreadArrays(negocios);
            // if (this.arrayTemp.length <= 0) {
            //   divVerMas.style.display = 'none';
            // } else {
            //   divVerMas.style.display = 'block';
            // }
            _this.TodosLosNeg = actual;
            _this.cargarFavoritos();
        });
    };
    NegociosComponent.prototype.cargaNegociosInicial = function () {
        return __awaiter(this, void 0, Promise, function () {
            var token, data, actual, usuario, actual;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = localStorage.getItem('token');
                        return [4 /*yield*/, this.proyectoService.obtenerTodos().toPromise()];
                    case 1:
                        data = _a.sent();
                        if (!!token) return [3 /*break*/, 2];
                        this.arrayTemp = data.negocioDB;
                        actual = data.negocioDB.splice(0, 5);
                        this.TodosLosNeg = actual;
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.usuarioService.decodificarToken(token).toPromise()];
                    case 3:
                        usuario = _a.sent();
                        this.idUsuario = usuario.usuarioDBToken.usuarioDB._id;
                        this.arrayTemp = data.negocioDB;
                        actual = data.negocioDB.splice(0, 5);
                        this.TodosLosNeg = actual;
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    NegociosComponent.prototype.paginacion = function (limite) {
        return __awaiter(this, void 0, Promise, function () {
            var divVerMas, cantNegocios, arrayLocalTem, data;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        divVerMas = document.getElementById('divVerMas');
                        cantNegocios = this.arrayTemp.length;
                        // || cantNegocios === this.arrayTemp.length
                        if (cantNegocios <= 0) {
                            // ocultar boton ver
                            // quitar cargar data
                            divVerMas.style.display = 'none';
                            // console.log('no hay mas');
                        }
                        else {
                            // quitar cargar data
                            divVerMas.style.display = 'block';
                            arrayLocalTem = this.arrayTemp.splice(0, limite);
                            (_a = this.TodosLosNeg).push.apply(_a, arrayLocalTem);
                        }
                        return [4 /*yield*/, this.proyectoService.obtenerTodos().toPromise()];
                    case 1:
                        data = _b.sent();
                        if (this.TodosLosNeg.length === data.negocioDB.length) {
                            divVerMas.style.display = 'none';
                        }
                        this.cargarFavoritos();
                        return [2 /*return*/];
                }
            });
        });
    };
    NegociosComponent.prototype.verNegocio = function (idNegocio) {
        var _this = this;
        this.route.queryParams.subscribe(function (queries) {
            _this.router.navigate(["/negocio"], { queryParams: { id: idNegocio } });
        });
    };
    NegociosComponent.prototype.responsivo = function () {
        var divPrincipal = this.divPrincipal.nativeElement;
        this.breakPointObserver
            .observe(['(max-width: 768px)'])
            .subscribe(function (state) {
            if (state.matches) {
                divPrincipal.style.marginTop = '20px';
            }
        });
    };
    NegociosComponent.prototype.scroll = function () {
        window.scroll(0, 0);
    };
    NegociosComponent.prototype.favorito = function (e, idNegocio) {
        return __awaiter(this, void 0, Promise, function () {
            var token, usuario, idUsuario, fd, respBusqueda, respBorrado, respCreado;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = localStorage.getItem('token');
                        if (!!token) return [3 /*break*/, 1];
                        // no hay usuario logueado
                        console.log('entrar para poder poner en favorito');
                        this.router.navigate(['/entrar']);
                        return [3 /*break*/, 7];
                    case 1: return [4 /*yield*/, this.usuarioService.decodificarToken(token).toPromise()];
                    case 2:
                        usuario = _a.sent();
                        idUsuario = usuario.usuarioDBToken.usuarioDB._id;
                        fd = new FormData();
                        fd.append('idNegocio', idNegocio);
                        fd.append('idUsuario', idUsuario);
                        return [4 /*yield*/, this.proyectoService.buscarFavorito(fd).toPromise()];
                    case 3:
                        respBusqueda = _a.sent();
                        if (!(respBusqueda.ok === true && respBusqueda.existe === true)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.proyectoService.eliminarFavorito(idUsuario, idNegocio).toPromise()];
                    case 4:
                        respBorrado = _a.sent();
                        if (respBorrado.ok === true) {
                            e.target.setAttribute('src', '../../../../assets/img/heart.svg');
                            console.log('favorito borrado');
                        }
                        _a.label = 5;
                    case 5:
                        if (!(respBusqueda.ok === true && respBusqueda.existe === false)) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.proyectoService.crearFavorito(fd).toPromise()];
                    case 6:
                        respCreado = _a.sent();
                        if (respCreado.ok === true) {
                            e.target.setAttribute('src', '../../../../assets/img/heart2.gif');
                            console.log('favorito creado');
                        }
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    NegociosComponent.prototype.cargarFavoritos = function () {
        return __awaiter(this, void 0, Promise, function () {
            var token, usuario, idUsuario, respFavs_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = localStorage.getItem('token');
                        if (!!token) return [3 /*break*/, 1];
                        this.heart = '../../../../assets/img/heart.svg';
                        return [3 /*break*/, 4];
                    case 1: return [4 /*yield*/, this.usuarioService.decodificarToken(token).toPromise()];
                    case 2:
                        usuario = _a.sent();
                        idUsuario = usuario.usuarioDBToken.usuarioDB._id;
                        return [4 /*yield*/, this.proyectoService.obtenerFavoritos(idUsuario).toPromise()];
                    case 3:
                        respFavs_1 = _a.sent();
                        // console.log(respFavs);
                        if (respFavs_1.ok === true) {
                            setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                                var imgFavorito, idNegocio, todosLosNeg, arrayNegs, imgFavoritoClass, arrayImgFav, _loop_1, i;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            imgFavorito = this.imgFavorito.nativeElement;
                                            idNegocio = imgFavorito.dataset.sectionvalue;
                                            return [4 /*yield*/, this.proyectoService.obtenerTodos().toPromise()];
                                        case 1:
                                            todosLosNeg = _a.sent();
                                            arrayNegs = todosLosNeg.negocioDB;
                                            imgFavoritoClass = document.getElementsByClassName('imgFavorito');
                                            arrayImgFav = Array.from(imgFavoritoClass);
                                            _loop_1 = function (i) {
                                                if (!respFavs_1.favoritosDB[i]) {
                                                    // imgFavoritoClass[i].setAttribute('src', '../../../../assets/img/heart.svg');
                                                    // console.log('nook');
                                                }
                                                if (respFavs_1.favoritosDB[i]) {
                                                    var respArray = arrayImgFav.filter(function (img) {
                                                        if (respFavs_1.favoritosDB[i].negocio === img.dataset.sectionvalue) {
                                                            return img;
                                                        }
                                                    });
                                                    for (var _i = 0, respArray_1 = respArray; _i < respArray_1.length; _i++) {
                                                        var img = respArray_1[_i];
                                                        img.setAttribute('src', '../../../../assets/img/heart2.gif');
                                                    }
                                                }
                                            };
                                            for (i = 0; i < arrayNegs.length; i++) {
                                                _loop_1(i);
                                            }
                                            return [2 /*return*/];
                                    }
                                });
                            }); }, 100);
                        }
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    NegociosComponent.prototype.contactar = function (e, idNegocio, negocio) {
        return __awaiter(this, void 0, Promise, function () {
            var monto, token, usuario, idUsuario, role, body, fondo_1, alert_1, wrapDescAlert, divIcon, i, titulo, wrapButtons, aceptar_1, cancelar_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        monto = negocio.monto;
                        console.log(typeof (monto));
                        token = localStorage.getItem('token');
                        localStorage.setItem('statusCheck', 'true');
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
                            if (negocio.usuario === idUsuario) {
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
        core_1.ViewChild('divBusqueda', { static: true })
    ], NegociosComponent.prototype, "divBusqueda");
    __decorate([
        core_1.ViewChild('divPrincipal', { static: true })
    ], NegociosComponent.prototype, "divPrincipal");
    __decorate([
        core_1.ViewChild('divInputBusqueda', { static: true })
    ], NegociosComponent.prototype, "divInputBusqueda");
    __decorate([
        core_1.ViewChild('opcionPais', { static: true })
    ], NegociosComponent.prototype, "opcionPais");
    __decorate([
        core_1.ViewChild('opcionCategoria', { static: true })
    ], NegociosComponent.prototype, "opcionCategoria");
    __decorate([
        core_1.ViewChild('opcionCantidad', { static: true })
    ], NegociosComponent.prototype, "opcionCantidad");
    __decorate([
        core_1.ViewChild('imgFavorito', { static: false })
    ], NegociosComponent.prototype, "imgFavorito");
    NegociosComponent = __decorate([
        core_1.Component({
            selector: 'app-negocios',
            templateUrl: './negocios.component.html',
            styleUrls: ['./negocios.component.css']
        })
    ], NegociosComponent);
    return NegociosComponent;
}());
exports.NegociosComponent = NegociosComponent;
