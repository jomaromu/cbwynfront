"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DashUserComponent = void 0;
var core_1 = require("@angular/core");
var DashUserComponent = /** @class */ (function () {
    function DashUserComponent() {
    }
    DashUserComponent.prototype.ngOnInit = function () {
        // this.scripts();
    };
    DashUserComponent.prototype.ngAfterViewInit = function () {
        this.scripts();
    };
    DashUserComponent.prototype.scripts = function () {
        // const contentWrapper = this.contentWrapper.nativeElement;
        // const navResp = document.getElementById('contenedorPrincipal');
        // const alto = navResp.clientHeight;
        // contentWrapper.style.marginTop = `${(alto + 15)}px`;
        // console.log(navResp);
        var navbarExpand = document.getElementsByClassName('navbar-expand')[0];
        var formInline = document.getElementsByClassName('form-inline')[0];
        var navLink = document.getElementsByClassName('nav-link')[0];
        var i = navLink.querySelector('.fa-bars');
        // navbarExpand.style.marginTop = '60px';
        formInline.style.display = 'none'; // caja de busqueda
        i.style.color = 'black';
        var cajaDeBusqueda = setInterval(function () {
            if (!formInline) {
                clearInterval(cajaDeBusqueda);
            }
            else {
                formInline.style.display = 'none'; // caja de busqueda
                clearInterval(cajaDeBusqueda);
            }
        }, 10);
        var detectPadding = setInterval(function () {
            var paddingTop = document.getElementById('paddingTop');
            if (!paddingTop || (paddingTop.clientHeight === 0)) {
                navbarExpand.style.marginTop = '60px';
                clearInterval(detectPadding);
            }
        }, 10);
    };
    __decorate([
        core_1.ViewChild('contentWrapper', { static: true })
    ], DashUserComponent.prototype, "contentWrapper");
    DashUserComponent = __decorate([
        core_1.Component({
            selector: 'app-dash-user',
            templateUrl: './dash-user.component.html',
            styleUrls: ['./dash-user.component.css']
        })
    ], DashUserComponent);
    return DashUserComponent;
}());
exports.DashUserComponent = DashUserComponent;
