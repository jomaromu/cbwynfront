import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Router } from '@angular/router';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  @ViewChild('contenedorInicio', { static: true }) contenedorInicio: ElementRef<HTMLElement>;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private breakPointObserver: BreakpointObserver
  ) { }

  ngOnInit(): void {
    this.scroll();
    this.scripts();
    this.resposivo();
  }

  scripts(): void {
    const contenedorInicio = this.contenedorInicio.nativeElement;
    const navResp = document.getElementById('contenedorPrincipal');

    const alto = navResp.clientHeight;

    contenedorInicio.style.marginTop = `${(alto + 15)}px`;
  }

  async irDashboard(): Promise<any> {

    const token = localStorage.getItem('token');

    if (!token) {

      this.router.navigateByUrl('/entrar');
    } else {

      const usuario = await this.usuarioService.decodificarToken(token).toPromise();
      if (usuario.ok === true) {
        const ruta = usuario.usuarioDBToken.usuarioDB.role;

        switch (ruta) {
          case 'CBWYNROLE':
            this.router.navigateByUrl('/user-dashboard');
            break;
        }
      } else if (usuario.ok === false) {
        this.router.navigateByUrl('/inicio');
      }
    }
  }

  resposivo(): void {

    const contenedorInicio = this.contenedorInicio.nativeElement;


    this.breakPointObserver
      .observe(['(max-width: 768px)'])
      .subscribe((state: BreakpointState) => {

        if (state.matches) {
          contenedorInicio.style.marginTop = '20px';
        }
      });
  }

  scroll(): void {
    window.scroll(0, 0);
  }
}
