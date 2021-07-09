export class User {
  id: number;
  idPersona: number;
  idCliente?: number;
  nombre: string;
  email: string;
  login: string;
  clave?: string;
  idEstado: number;
  esAd: number;
  token?: string;
  tipo: number;
  fechaUltimaSesion: Date;
  esExterno: boolean;
}
