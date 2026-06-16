export interface CriarUsuarioDTO {
  nome: string;
  email: string;
  senha: string;
  bio?: string;
  foto_perfil?: string;
}

export interface PerfilUsuarioDTO {
  id: number;
  nome: string;
  email: string;
  bio: string | null;
  foto_perfil: string | null;
  data_cadastro: Date;
}