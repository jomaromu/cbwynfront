// interface de los items del sidebar
export interface SidebarItems {

  icono: string;
  nombre: string;
  routerlink: string;
  hash?: boolean;
  span?: boolean;
  row?: boolean;
  itemsThree?: Array<ThreeItemsSecond>;
}

interface ThreeItems {

  icono: string;
  nombre: string;
  routerlink: string;
  span?: boolean;
}

interface ThreeItemsSecond {

  icono: string;
  nombre: string;
  routerlink: string;
  span?: boolean;
  row?: boolean;
  itemsThree?: Array<ThreeItems>;
}
