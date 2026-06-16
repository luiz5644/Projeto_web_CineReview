export interface FilmeExterno {
  id_externo: string;
  titulo: string;
  ano_lancamento: number;
  diretor: string;
  sinopse: string;
  capa_url: string;
}

export const ApiFilmesService = {
  async consultarCatalogo(termoBusca: string): Promise<FilmeExterno[]> {
    try {
     
      const resposta = await fetch(`http://localhost:3001/api/catalogo?termo=${encodeURIComponent(termoBusca)}`);
      
      if (!resposta.ok) throw new Error('Erro ao consultar API externa');
      
      return await resposta.json() as FilmeExterno[];
    } catch (error) {
      console.error("Falha na integração com o catálogo de filmes:", error);
      return [];
    }
  }
};