import { Component, OnInit } from '@angular/core';
import { ProyectosService } from '../../services/proyectos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-no-stok',
  templateUrl: './no-stok.component.html',
  styleUrls: ['./no-stok.component.css']
})
export class NoStokComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }
}
