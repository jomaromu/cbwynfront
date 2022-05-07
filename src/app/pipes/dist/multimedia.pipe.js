"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MultimediaPipe = void 0;
var core_1 = require("@angular/core");
var environment_1 = require("../../environments/environment");
var MultimediaPipe = /** @class */ (function () {
    function MultimediaPipe(http) {
        this.http = http;
    }
    MultimediaPipe.prototype.transform = function (data, tipo) {
        // console.log(tipo);
        if (!data) {
            return '../../assets/img/logo-final-portada.png';
            // return;
        }
        else if (!tipo) {
            // const arrayData = data.split('\\'); // local
            var arrayData = data.split('/'); // nube
            // const path = `${arrayData[6]}/${arrayData[7]}/${arrayData[8]}`;
            // const pathMultimedia = arrayData[arrayData.length - 1];
            // const pathUsuario = arrayData[arrayData.length - 2];
            // const pathCarpeta = arrayData[arrayData.length - 3];
            var pathUsuario = arrayData[arrayData.length - 3];
            var pathNeogocio = arrayData[arrayData.length - 2];
            var pathMultimedia = arrayData[arrayData.length - 1];
            // const url = `${environment.urlBack}/negocio/getMultimediaAll?multi=${path}`;
            var url = environment_1.environment.urlBack + "/negocio/getMultimediaAll?multi=" + pathUsuario + "/" + pathNeogocio + "/" + pathMultimedia;
            return url;
        }
        else if (tipo === 'perfil') {
            // const arrayData = data.split('\\'); // local
            var arrayData = data.split('/'); // nube
            var pathUsuario = arrayData[arrayData.length - 3];
            // const pathUsuario = arrayData[arrayData.length - 2];
            var pathMultimedia = arrayData[arrayData.length - 1];
            var pathPerfil = arrayData[arrayData.length - 2];
            var url = environment_1.environment.urlBack + "/usuario/getMultimediaAll?multi=" + pathUsuario + "/" + pathPerfil + "/" + pathMultimedia;
            // const url = `${environment.urlBack}/usuario/getMultimediaAll?multi=${pathUsuario}/${pathMultimedia}`;
            // console.log(pathUsuario, pathPerfil, pathMultimedia);
            return url;
        }
    };
    MultimediaPipe = __decorate([
        core_1.Pipe({
            name: 'multimedia'
        })
    ], MultimediaPipe);
    return MultimediaPipe;
}());
exports.MultimediaPipe = MultimediaPipe;
