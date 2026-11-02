# DECODE — Descriptografando a Violência

O **DECODE** é uma plataforma web interativa e educativa dedicada à conscientização, identificação e prevenção da violência contra a mulher. Através de simulações narrativas, análise de padrões comportamentais e visualização de dados, o projeto traduz sinais muitas vezes sutis de abuso psicológico, manipulação e controle em informação acessível e acionável.

---

## Objetivo e Proposta

A violência doméstica e de gênero raramente começa com agressões físicas explícitas; frequentemente, desenvolve-se de forma gradual através de ciclos de manipulação, isolamento, *gaslighting* e controle digital ou emocional. 

O **DECODE** aborda este problema oferecendo um ambiente seguro e interativo onde usuárias(os) podem:
- Compreender como operam os mecanismos de manipulação em relacionamentos abusivos.
- Aprender a identificar sinais de alerta (*red flags*) em conversas e comportamentos cotidianos.
- Explorar dados e estatísticas estruturadas sobre a violência contra a mulher no Brasil.
- Acessar rapidamente informações de apoio, proteção e canais oficiais de ajuda.

---

## Principais Funcionalidades

### 1. Simulação Narrativa e Estudos de Caso (`src/game/`)
- **Histórias Interativas:** Simulação de diálogos e contextos reais (incluindo múltiplas perspectivas e capítulos progressivos) através de uma interface de mensagens (`ChatShell`, `NarrativeGame`, `ChoiceChapter`).
- **Detecção de Sinais de Alerta (*Red Flags*):** Ferramentas interativas (`RedFlagText`, `PatternScanner`, `PatternReveal`) que permitem analisar mensagens e revelar padrões ocultos de manipulação e abuso.
- **Jogos de Linha do Tempo e Triagem:** Módulos práticos (`TimelineGame`, `TriagemGame`) para identificação da escalada de comportamentos abusivos ao longo do tempo e avaliação de situações de risco.

### 2. Laboratório de Dados e Conscientização (`src/screens/`)
- **Dashboards e Estatísticas:** Painéis informativos (`DataDashboardScreen`, `DataLabScreen`, `InsightsScreen`) com indicadores e conceitos fundamentais sobre o ciclo da violência baseados em dados oficiais.
- **Módulos de Proteção e Autodefesa Emocional/Digital:** Telas dedicadas a estratégias de proteção, limites e recuperação de informações (`ShieldScreen`, `FirewallScreen`, `RecoveredFilesScreen`, `HiddenFilesScreen`, `AlgorithmScreen`).
- **Central de Ajuda (`HelpScreen`):** Informações diretas sobre redes de apoio, orientação e canais de denúncia (Ligue 180, 190, DEAM).

### 3. Segurança e Privacidade da Usuária (`src/components/`)
- **Saída Rápida de Emergência (`ExitOverlay`):** Mecanismo de segurança crítico que permite o encerramento instantâneo da aplicação via botão ou duplo toque na tecla `Escape`. Ao ser acionado, limpa imediatamente dados de sessão e histórico local (`localStorage` e `sessionStorage`) e substitui a navegação por um site neutro (`window.location.replace`).

---

## Tecnologias Utilizadas

- **Core:** [React 18](https://react.dev/) (JavaScript / JSX)
- **Build Tool & Bundler:** [Vite](https://vitejs.dev/)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/) & PostCSS
- **Ícones:** [Lucide React](https://lucide.dev/)
- **Hospedagem / Deploy:** Configurado para [Vercel](https://vercel.com/)

---

## Arquitetura e Estrutura de Pastas

```text
decode-master/
├── vercel.json                        # Configuração de deploy para a Vercel
└── decode-project/                    # Diretório principal da aplicação frontend
    ├── index.html                     # Ponto de entrada HTML
    ├── package.json                   # Dependências e scripts do projeto
    ├── postcss.config.js              # Configuração do PostCSS
    ├── tailwind.config.js             # Configuração de temas e utilitários do Tailwind
    ├── vite.config.js                 # Configuração do bundler Vite
    └── src/
        ├── main.jsx                   # Inicialização do React DOM
        ├── App.jsx                    # Componente raiz, gestão de navegação e estado da sessão
        ├── index.css                  # Estilos globais e diretivas do Tailwind
        ├── theme.js                   # Constantes e tokens visuais de tema
        ├── data.js                    # Base de dados estática (narrativas, casos, estatísticas)
        ├── hooks/
        │   └── useTypedMessages.js    # Hook customizado para simulação de digitação em diálogos
        ├── components/                # Componentes reutilizáveis de UI e layout
        │   ├── BackdropGradient.jsx   # Efeitos de fundo visual dinâmico
        │   ├── ConceptCard.jsx        # Cartões de exibição de conceitos educativos
        │   ├── ExitOverlay.jsx        # Componente de saída rápida de emergência
        │   ├── Nav.jsx                # Barra e menu de navegação principal (Desktop e Mobile)
        │   ├── ParticleField.jsx      # Background interativo de partículas com acessibilidade
        │   ├── ProgressRing.jsx       # Indicador circular de progresso
        │   ├── SectionEyebrow.jsx     # Cabeçalho tipográfico de seções
        │   ├── StatTile.jsx           # Bloco de exibição de métricas e indicadores
        │   └── ui.jsx                 # Elementos base de interface compartilhados
        ├── game/                      # Motores e capítulos das experiências interativas
        │   ├── ChatShell.jsx          # Interface de simulação de chat
        │   ├── ChoiceChapter.jsx      # Motor de capítulos baseados em escolhas
        │   ├── Chapter4.jsx           # Capítulo 4 da narrativa principal (Sofia)
        │   ├── Chapter5.jsx           # Capítulo 5 da narrativa principal (Sofia)
        │   ├── MarcosStory.jsx        # Controlador do estudo de caso "Marcos"
        │   ├── MarcosChapter4.jsx     # Capítulo 4 do estudo de caso "Marcos"
        │   ├── MarcosChapter5.jsx     # Capítulo 5 do estudo de caso "Marcos"
        │   ├── NarrativeGame.jsx      # Controlador principal da narrativa de Sofia
        │   ├── PatternReveal.jsx      # Tela de revelação de padrões identificados
        │   ├── PatternScanner.jsx     # Ferramenta de escaneamento de padrões em texto
        │   ├── RedFlagText.jsx        # Destaque interativo de sinais de alerta
        │   ├── ResultScreen.jsx       # Feedback e resultados ao final das etapas
        │   ├── StoryIntro.jsx         # Introdução contextual das histórias
        │   ├── TimelineGame.jsx       # Dinâmica interativa de linha do tempo
        │   └── TriagemGame.jsx        # Dinâmica de classificação e triagem de relatos
        └── screens/                   # Telas principais da aplicação
            ├── Landing.jsx            # Página inicial de apresentação do projeto
            ├── Onboarding.jsx         # Fluxo introdutório de boas-vindas e instruções
            ├── Dashboard.jsx          # Painel central de acesso aos módulos
            ├── CaseSelectScreen.jsx   # Seleção de estudos de caso (Sofia / Marcos)
            ├── LevelSelect.jsx        # Seletor alternativo de capítulos
            ├── TriagemScreen.jsx      # Tela do módulo de triagem rápida
            ├── TimelineScreen.jsx     # Tela do módulo de linha do tempo
            ├── DataDashboardScreen.jsx# Painel simplificado de dados
            ├── DataLabScreen.jsx      # Laboratório interativo de dados e gráficos
            ├── InsightsScreen.jsx     # Síntese de aprendizados e padrões desbloqueados
            ├── AlgorithmScreen.jsx    # Análise de algoritmos e pontos de virada
            ├── ShieldScreen.jsx       # Módulo de proteção, níveis e rede de apoio
            ├── FirewallScreen.jsx     # Módulo de leis, direitos e segurança
            ├── HiddenFilesScreen.jsx  # Decodificação de frases do cotidiano
            ├── RecoveredFilesScreen.jsx # Análise de mensagens recuperadas
            └── HelpScreen.jsx         # Canais de emergência, apoio institucional e privacidade

---

## Instalação e Execução Local

### Pré-requisitos
- [Node.js](https://nodejs.org/) versão 18 ou superior.
- Gerenciador de pacotes `npm`.

### Passo a Passo

1. **Instalar dependências:**
   ```bash
   cd decode-project
   npm install
   ```

2. **Executar em ambiente de desenvolvimento:**
   ```bash
   npm run dev
   ```
   Acesse a aplicação no navegador pelo endereço indicado (normalmente `http://localhost:5173`).

3. **Gerar build de produção:**
   ```bash
   npm run build
   ```
   Os arquivos compilados e otimizados serão gerados no diretório `dist/`.

4. **Pré-visualizar o build de produção:**
   ```bash
   npm run preview
   ```
