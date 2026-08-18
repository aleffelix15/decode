import {
  Home, Gamepad2, Sparkles, Shield, HelpCircle, Zap, Clock,
  Brain, Link2, ShieldAlert, Fingerprint, Radio, Eye, Crosshair,
  Smartphone, KeyRound, Wallet, Phone, MapPin,
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
/* INSIGHTS B — case Marcos (stalking, chantagem, controle financeiro) */
/* ------------------------------------------------------------------ */
export const INSIGHTS_B = [
  { id: "stalking", title: "Stalking Digital", icon: Crosshair,
    text: "Mensagens insistentes após o término, monitorar localização, criar perfis falsos para vigiar: stalking digital é crime (Lei 14.132/2021) e costuma ser o passo anterior à violência física." },
  { id: "chantagem", title: "Chantagem Emocional", icon: Phone,
    text: "\"Se você me deixar, eu me mato\" transfere o peso da decisão para a vítima. Não é prova de amor: é uma forma de coerção que retira a autonomia da outra pessoa." },
  { id: "dependencia", title: "Dependência Financeira", icon: Wallet,
    text: "Controlar o dinheiro do casal como \"para seu bem\", proibir a pessoa de trabalhar ou de ter conta em banco próprio é violência patrimonial e aprisiona sem deixar marcas." },
  { id: "stalkerware", title: "Stalkerware / Acesso Remoto", icon: Smartphone,
    text: "Apps espiões, acesso à conta de nuvem, compartilhamento de localização forçado: tecnologia de monitoramento não é cuidado — é invasão de privacidade e pode configurar crime." },
  { id: "ameaca-indireta", title: "Ameaça Indireta", icon: KeyRound,
    text: "\"Conheço seu caminho de volta para casa\", \"Sei onde seus pais moram\" — não precisam ser ditas em voz alta para configurar ameaça. Coerção também acontece pelo que se sugere." },
];
export const INSIGHT_B_BY_ID = Object.fromEntries(INSIGHTS_B.map((i) => [i.id, i]));
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

/* ------------------------------------------------------------------ */
/* CASO B — "Marcos e o silêncio depois"                              */
/* Estilo diferente: começa APÓS o término. Marcos não aceita o fim. */
/* ------------------------------------------------------------------ */
export const CHAPTERS_B = [
  {
    key: "b1",
    n: 1,
    title: '"Preciso falar com você"',
    transition: "O término aconteceu há 1 semana...",
    messages: [
      "Amiga, ele não para de me mandar mensagem.",
      "Já pedi pra ele parar. Ele diz que precisa de uma última conversa.",
      "São 40 mensagens desde ontem.",
    ],
    question: "O que você percebe?",
    options: [
      { text: "Ele só está sofrendo, é normal.", pattern: null,
        reply: "É, talvez ele só precise de um tempo..." },
      { text: "Limite é cuidado. Você pode bloquear sem dar explicação.", pattern: "stalking",
        reply: "Eu nunca tinha pensado em bloquear. Sempre achei que tinha que 'explicar direito'." },
      { text: "Marca um lugar público pra conversar se ele quiser.", pattern: null,
        reply: "Talvez seja o melhor dos dois mundos." },
    ],
    patternId: "stalking",
    patternLabel: "Stalking Digital",
  },
  {
    key: "b2",
    n: 2,
    title: '"É por seu bem"',
    transition: "Dias depois...",
    messages: [
      "Ele me pediu a senha do meu banco 'pra eu não me preocupar'.",
      "Falou que quer cuidar das minhas contas enquanto eu 'me organizo'.",
      "Disse que sozinho eu não dou conta.",
    ],
    question: "O que você responde?",
    options: [
      { text: "Aceita, ele está querendo ajudar.", pattern: null,
        reply: "Acho que vou aceitar, ele sempre cuidou de tudo mesmo." },
      { text: "Sua conta e sua senha são suas, mesmo pós-término.", pattern: "dependencia",
        reply: "Você tem razão. Eu tenho conta, tenho renda, isso é meu." },
      { text: "Bloqueia o app do banco, deixa pra resolver depois.", pattern: null,
        reply: "Vou colocar um bloqueio temporário por enquanto." },
    ],
    patternId: "dependencia",
    patternLabel: "Controle Financeiro",
  },
  {
    key: "b3",
    n: 3,
    title: '"Achei um app estranho"',
    transition: "2 semanas após o término...",
    messages: [
      "Amiga, achei um aplicativo no meu celular que não instalei.",
      "Parecia rastrear minha localização.",
      "Pesquisei e pode ser 'stalkerware'.",
    ],
    question: "Qual é o passo certo?",
    options: [
      { text: "Finge que não viu.", pattern: null,
        reply: "Acho que se eu ignorar talvez pare sozinho..." },
      { text: "Coleta provas (prints, datas), tira o app da rede e procura a delegacia.", pattern: "stalkerware",
        reply: "Vou salvar tudo. Isso é crime, não é?" },
      { text: "Confronta ele por mensagem.", pattern: null,
        reply: "Vou escrever algo bravo pra ele parar." },
    ],
    patternId: "stalkerware",
    patternLabel: "Stalkerware / Monitoramento",
  },
  {
    key: "b4",
    n: 4,
    title: '"Se você me deixar, eu não aguento"',
    transition: "Mensagem de madrugada...",
    messages: [
      "Ele me mandou áudio chorando.",
      "Falou que se eu não voltar, ele vai se machucar.",
      "Me mandou foto de uma caixa de remédio.",
    ],
    patternIds: ["chantagem", "ameaca-indireta"],
    extraLabel: "AMEAÇA INDIRETA",
  },
  {
    key: "b5",
    n: 5,
    title: '"O que eu faço agora?"',
    messages: [
      "Estou com medo.",
      "Mas tenho as provas que você me ajudou a guardar.",
      "Quero registrar um boletim de ocorrência.",
    ],
    question: "O QUE VOCÊ FAZ?",
    checklist: [
      { text: "Registrar B.O. na DEAM com as provas", good: true },
      { text: "Pedir medida protetiva de urgência", good: true },
      { text: "Avisar amigos/família e pedir companhia", good: true },
      { text: "Responder o áudio dele pra acalmar", good: false },
      { text: "Deletar as provas pra 'não piorar'", good: false },
      { text: "Encontrar ele pra 'resolver'", good: false },
      { text: "Salvar tudo na nuvem de confiança", good: true },
      { text: "Ligar 180 para orientação antes", good: true },
    ],
  },
];

export const REPORT_CONCEPTS = [
  { id: "controle", label: "Controle" },
  { id: "privacidade", label: "Invasão de Privacidade" },
  { id: "isolamento", label: "Isolamento" },
  { id: "manipulacao", label: "Manipulação" },
  { id: "psicologica", label: "Violência Psicológica" },
  { id: "patrimonial", label: PATRIMONIAL_LABEL },
  { id: "ciclo", label: "Ciclo da Violência" },
];

export const REPORT_CONCEPTS_B = [
  { id: "stalking", label: "Stalking Digital" },
  { id: "dependencia", label: "Controle Financeiro" },
  { id: "stalkerware", label: "Stalkerware / Monitoramento" },
  { id: "chantagem", label: "Chantagem Emocional" },
  { id: "ameaca-indireta", label: "Ameaça Indireta" },
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
  { title: "Lei de Stalking (14.132/2021)", text: "Perseguir, intimidar ou ameaçar alguém de forma reiterada, inclusive por meio digital, é crime com pena de 6 meses a 2 anos de reclusão. Procure a DEAM com provas (prints, datas, áudios)." },
];

/* ------------------------------------------------------------------ */
/* FRAGMENTS B — conversas pós-término, perfil de agressor            */
/* ------------------------------------------------------------------ */
export const FRAGMENTS_B = [
  {
    id: "fragment-002",
    title: "FRAGMENTO_002.log — Pós-término",
    messages: [
      { id: "m1", from: "Marcos", text: "Não vou aceitar esse fim.", flag: null },
      { id: "m2", from: "Marcos", text: "Você é minha, ninguém vai te ter.", flag: "stalking" },
      { id: "m3", from: "Camila", text: "Por favor, me deixa em paz.", flag: null },
      { id: "m4", from: "Marcos", text: "Se você sumir de novo, eu apareço na sua casa.", flag: "ameaca-indireta" },
      { id: "m5", from: "Marcos", text: "Eu mudo, eu juro. Só me dá mais uma chance.", flag: null },
      { id: "m6", from: "Marcos", text: "Conheço seu caminho de volta do trabalho.", flag: "ameaca-indireta" },
    ],
  },
  {
    id: "fragment-003",
    title: "FRAGMENTO_003.log — Chantagem",
    messages: [
      { id: "m1", from: "Marcos", text: "Sem você eu não sou ninguém.", flag: "chantagem" },
      { id: "m2", from: "Marcos", text: "Vou ficar muito mal se você não voltar.", flag: "chantagem" },
      { id: "m3", from: "Camila", text: "Não faz isso comigo, por favor.", flag: null },
      { id: "m4", from: "Marcos", text: "Tô vendo que você saiu com uma amiga. Sei porque eu sei.", flag: "stalkerware" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* TRIAGEM RÁPIDA — 10 relatos curtos, 3 botões (OK / Alerta / Contexto) */
/* ------------------------------------------------------------------ */
export const TRIAGEM_CARDS = [
  { id: "t1", text: "Ele pede pra você mandar sua localização quando vocês estão longe.",
    type: "red", reason: "Vigilância reiterada é controle, não cuidado. Em recorrência, pode configurar stalking." },
  { id: "t2", text: "Vocês decidem juntos onde jantar no fim de semana.",
    type: "ok", reason: "Decisão compartilhada é parte de uma relação saudável." },
  { id: "t3", text: "Ele não gosta quando você sai com suas amigas, mas diz que é 'só ciúme'.",
    type: "red", reason: "Ciúme recorrente que limita a liberdade da parceira é um sinal de alerta." },
  { id: "t4", text: "Ele quer a senha do seu celular 'porque não tem nada pra esconder'.",
    type: "red", reason: "Senha é privacidade. Quem ama não precisa de acesso total para confiar." },
  { id: "t5", text: "Vocês conversam sobre dinheiro abertamente e decidem juntos.",
    type: "ok", reason: "Transparência financeira, com autonomia preservada, é saudável." },
  { id: "t6", text: "Ele já terminou e voltou três vezes. Cada vez é pior.",
    type: "red", reason: "Ciclo que se intensifica é um padrão clássico — buscar rede de apoio é urgente." },
  { id: "t7", text: "Ele diz que se você terminar, ele vai se machucar.",
    type: "red", reason: "Chantagem emocional: coloca o peso da decisão na vítima e retira a autonomia dela." },
  { id: "t8", text: "Vocês discordam sobre um filme e resolvem ver outro.",
    type: "ok", reason: "Conflito resolvido com diálogo é parte de qualquer relação." },
  { id: "t9", text: "Ele controla o quanto você gasta, mesmo sendo seu dinheiro.",
    type: "red", reason: "Controle financeiro é violência patrimonial, prevista em lei." },
  { id: "t10", text: "Ele te apoia quando você precisa estudar ou trabalhar até tarde.",
    type: "ok", reason: "Apoio à autonomia da parceira é um sinal saudável." },
  { id: "t11", text: "Ele quer que você delete um app que ele não gosta.",
    type: "context", reason: "Pode ser abuso (controle), mas pode ser conversa pontual. Olhe o padrão: isso se repete?" },
  { id: "t12", text: "Ele te chama de 'exagerada' quando você se machuca com algo que ele disse.",
    type: "red", reason: "Minimizar seus sentimentos é uma forma de gaslighting e violência psicológica." },
];
export const TRIAGEM_TRIAGE_OPTIONS = [
  { value: "ok", label: "Comportamento normal" },
  { value: "red", label: "Sinal de alerta" },
  { value: "context", label: "Depende do contexto" },
];

/* ------------------------------------------------------------------ */
/* TIMELINE — ordenar 6 eventos do pós-término                       */
/* ------------------------------------------------------------------ */
export const TIMELINE_EVENTS = [
  { id: "e1", day: 0, kind: "showup", text: "Aparece na sua casa sem avisar.", insight: "Aparecer sem convite após o término é invasão de espaço." },
  { id: "e2", day: 2, kind: "contact", text: "40 mensagens em uma noite.", insight: "Volume excessivo de contato é parte do ciclo de stalking." },
  { id: "e3", day: 7, kind: "gift", text: "Manda flores com bilhete: 'para você lembrar de mim'.", insight: "Presentes após o término confundem afeto com controle." },
  { id: "e4", day: 14, kind: "apology", text: "Áudio longo dizendo que mudou e pedindo 'só mais uma chance'.", insight: "Pedido de desculpa sem mudança concreta tende a se repetir." },
  { id: "e5", day: 21, kind: "threat", text: "Foto de uma caixa de remédio com legenda 'sem você eu não aguento'.", insight: "Chantagem emocional usando autolesão como argumento." },
  { id: "e6", day: 30, kind: "monitoring", text: "Aparece no seu lugar favorito, embora você não tenha contado a ninguém.", insight: "Monitorar localização sem consentimento pode ser crime (Lei 14.132/2021)." },
];
export const TIMELINE_INSIGHT = "O pós-término revela o padrão. As primeiras atitudes parecem 'carinho', mas a escalada mostra que cada passo é uma invasão maior. Reconhecer a curva é o primeiro passo para se proteger.";

/* ------------------------------------------------------------------ */
/* DATA LAB — extensão de DATA_STATS com séries e comparativos       */
/* ------------------------------------------------------------------ */
export const DATA_LAB = [
  {
    id: "fem-series",
    kind: "series",
    title: "Feminicídio no Brasil — série histórica",
    label: "Vítimas por ano",
    unit: "vítimas",
    points: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
    values: [1066, 1138, 1187, 1229, 1332, 1339, 1388, 1456, 1492, 1492],
    src: "Fórum Brasileiro de Segurança Pública — Anuário Brasileiro de Segurança Pública 2025",
  },
  {
    id: "mpm-series",
    kind: "series",
    title: "Medidas protetivas concedidas",
    label: "Por ano",
    unit: "medidas",
    points: [2018, 2019, 2020, 2021, 2022, 2023, 2024],
    values: [180468, 246491, 322148, 386440, 481402, 518549, 555001],
    src: "Fórum Brasileiro de Segurança Pública — Anuário Brasileiro de Segurança Pública 2025",
  },
  {
    id: "compare",
    kind: "compare",
    title: "Vítimas por vínculo com o agressor (2024)",
    label: "Feminicídios no Brasil",
    unit: "%",
    data: [
      { label: "Companheiro/ex", value: 80 },
      { label: "Outro familiar", value: 12 },
      { label: "Desconhecido", value: 8 },
    ],
    src: "Fórum Brasileiro de Segurança Pública — Anuário Brasileiro de Segurança Pública 2025",
  },
  {
    id: "where",
    kind: "kpi",
    title: "Onde acontece",
    value: "64%",
    label: "dos feminicídios em 2024 ocorreram dentro da residência da vítima",
    src: "Fórum Brasileiro de Segurança Pública — Anuário Brasileiro de Segurança Pública 2025",
  },
  {
    id: "190",
    kind: "kpi",
    title: "190 — ligações por minuto",
    value: "2/min",
    label: "foi a média de acionamentos relacionados a mulheres em 2024 (mais de 1 milhão no ano)",
    src: "Fórum Brasileiro de Segurança Pública — Anuário Brasileiro de Segurança Pública 2025",
  },
];

/* ------------------------------------------------------------------ */
/* PROFILES B — perfis de reação ao stalking                         */
/* ------------------------------------------------------------------ */
export const PROFILES_B = {
  blindada: {
    title: "BLINDADA",
    text: "Você registrou B.O., guardou provas e ativou rede de apoio. É o caminho mais seguro para romper o ciclo.",
    color: "green",
  },
  alerta: {
    title: "EM ALERTA",
    text: "Você reconheceu os sinais, mas algumas atitudes ainda parecem excessivas. Manter a documentação é o próximo passo.",
    color: "amber",
  },
  acomodada: {
    title: "EM RISCO",
    text: "Normalizou sinais que merecem atenção. Volte, releia o capítulo 3 e considere acionar a rede de proteção.",
    color: "red",
  },
};

export const ONBOARD_SLIDES = [
  { icon: Eye, text: "Você não está aqui para julgar." },
  { icon: Sparkles, text: "Você está aqui para perceber." },
  { icon: Shield, text: "Você será a rede de apoio." },
];

export const NAV_ITEMS = [
  { id: "dashboard", label: "Início", icon: Home },
  { id: "levels", label: "Jogar", icon: Gamepad2 },
  { id: "triagem", label: "Triagem", icon: Zap },
  { id: "insights", label: "Insights", icon: Sparkles },
  { id: "shield", label: "Escudo", icon: Shield },
  { id: "help", label: "Ajuda", icon: HelpCircle },
];
