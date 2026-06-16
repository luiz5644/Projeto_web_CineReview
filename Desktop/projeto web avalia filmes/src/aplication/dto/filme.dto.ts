export interface FilmeDTO {
  id?: number;
  titulo: string;
  ano_lancamento: number;
  diretor: string;
  sinopse: string;
  capa_url: string;
  media_nota?: number;
}