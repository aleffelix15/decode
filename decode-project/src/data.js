import {
  Home, Gamepad2, Sparkles, Shield, HelpCircle,
  Brain, Link2, ShieldAlert, Fingerprint, Radio, Eye,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* INSIGHTS — global collectible cards, unlocked as the story unfolds */
/* ------------------------------------------------------------------ */
export const INSIGHTS = [
  { id: "privacidade", title: "Invasão de Privacidade", icon: Fingerprint,
    text: "Exigir senhas, vasculhar conversas ou cobrar satisfação sobre a localização de alguém não é prova de confiança — é vigilância. Privacidade é um limite legítimo em qualquer relação." },
  { id: "psicologica", title: "Violência Psicológica", icon: Brain,
    text: "Fazer alguém duvidar da própria memória ou percepção (gaslighting), humilhar ou ameaçar são formas de violência que não deixam marcas visíveis, mas causam dano real." },
  { id: "controle", title: "Controle", icon: Eye,
    text: "Decidir o que a outra pessoa veste, com quem fala, onde está ou como gasta o próprio dinheiro costuma ser apresentado como cuidado ou ciúme — mas é uma tentativa de controlar a autonomia de alguém." },
  { id: "isolamento", title: "Isolamento", icon: Link2,
    text: "Afastar a pessoa de amigos e família, aos poucos, reduz sua rede de apoio e a deixa mais dependente de quem está controlando a relação." },
  { id: "manipulacao", title: "Manipulação", icon: ShieldAlert,
    text: "Inverter a culpa, minimizar o próprio comportamento ou usar frases como \"eu só fiz isso porque te amo\" são táticas para justificar o controle e evitar a responsabilização." },
  { id: "ciclo", title: "Ciclo da Violência", icon: Radio,
    text: "Tensão, explosão e reconciliação (a chamada \"lua de mel\") tendem a se repetir e se intensificar com o tempo. Reconhecer o ciclo é o primeiro passo para rompê-lo." },
];
export const INSIGHT_BY_ID = Object.fromEntries(INSIGHTS.map((i) => [i.id, i]));

/* ------------------------------------------------------------------ */
/* "A TERCEIRA PESSOA" — narrative data                                */
/* ------------------------------------------------------------------ */
// Extra concept used only in the story's final report (no collectible
// card of its own — it reinforces the same "psicologica" insight).
export const PATRIMONIAL_LABEL = "Violência Patrimonial";

export const CHAPTERS = [
  {
    key: "cap1",
    n: 1,
    title: '"Ele só se preocupa"',
    transition: null,
    messages: [
      "Amiga, o Lucas pediu minha localização de novo.",
      "Ele fala que fica preocupado quando eu demoro pra responder.",
      "Você acha estranho?",
    ],
    question: "O que você responde?",
    options: [
      { text: "Normal. Ele só está preocupado.", pattern: null,
        reply: "É, deve ser isso mesmo... Ele disse que só quer ter certeza que eu tô bem." },
      { text: "Talvez vocês precisem conversar sobre isso.", pattern: null,
        reply: "Pode ser. Vou tentar falar com ele com calma." },
      { text: "Você não precisa compartilhar sua localização se não quiser. Isso é um limite seu.", pattern: "controle",
        reply: "Nunca tinha pensado assim... Achei que fosse só carinho." },
    ],
    patternId: "controle",
    patternLabel: "Localização / Monitoramento",
  },
  {
    key: "cap2",
    n: 2,
    title: '"Só dessa vez"',
    transition: "3 dias depois...",
    messages: [
      "Amiga...",
      "Ele pediu minha senha do Instagram.",
      "Falou que quem não deve não teme.",
      "Eu fiquei meio desconfortável.",
    ],
    question: "O que você responde?",
    options: [
      { text: "Se você não tem nada pra esconder, passa.", pattern: null,
        reply: "É, acho que vou acabar passando mesmo, pra evitar clima ruim." },
      { text: "Você deveria bloquear ele.", pattern: null,
        reply: "Nossa, não sei se chegaria a esse ponto... é meio drástico, né?" },
      { text: "Você pode ter privacidade mesmo estando em um relacionamento.", pattern: "privacidade",
        reply: "Verdade. Confiança não devia precisar de senha." },
    ],
    patternId: "privacidade",
    patternLabel: "Invasão de Privacidade",
  },
  {
    key: "cap3",
    n: 3,
    title: '"Você está exagerando"',
    transition: "1 semana depois...",
    messages: [
      "Ele não gosta muito das minhas amigas.",
      "Disse que elas colocam coisas na minha cabeça.",
      "Agora eu quase não saio mais com elas.",
    ],
    question: "Qual sinal você percebe?",
    options: [
      { text: "Ciúme normal.", pattern: null,
        reply: "Também acho que deve ser só uma fase." },
      { text: "Isolamento.", pattern: "isolamento",
        reply: "Nossa... falando assim, faz um tempo que eu não vejo ninguém além dele." },
      { text: "Proteção.", pattern: null,
        reply: "É, talvez ele só queira o meu bem mesmo." },
    ],
    patternId: "isolamento",
    patternLabel: "Isolamento",
  },
];

export const CHAPTER4 = {
  key: "cap4",
  n: 4,
  title: '"Não conta pra ninguém"',
  transition: "Algumas semanas depois...",
  messages: [
    "Amiga, aconteceu uma coisa ontem.",
    "Ele ficou muito bravo.",
    "Quebrou meu celular.",
    "Depois pediu desculpa.",
    "Falou que nunca mais vai acontecer.",
  ],
  patternIds: ["psicologica", "ciclo"],
  extraLabel: PATRIMONIAL_LABEL,
};

export const CHAPTER5 = {
  key: "cap5",
  n: 5,
  title: '"Você pode me ajudar?"',
  messages: [
    "Eu acho que estou com medo.",
    "Não sei o que fazer.",
    "Quero terminar, mas tenho medo da reação dele.",
  ],
  question: "O QUE VOCÊ FAZ?",
  checklist: [
    { text: "Escutar sem julgar", good: true },
    { text: "Dizer que a culpa é dela", good: false },
    { text: "Incentivar que procure ajuda", good: true },
    { text: "Confrontar Lucas sozinho(a)", good: false },
    { text: "Respeitar as decisões dela", good: true },
    { text: "Procurar uma rede de proteção", good: true },
    { text: "Dizer para ela simplesmente terminar", good: false },
    { text: 'Ignorar porque é "problema do casal"', good: false },
  ],
};

export const REPORT_CONCEPTS = [
  { id: "controle", label: "Controle" },
  { id: "privacidade", label: "Invasão de Privacidade" },
  { id: "isolamento", label: "Isolamento" },
  { id: "manipulacao", label: "Manipulação" },
  { id: "psicologica", label: "Violência Psicológica" },
  { id: "patrimonial", label: PATRIMONIAL_LABEL },
  { id: "ciclo", label: "Ciclo da Violência" },
];

export const PROFILES = {
  apoio: {
    title: "REDE DE APOIO",
    text: "Você percebeu os sinais e priorizou escuta, respeito e proteção.",
    color: "green",
  },
  alerta: {
    title: "EM ALERTA",
    text: 'Você percebeu alguns sinais, mas algumas situações ainda pareceram normais. Isso também faz parte do aprendizado.',
    color: "amber",
  },
  invisiveis: {
    title: "PADRÕES INVISÍVEIS",
    text: "Alguns comportamentos passaram despercebidos. Isso mostra por que precisamos falar sobre prevenção.",
    color: "red",
  },
};

export const HIDDEN_FILES = [
  { text: "ELE QUEBROU SEU CELULAR DURANTE UMA BRIGA.", reveal: "VIOLÊNCIA PATRIMONIAL" },
  { text: "ELE DIZ QUE VOCÊ ESTÁ LOUCA E QUE ESTÁ INVENTANDO TUDO.", reveal: "VIOLÊNCIA PSICOLÓGICA / MANIPULAÇÃO" },
  { text: "ELE DECIDE O QUE VOCÊ PODE VESTIR.", reveal: "CONTROLE" },
  { text: "ELE TE AFASTA DEVAGAR DOS SEUS AMIGOS E FAMÍLIA.", reveal: "ISOLAMENTO" },
  { text: "ELE CONTROLA TODO O DINHEIRO E EXIGE PRESTAÇÃO DE CONTAS.", reveal: "VIOLÊNCIA PATRIMONIAL" },
  { text: "ELE AMEAÇA SE MACHUCAR CASO VOCÊ TERMINE.", reveal: "AMEAÇA / MANIPULAÇÃO EMOCIONAL" },
];

export const ALGO_FEED = [
  { text: "Como melhorar sua autoestima em 3 passos.", toxic: false },
  { text: "Treino rápido para iniciantes na academia.", toxic: false },
  { text: "5 dicas para ter mais confiança em entrevistas.", toxic: false },
  { text: "Homem de verdade não aceita ser contrariado.", toxic: true },
  { text: "Mulheres só querem dinheiro e status, acorda.", toxic: true },
  { text: "Se ela discorda de você em público, é desrespeito.", toxic: true },
  { text: 'Ceder nunca, nem quando ela "tem razão".', toxic: true },
];
export const ALGO_TOXIC_START = ALGO_FEED.findIndex((i) => i.toxic);

export const DATA_STATS = [
  { n: "1.492", label: "mulheres vítimas de feminicídio no Brasil em 2024 — recorde da série histórica iniciada em 2015", src: "Fórum Brasileiro de Segurança Pública, Anuário Brasileiro de Segurança Pública 2025 (dados de 2024)" },
  { n: "8 em cada 10", label: "vítimas de feminicídio foram mortas por companheiro ou ex-companheiro", src: "FBSP, Anuário Brasileiro de Segurança Pública 2025" },
  { n: "64%", label: "dos feminicídios em 2024 ocorreram dentro da própria residência da vítima", src: "FBSP, Anuário Brasileiro de Segurança Pública 2025" },
  { n: "555.001", label: "medidas protetivas de urgência foram concedidas no país em 2024 (+7% em relação a 2023)", src: "FBSP, Anuário Brasileiro de Segurança Pública 2025" },
  { n: "101.656", label: "dessas medidas protetivas foram descumpridas pelos agressores em 2024", src: "FBSP, Anuário Brasileiro de Segurança Pública 2025" },
  { n: "2 por minuto", label: "foi a média de acionamentos ao 190 relacionados a mulheres em 2024 (mais de 1 milhão no ano)", src: "FBSP, Anuário Brasileiro de Segurança Pública 2025" },
];

/* ------------------------------------------------------------------ */
/* "ARQUIVOS RECUPERADOS" — fragmentos de conversa com red flags       */
/* clicáveis. Cada mensagem com `flag` referencia um id de INSIGHTS.  */
/* ------------------------------------------------------------------ */
export const FRAGMENTS = [
  {
    id: "fragment-001",
    title: "FRAGMENTO_001.log",
    messages: [
      { id: "m1", from: "Lucas", text: "Você saiu e nem me avisou.", flag: null },
      { id: "m2", from: "Ana", text: "Eu só fui encontrar minhas amigas.", flag: null },
      { id: "m3", from: "Lucas", text: "Cadê você agora? Manda sua localização.", flag: "privacidade" },
      { id: "m4", from: "Lucas", text: "Você sabe que eu fico preocupado.", flag: null },
      { id: "m5", from: "Lucas", text: "Se você realmente me amasse, teria me avisado.", flag: "manipulacao" },
      { id: "m6", from: "Ana", text: "Desculpa, não pensei que fosse incomodar.", flag: null },
      { id: "m7", from: "Lucas", text: "Da próxima vez me avisa antes de sair com elas, tá bom?", flag: "controle" },
    ],
  },
];

export const FIREWALL_ITEMS = [
  { title: "Lei Maria da Penha", text: "Lei nº 11.340/2006 cria mecanismos para coibir a violência doméstica e familiar contra a mulher e prevê medidas de proteção. Consulte sempre o texto oficial ou a Defensoria Pública para orientação jurídica completa." },
  { title: "Formas de violência", text: "A lei reconhece violência física, psicológica, sexual, patrimonial e moral — nem toda violência deixa marcas visíveis." },
  { title: "Ciclo da violência", text: 'Um padrão frequentemente descrito em três fases: aumento da tensão, episódio de explosão/agressão e uma fase de reconciliação ("lua de mel"), que tende a se repetir e se intensificar.' },
  { title: "Medidas protetivas de urgência", text: "São decisões judiciais que podem, por exemplo, afastar o agressor do lar ou proibir aproximação e contato com a vítima. O pedido pode ser feito na Delegacia da Mulher (DEAM) ou no Judiciário." },
  { title: "Agosto Lilás", text: "Campanha nacional de conscientização sobre o enfrentamento à violência contra a mulher, realizada anualmente em agosto em referência à Lei Maria da Penha." },
];

export const ONBOARD_SLIDES = [
  { icon: Eye, text: "Você não está aqui para julgar." },
  { icon: Sparkles, text: "Você está aqui para perceber." },
  { icon: Shield, text: "Você será a rede de apoio." },
];

export const NAV_ITEMS = [
  { id: "dashboard", label: "Início", icon: Home },
  { id: "levels", label: "Jogar", icon: Gamepad2 },
  { id: "insights", label: "Insights", icon: Sparkles },
  { id: "shield", label: "Escudo", icon: Shield },
  { id: "help", label: "Ajuda", icon: HelpCircle },
];
