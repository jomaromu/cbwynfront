"use strict";
exports.__esModule = true;
exports.PAGES_ROUTES = void 0;
var router_1 = require("@angular/router");
// componentes
// ADMIN
var admin_component_1 = require("./registers/admin/admin.component");
// USUARIOS
var dash_user_component_1 = require("./registers/usuarios/dash-user/dash-user.component");
var aceptados_component_1 = require("./registers/usuarios/aceptados/aceptados.component");
var revision_component_1 = require("./registers/usuarios/revision/revision.component");
var favoritos_component_1 = require("./registers/usuarios/favoritos/favoritos.component");
var user_component_1 = require("./registers/usuarios/user.component");
var negociaciones_component_1 = require("./registers/usuarios/negociaciones/negociaciones.component");
var nuevo_negocio_component_1 = require("./registers/usuarios/nuevo-negocio/nuevo-negocio.component");
var mis_negocios_component_1 = require("./registers/usuarios/mis-negocios/mis-negocios.component");
var interesados_emprende_component_1 = require("./registers/usuarios/interesados-emprende/interesados-emprende.component");
var cerrados_emprende_component_1 = require("./registers/usuarios/cerrados-emprende/cerrados-emprende.component");
var intereados_inver_component_1 = require("./registers/usuarios/intereados-inver/intereados-inver.component");
var rechazados_component_1 = require("./registers/usuarios/rechazados/rechazados.component");
var notificaciones_component_1 = require("./registers/usuarios/notificaciones/notificaciones.component");
var checkout_component_1 = require("./registers/usuarios/checkout/checkout.component");
// guards
var user_guard_1 = require("../guards/user.guard");
var pagesRoutes = [
    { path: 'administrador', component: admin_component_1.AdminComponent },
    {
        path: 'user-dashboard', component: user_component_1.UserComponent, canActivate: [user_guard_1.UserGuard],
        children: [
            { path: 'dashboard', component: dash_user_component_1.DashUserComponent },
            { path: 'nuevo', component: nuevo_negocio_component_1.NuevoNegocioComponent },
            { path: 'mis-negocios', component: mis_negocios_component_1.MisNegociosComponent },
            { path: 'negociaciones', component: negociaciones_component_1.NegociacionesComponent },
            { path: 'interesados', component: interesados_emprende_component_1.InteresadosEmprendeComponent },
            { path: 'cerrados', component: cerrados_emprende_component_1.CerradosEmprendeComponent },
            { path: 'aceptados', component: aceptados_component_1.AceptadosComponent },
            { path: 'revision', component: revision_component_1.RevisionComponent },
            { path: 'favoritos', component: favoritos_component_1.FavoritosComponent },
            { path: 'negociaciones', component: negociaciones_component_1.NegociacionesComponent },
            { path: 'interesados-inver', component: intereados_inver_component_1.IntereadosInverComponent },
            { path: 'rechazados', component: rechazados_component_1.RechazadosComponent },
            { path: 'notificaciones', component: notificaciones_component_1.NotificacionesComponent },
            { path: '', component: dash_user_component_1.DashUserComponent },
            { path: '**', pathMatch: 'full', redirectTo: 'user-dashboard' },
        ]
    },
    { path: 'checkout', component: checkout_component_1.CheckoutComponent, canActivate: [user_guard_1.UserGuard] },
];
// export class RoutingModuleModule { }
exports.PAGES_ROUTES = router_1.RouterModule.forChild(pagesRoutes);
