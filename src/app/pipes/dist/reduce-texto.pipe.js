"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ReduceTextoPipe = void 0;
var core_1 = require("@angular/core");
var ReduceTextoPipe = /** @class */ (function () {
    function ReduceTextoPipe() {
    }
    ReduceTextoPipe.prototype.transform = function (data, cantTexto) {
        var nuevaData = data;
        if (nuevaData.length > 40) {
            nuevaData = data.slice(0, cantTexto) + "...";
            return nuevaData;
        }
        else {
            return data;
        }
    };
    ReduceTextoPipe = __decorate([
        core_1.Pipe({
            name: 'reduceTexto'
        })
        /* data
        cantidad texto a mostrar */
    ], ReduceTextoPipe);
    return ReduceTextoPipe;
}());
exports.ReduceTextoPipe = ReduceTextoPipe;
