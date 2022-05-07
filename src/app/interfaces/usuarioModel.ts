export interface UsuarioRegistro {
    correo: string;
    password: string;
    soyMayor: boolean;
    fechaAlta: Date;
    role: string;
}

export interface UsuarioLogin {
    correo: string;
    password: string;
}
