export interface CriarReviewDTO {
  usuario_id: number;
  nota: number; 
  critica: string;
  assistido_em?: string; 
  

  filme: {
    titulo: string;
    ano_lancamento: number;
    diretor: string;
    sinopse: string;
    capa_url: string;
  };
}