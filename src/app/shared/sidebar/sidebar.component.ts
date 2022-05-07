import { Component, Input, OnInit, AfterViewChecked } from '@angular/core';
import { SidebarItems } from '../../interfaces/itemsSidebar';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, AfterViewChecked {

  @Input() logo: string;
  @Input() rutaPrincipal: string;
  @Input() itemSidebar: SidebarItems[] = [];
  items: SidebarItems;
  public datosUsuario = {
    nombre: null,
    apellido: null,
    email: null,
    address: null,
    role: null,
    ubicacion: null,
    avatar: null
  };

  treeControl = new NestedTreeControl<SidebarItems>(node => node.itemsThree);
  dataSource = new MatTreeNestedDataSource<SidebarItems>();
  hasChild = (_: number, node: SidebarItems) => !!node.itemsThree && node.itemsThree.length > 0;

  constructor(
    private usuarioService: UsuarioService
  ) {
  }

  ngOnInit(): void {
    this.dataUsuario();
    this.actualizarPerfil();
  }

  ngAfterViewChecked(): void {
    this.dataSource.data = this.itemSidebar;
    // console.log(this.dataSource.data);

  }

  async dataUsuario(): Promise<any> {

    const token = localStorage.getItem('token');

    if (!token) {
      return;
    } else {
      const usuario = await this.usuarioService.decodificarToken(token).toPromise();
      const usuarioDB = usuario.usuarioDBToken.usuarioDB;

      this.datosUsuario.nombre = usuarioDB.nombre || 'John';
      this.datosUsuario.apellido = usuarioDB.apellido || 'Doe';
      this.datosUsuario.avatar = usuarioDB.avatar;

    }
  }

  // SOCKETS
  actualizarPerfil(): void {
    this.usuarioService.actualizarDatosUsuario()
      .subscribe(resp => {
        this.datosUsuario.nombre = resp.nombre;
        this.datosUsuario.apellido = resp.apellido;
        this.datosUsuario.avatar = resp.avatar;
      });
  }

}
