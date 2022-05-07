import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabla-fav',
  templateUrl: './tabla-fav.component.html',
  styleUrls: ['./tabla-fav.component.css']
})
export class TablaFavComponent implements OnInit {

  @Input() favoritos: any;

  constructor() { }

  ngOnInit(): void {
  }

}
