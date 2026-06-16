import express, { Request, Response } from 'express';

const app = express();
const port = 3001;

app.use(express.json());


const bancoFilmesExterno = [
  {
    titulo: "Matrix",
    ano_lancamento: 1999,
    diretor: "Lana Wachowski, Lilly Wachowski",
    sinopse: "Um jovem programador descobre que a realidade é uma ilusão.",
    capa_url: "/big-poster-filme-matrix-lo02-tamanho-90x60-cm-poster-de-filme.jpg"
  },
  {
    titulo: "Interstellar",
    ano_lancamento: 2014,
    diretor: "Christopher Nolan",
    sinopse: "Uma viagem espacial para salvar a humanidade.",
    capa_url: "/poster-interstellar.jpg"
  }
];


app.get('/api/catalogo', (req: Request, res: Response) => {
  const termo = req.query.termo as string || '';
  const filtrados = bancoFilmesExterno.filter(f => 
    f.titulo.toLowerCase().includes(termo.toLowerCase())
  );
  res.json(filtrados);
});

app.listen(port, () => {
  console.log(`🎬 Segunda API (Catálogo) rodando em http://localhost:${port}`);
});