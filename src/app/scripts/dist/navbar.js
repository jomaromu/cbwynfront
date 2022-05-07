"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NavbarResponsivo = void 0;
var core_1 = require("@angular/core");
var NavbarResponsivo = /** @class */ (function () {
    function NavbarResponsivo(breakPointObserver) {
        this.breakPointObserver = breakPointObserver;
        this.flag = false;
    }
    NavbarResponsivo.prototype.manejaNavbar = function () {
        var _this = this;
        var row = document.getElementById('row');
        var navPrincipal = document.getElementById('navPrincipal');
        var imgLogo = document.getElementById('imgLogo');
        var bars = document.getElementById('bars');
        var alto = navPrincipal.clientHeight;
        var body = document.body;
        body.style.marginTop = alto + "px";
        var ulNavbar = document.getElementsByClassName('ulNavbar');
        var arrayulNavbar = Array.from(ulNavbar);
        // const rowResp = document.createElement('div');
        this.breakPointObserver
            .observe(['(max-width: 1400px)'])
            .subscribe(function (state) {
            if (state.matches) {
                row.style.width = "80%";
            }
            else {
                // row.style.width = `60%`;
            }
        });
        this.breakPointObserver
            .observe(['(max-width: 992px)'])
            .subscribe(function (state) {
            if (state.matches) {
                row.style.width = "90%";
            }
            else {
                // row.style.width = `60%`;
            }
        });
        this.breakPointObserver
            .observe(['(max-width: 768px)'])
            .subscribe(function (state) {
            if (state.matches) {
                arrayulNavbar.forEach(function (item) {
                    item.style.display = 'none';
                });
                imgLogo.style.width = '50px';
                _this.eventoBtnResp(bars);
            }
            else {
                arrayulNavbar.forEach(function (item) {
                    item.style.display = 'flex';
                });
                bars.style.display = 'none';
                imgLogo.style.width = '60px';
            }
        });
    };
    NavbarResponsivo.prototype.eventoBtnResp = function (bars) {
        var _this = this;
        bars.classList.add('fas', 'fa-bars');
        bars.setAttribute('id', 'menuResp');
        bars.style.fontSize = '1.7rem';
        bars.style.color = 'rgb(72, 79, 86)';
        bars.style.display = 'flex';
        var rowResp = document.createElement('div');
        var navPrincipal = document.getElementById('navPrincipal');
        var cerrar = document.createElement('i');
        var ulItems = document.getElementById('ulItems');
        var ulEntrar = document.getElementById('ulEntrar');
        bars.addEventListener('click', function (e) {
            if (_this.flag === false) {
                // desplegar menu
                // navPrincipal.style.padding = `0px`;
                navPrincipal.style.flexDirection = "column";
                // rowResp.style.border = `1px solid red`;
                rowResp.style.position = "fixed";
                rowResp.style.top = "0px";
                rowResp.style.left = '0px';
                rowResp.style.width = "100vw";
                rowResp.style.height = "100vh";
                rowResp.style.display = "flex";
                rowResp.style.flexDirection = "column";
                rowResp.style.justifyContent = "center";
                rowResp.style.alignItems = "center";
                rowResp.style.backgroundColor = "white";
                rowResp.style.zIndex = '9999';
                ulItems.style.display = "flex";
                ulItems.style.flexDirection = "column";
                ulItems.style.justifyContent = "center";
                ulItems.style.alignItems = "center";
                ulItems.style.width = "90%";
                // ulItems.style.backgroundColor = `red`;
                ulEntrar.style.display = "flex";
                ulEntrar.style.flexDirection = "column";
                ulEntrar.style.justifyContent = "center";
                ulEntrar.style.alignItems = "center";
                ulEntrar.style.width = "90%";
                // ulEntrar.style.backgroundColor = `blue`;
                cerrar.classList.add('fas', 'fa-times');
                cerrar.setAttribute('id', 'cerrarResp');
                cerrar.style.position = "fixed";
                cerrar.style.top = "40px";
                cerrar.style.right = "40px";
                cerrar.style.fontSize = "1.7rem";
                rowResp.append(cerrar, ulItems, ulEntrar);
                navPrincipal.append(rowResp);
                console.log(_this.flag);
                _this.flag = true;
            }
            else {
                // recoger menu
                rowResp.style.display = "none";
                console.log(_this.flag);
                _this.flag = false;
            }
        });
        cerrar.addEventListener('click', function (e) {
            console.log(_this.flag);
            if (_this.flag === true) {
                rowResp.style.display = 'none';
                navPrincipal.style.flexDirection = "row";
                ulItems.style.display = "none";
                ulItems.style.flexDirection = 'row';
                ulItems.style.alignItems = 'center';
                ulItems.style.width = 'auto';
                ulEntrar.style.display = "none";
                ulEntrar.style.flexDirection = 'row';
                ulEntrar.style.alignItems = 'center';
                ulEntrar.style.width = 'auto';
                bars.style.display = 'flex';
                navPrincipal.append(ulItems, ulEntrar);
                _this.flag = false;
            }
        });
    };
    NavbarResponsivo = __decorate([
        core_1.Injectable()
    ], NavbarResponsivo);
    return NavbarResponsivo;
}());
exports.NavbarResponsivo = NavbarResponsivo;
