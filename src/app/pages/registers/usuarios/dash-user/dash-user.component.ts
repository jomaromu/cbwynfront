import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-dash-user',
  templateUrl: './dash-user.component.html',
  styleUrls: ['./dash-user.component.css']
})
export class DashUserComponent implements OnInit, AfterViewInit {

  @ViewChild('contentWrapper', { static: true }) contentWrapper: ElementRef<HTMLElement>;


  constructor() { }

  ngOnInit(): void {
    // this.scripts();
  }

  ngAfterViewInit(): void {
    this.scripts();
  }

  scripts(): void {
    // const contentWrapper = this.contentWrapper.nativeElement;
    // const navResp = document.getElementById('contenedorPrincipal');

    // const alto = navResp.clientHeight;

    // contentWrapper.style.marginTop = `${(alto + 15)}px`;

    // console.log(navResp);

    const navbarExpand: any = document.getElementsByClassName('navbar-expand')[0];
    const formInline: any = document.getElementsByClassName('form-inline')[0];
    const navLink: any = document.getElementsByClassName('nav-link')[0];
    const i = navLink.querySelector('.fa-bars');

    // navbarExpand.style.marginTop = '60px';

    formInline.style.display = 'none'; // caja de busqueda
    i.style.color = 'black';

    const cajaDeBusqueda = setInterval(() => {

      if (!formInline) {
        clearInterval(cajaDeBusqueda);
      } else {
        formInline.style.display = 'none'; // caja de busqueda
        clearInterval(cajaDeBusqueda);
      }
    }, 10);

    const detectPadding = setInterval(() => {

      const paddingTop = document.getElementById('paddingTop');

      if (!paddingTop || (paddingTop.clientHeight === 0)) {
        navbarExpand.style.marginTop = '60px';
        clearInterval(detectPadding);
      }

    }, 10);
  }

}
