# CineReview — instruções rápidas

Passos para rodar localmente:

1. Copie o arquivo de exemplo e configure as credenciais do PostgreSQL:

```powershell
copy .env.example .env
# editar .env com seu usuário/senha/banco
```

2. Instale dependências (se ainda não instalou):

```powershell
npm install
```

3. Inicie a API de catálogo (porta 3001):

```powershell
npm run catalogo
```

4. Em outro terminal, inicie o servidor principal (porta 3000):

```powershell
npm run sistema
```

Observações:

- Se o servidor principal apresentar erro de autenticação no banco, verifique as variáveis em `.env`.
- As páginas do front-end ficam em `public/user`. A home é `http://localhost:3000/`.
