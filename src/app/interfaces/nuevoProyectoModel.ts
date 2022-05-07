export interface NuevoProyectoModel {
    nombre: string;
    descripcion: string;
    tipoNegocio: string;
    tiempo: string;
    monto: number;
    categoria: string;
    ubicacion: string;
    utilidad: number;
    retorno: number;
    garantia: string;
    otras?: string;
    logo?: File;
    portada?: File;
    img1?: File;
    img2?: File;
    img3?: File;
    video?: File;
    docs?: File;
    codigoTel: string;
    numeroTel: number;
    pagWeb?: string;
}
