import { Component, OnInit } from '@angular/core';

import { environment } from '../../../../environments/environment';
import { SidebarItems } from '../../../interfaces/itemsSidebar';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  logo: string;
  itemSidebar: SidebarItems[] = [];
  rutaPrincipal: string;
  urlElemento: string;

  constructor(
  ) { }

  ngOnInit(): void {

    this.logo = environment.logo;
    this.items();
    this.rutaPrincipal = '/user-dashboard/dashboard';
  }

  items(): void {

    this.itemSidebar.push(
      {
        icono: 'nav-icon fas fa-chart-line',
        nombre: 'Panel de control',
        routerlink: '/user-dashboard/dashboard',
        span: false,
      },
      {
        icono: 'nav-icon fas fa-user-alt',
        nombre: 'Emprendedor',
        routerlink: '/user-dashboard/nuevo',
        span: false,
        row: true,
        itemsThree: [
          {
            icono: 'nav-icon fas fa-plus',
            nombre: 'Nuevo negocio',
            routerlink: '/user-dashboard/nuevo',
            span: false
          },
          {
            icono: 'nav-icon fas fa-building',
            nombre: 'Mis negocios',
            routerlink: '/user-dashboard/mis-negocios',
            span: false
          },
          {
            icono: 'nav-icon fas fa-handshake',
            nombre: 'Negociaciones',
            routerlink: '/user-dashboard/interesados',
            span: false,
            row: true,
            itemsThree: [
              // {
              //   icono: 'nav-icon fas fa-dollar-sign',
              //   nombre: 'Interesados',
              //   routerlink: '/user-dashboard/interesados',
              //   span: false,
              // },
              {
                icono: 'nav-icon fas fa-store-slash',
                nombre: 'Cerrados',
                routerlink: '/user-dashboard/cerrados',
                span: false,
              }
            ]
          },
        ]
      },
      {
        icono: 'nav-icon fas fa-user-tie',
        nombre: 'Inversionista',
        routerlink: '/user-dashboard/aceptados',
        span: false,
        row: true,
        itemsThree: [
          // {
          //   icono: 'nav-icon fas fa-check-double',
          //   nombre: 'Aceptados',
          //   routerlink: '/user-dashboard/aceptados',
          //   span: false
          // },
          // {
          //   icono: 'nav-icon fas fa-eye',
          //   nombre: 'En revisión',
          //   routerlink: '/user-dashboard/revision',
          //   span: false
          // },
          {
            icono: 'nav-icon fas fa-heart',
            nombre: 'Favoritos',
            routerlink: '/user-dashboard/favoritos',
            span: false
          },
          {
            icono: 'nav-icon fas fa-heart',
            nombre: 'Cerrados',
            routerlink: '/user-dashboard/favoritos',
            span: false
          },
          // {
          //   icono: 'nav-icon fas fa-handshake',
          //   nombre: 'Negociaciones',
          //   routerlink: '/user-dashboard/interesados-inver',
          //   span: false,
          //   row: true,
          //   itemsThree: [
          //     {
          //       icono: 'nav-icon fas fa-dollar-sign',
          //       nombre: 'Interesados',
          //       routerlink: '/user-dashboard/interesados-inver',
          //       span: false,
          //     },
          //     // {
          //     //   icono: 'nav-icon fas fa-chart-line',
          //     //   nombre: 'Rechazados',
          //     //   routerlink: '/user-dashboard/rechazados',
          //     //   span: false,
          //     // }
          //   ]
          // },
        ]
      },
      // {
      //   icono: 'nav-icon fas fa-bell',
      //   nombre: 'Notificaciones',
      //   routerlink: '/user-dashboard/notificaciones',
      //   span: false,
      // }
    );
  }
}
