export interface CriterioBusquedaBanner {
    ubicacion: Array<ObjUbica>;
    categoria: Array<ObjCategoriga>;
    cantidad: Array<ObjCantidad>;
}

export interface ObjCriterio {
    ubicacion: string;
    categoria: string;
    cantidad?: string;
}

interface ObjUbica {
    nombre: string;
    codigo: string;
    indicativo: string;
}

interface ObjCategoriga {
    nombre: string;
    codigo: string;
}

interface ObjCantidad {
    nombre: string;
    codigo: string;
    cantidad: number;
}

