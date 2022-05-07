"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProyectosService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var environment_1 = require("../../environments/environment");
var ProyectosService = /** @class */ (function () {
    function ProyectosService(http) {
        this.http = http;
    }
    // crear un negocio
    ProyectosService.prototype.crearProyecto = function (proyecto) {
        var url = environment_1.environment.urlBack + "/negocio/nuevoNegocio";
        return this.http.post(url, proyecto, { reportProgress: true, observe: 'events' })
            .pipe(operators_1.map(function (data) {
            return data;
        }));
    };
    // obtener todos los negocios
    ProyectosService.prototype.obtenerTodos = function () {
        var url = environment_1.environment.urlBack + "/negocio/obtenerTodos";
        return this.http.get(url)
            .pipe(operators_1.map(function (data) {
            return data;
        }));
    };
    // obtener negocio por id
    ProyectosService.prototype.obtenerNegocio = function (idNegocio) {
        var url = environment_1.environment.urlBack + "/negocio/getOne?id=" + idNegocio;
        return this.http.get(url)
            .pipe(operators_1.map(function (data) {
            return data;
        }));
    };
    // obtener los datos de la busqueda
    ProyectosService.prototype.getDataBusqueda = function () {
        var urlUbica = '../../assets/json/ubicacion.json';
        var urlCat = '../../assets/json/categoria.json';
        var urlCant = '../../assets/json/cantidad.json';
        var ubicacion = this.http.get(urlUbica);
        var categoria = this.http.get(urlCat);
        var cantidad = this.http.get(urlCant);
        return rxjs_1.forkJoin([ubicacion, categoria, cantidad])
            .pipe(operators_1.map(function (data) {
            var objCriterio = {
                ubicacion: data[0],
                categoria: data[1],
                cantidad: data[2]
            };
            return objCriterio;
        }));
    };
    // busqueda
    ProyectosService.prototype.busqueda = function (objCriterio) {
        var url = environment_1.environment.urlBack + "/negocio/busqueda?ubicacion=" + objCriterio.ubicacion + "&categoria=" + objCriterio.categoria + "&cantidad=" + objCriterio.cantidad;
        return this.http.get(url)
            .pipe(operators_1.map(function (data) {
            return data;
        }));
    };
    // eliminar un negocio
    ProyectosService.prototype.eliminarNegocio = function (negocio) {
        var header = new http_1.HttpHeaders({ idNegocio: negocio._id, idUsuario: negocio.usuario, pathNegocio: negocio.rutaCorta });
        var url = environment_1.environment.urlBack + "/negocio/eliminarNegocio";
        return this.http["delete"](url, { headers: header })
            .pipe(operators_1.map(function (data) {
            return data;
        }));
    };
    // actualizar un negocio
    ProyectosService.prototype.actualizarNegocio = function (idNegocio, datos) {
        var url = environment_1.environment.urlBack + "/negocio/editarNegocio";
        var header = new http_1.HttpHeaders({ idNegocio: idNegocio });
        return this.http.put(url, datos, { headers: header })
            .pipe(operators_1.map(function (resp) {
            return resp;
        }));
    };
    // buscar favorito
    ProyectosService.prototype.buscarFavorito = function (data) {
        var url = environment_1.environment.urlBack + "/negocio/buscarFavorito";
        return this.http.post(url, data)
            .pipe(operators_1.map(function (resp) {
            return resp;
        }));
    };
    // crear favorito
    ProyectosService.prototype.crearFavorito = function (data) {
        var url = environment_1.environment.urlBack + "/negocio/crearFavorito";
        return this.http.post(url, data)
            .pipe(operators_1.map(function (resp) {
            return resp;
        }));
    };
    // eliminar favorito
    ProyectosService.prototype.eliminarFavorito = function (idUsuario, idNegocio) {
        var url = environment_1.environment.urlBack + "/negocio/eliminarFavorito";
        var header = new http_1.HttpHeaders({ idNegocio: idNegocio, idUsuario: idUsuario });
        return this.http["delete"](url, { headers: header })
            .pipe(operators_1.map(function (resp) {
            return resp;
        }));
    };
    ProyectosService.prototype.obtenerFavoritos = function (idUsuario) {
        var url = environment_1.environment.urlBack + "/negocio/obtenerFavoritos";
        var header = new http_1.HttpHeaders({ idUsuario: idUsuario });
        return this.http.get(url, { headers: header })
            .pipe(operators_1.map(function (resp) {
            return resp;
        }));
    };
    // obtener docuementos y enlace del negocio
    ProyectosService.prototype.getDocsNeg = function () {
        var objDocsNeg = {};
        var url = environment_1.environment.urlBack + "negocio/obtenerDoc";
        var header = new http_1.HttpHeaders({ objDocsNeg: objDocsNeg });
        return this.http.get(url, { headers: header })
            .pipe(operators_1.map(function (resp) {
            return resp;
        }));
    };
    // envio de correo de compra para contacto a negocio
    ProyectosService.prototype.correoContacto = function (data) {
        // console.log(pathNegocio);
        var url = environment_1.environment.urlBack + "/negocio/contactoNegocio";
        return this.http.post(url, data)
            .pipe(operators_1.map(function (resp) {
            return resp;
        }));
    };
    // envio de correo de la plataforma
    ProyectosService.prototype.correoPlataforma = function (data) {
        var url = environment_1.environment.urlBack + "/negocio/contactoPlataforma";
        return this.http.post(url, data)
            .pipe(operators_1.map(function (resp) {
            return resp;
        }));
    };
    ProyectosService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ProyectosService);
    return ProyectosService;
}());
exports.ProyectosService = ProyectosService;
