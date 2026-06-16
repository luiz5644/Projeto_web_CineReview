CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    bio TEXT,
    foto_perfil VARCHAR(500),
    data_cadastro TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE filmes (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    ano_lancamento INTEGER,
    diretor VARCHAR(150),
    sinopse TEXT,
    capa_url VARCHAR(500),
    media_nota DECIMAL(3,2) DEFAULT 0
);

CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL,
    filme_id INTEGER NOT NULL,
    nota INTEGER NOT NULL CHECK (nota >= 1 AND nota <= 10),
    critica TEXT,
    assistido_em DATE,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    CONSTRAINT fk_filme FOREIGN KEY (filme_id) REFERENCES filmes(id) ON DELETE CASCADE,
    CONSTRAINT uq_usuario_filme UNIQUE (usuario_id, filme_id)
);