"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BannerComponent = void 0;
var core_1 = require("@angular/core");
var BannerComponent = /** @class */ (function () {
    function BannerComponent(proyectoService, router) {
        this.proyectoService = proyectoService;
        this.router = router;
        this.criterioBusqueda = {
            cantidad: null,
            categoria: null,
            ubicacion: null
        };
    }
    BannerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.proyectoService.getDataBusqueda()
            // tslint:disable-next-line: deprecation
            .subscribe(function (data) {
            _this.criterioBusqueda = data;
        });
    };
    BannerComponent.prototype.busqueda = function (e, pais, categoria) {
        var valuePais = pais.value;
        var valueCategoria = categoria.value;
        // const valueCantidad = cantidad.value;
        this.objetoCriterio = {
            ubicacion: valuePais,
            categoria: valueCategoria
        };
        // tslint:disable-next-line: max-line-length
        this.router.navigate(['/negocios'], { queryParams: { ubicacion: this.objetoCriterio.ubicacion, categoria: this.objetoCriterio.categoria, cantidad: this.objetoCriterio.cantidad } });
    };
    __decorate([
        core_1.Input()
    ], BannerComponent.prototype, "imgBanner");
    __decorate([
        core_1.Input()
    ], BannerComponent.prototype, "tituloBanner");
    BannerComponent = __decorate([
        core_1.Component({
            selector: 'app-banner',
            templateUrl: './banner.component.html',
            styleUrls: ['./banner.component.css']
        })
    ], BannerComponent);
    return BannerComponent;
}());
exports.BannerComponent = BannerComponent;
