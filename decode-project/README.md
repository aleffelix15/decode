# DECODE — Descriptografando a Violência

Projeto React + Vite + Tailwind, pronto para rodar localmente ou publicar na Vercel.

## Rodar localmente

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`.

## Publicar na Vercel

### Opção A — via GitHub (recomendada)
1. Crie um repositório novo no GitHub e suba esta pasta:
   ```bash
   git init
   git add .
   git commit -m "DECODE v2"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/decode-app.git
   git push -u origin main
   ```
2. Entre em [vercel.com](https://vercel.com), clique em **Add New → Project**.
3. Selecione o repositório `decode-app`.
4. A Vercel detecta automaticamente que é um projeto Vite (Framework Preset: *Vite*, Build Command: `npm run build`, Output Directory: `dist`). Não precisa mudar nada.
5. Clique em **Deploy**.

### Opção B — direto do computador, sem GitHub
1. Instale a CLI da Vercel (uma vez só):
   ```bash
   npm install -g vercel
   ```
2. Dentro da pasta do projeto:
   ```bash
   vercel
   ```
3. Siga as perguntas (login, nome do projeto) — ao final ela te dá um link de preview.
4. Para publicar em produção:
   ```bash
   vercel --prod
   ```

## Estrutura
```
decode-project/
├─ index.html
├─ package.json
├─ vite.config.js
├─ tailwind.config.js
├─ postcss.config.js
└─ src/
   ├─ main.jsx
   ├─ index.css
   └─ App.jsx   ← todo o app DECODE está aqui
```
