// interfaz para usuario registrado
export interface UsuarioRegistrado {
    ok: boolean;
    usuarioDB: UsuarioDB;
    usuarioDBToken?: UsuarioDBToken;
    token?: string;
    mensaje?: string;
    err?: null;
}


interface UsuarioDB {
    _id: string;
    correo: string;
    password: string;
    soyMayor: boolean;
    role: string;
    nombre?: string;
    apellido?: string;
    telefono?: string;
    avatar?: string;
}

interface UsuarioDBToken {
    exp?: number;
    iat?: number;
    usuarioDB: UsuarioDB;
}

// inteface de los errores en formulario wizard
export interface MsgErrores {
    ok: boolean;
    mensaje: string;
    valor?: any;
}

// interface de las categorias
export interface CategUbicacion {
    nombre: string;
    codigo: string;
    indicativo?: string;
}

// interfaz de obtener todos los negocios
export interface TodosLosNegocios {
    ok: boolean;
    mensaje: string;
    error?: string;
    negocioDB?: any;
}

export interface NegocioDB {
    ok: boolean;
    mensaje: string;
    error?: string;
    negocioDB?: any;
}

interface NegocioDetalle {
    categoria: string;
    codigo: string;
    descripcion: string;
    docs: Array<any>;
    estado: boolean;
    fechaAlta: string;
    garantia: string;
    img: Array<any>;
    logo: Array<any>;
    monto: number;
    nombre: string;
    numeroTel: number;
    otras: string;
    pagWeb: string;
    portada: Array<any>;
    retorno: number;
    rutaCorta: string;
    rutaNegocio: string;
    rutaUsuario: string;
    tiempo: string;
    tipoNegocio: string;
    ubicacion: string;
    usuario: string;
    utilidad: string;
    video: Array<any>;
    _id: string;
}
