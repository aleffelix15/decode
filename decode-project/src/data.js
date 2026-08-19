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
    title: '"Só um jantar fofo?"',
    transition: null,
    messages: [
      "Meninas...",
      "O Lucas fez um jantar super fofo pra mim ontem",
      "Até comprou flores e tudo",
      "Mas...",
      "rolou um clima muito chato :/",
      "Ele achou que eu tava muito 'distraída' no celular",
      "Do nada ele perguntou pra quem eu tanto respondia",
      "Ficou com a cara fechada o resto da noite",
      "Eu tava só respondendo a Carol sobre o trabalho da facul...",
      "Deu até pena, ele tinha se esforçado tanto com o jantar.",
    ],
    question: "O que você responde?",
    options: [
      { text: "Nossa, meio controlador isso hein?", pattern: "controle",
        reply: "Sério? Sei lá, ele falou que é porque sente falta da minha atenção... mas fiquei meio assim.",
        impact: { awareness: 2, support: 1, risk: 0 } },
      { text: "Nossa, não deixa ele estragar a noite por bobeira.", pattern: null,
        reply: "Pois é. Eu acabei guardando o celular pra ele relaxar. Funcionou.",
        impact: { awareness: 1, support: 2, risk: 0 } },
      { text: "Faz parte, ele só queria a sua atenção.", pattern: null,
        reply: "É, eu tbm achei. Ele é super apegado a mim, deve ser só isso.",
        impact: { awareness: 0, support: 0, risk: 2 } },
    ],
    patternId: "controle",
    patternLabel: "Culpabilização / Controle",
  },
  {
    key: "cap2",
    n: 2,
    title: '"Esquecimento Seletivo"',
    transition: "Uma semana depois...",
    messages: [
      "Tivemos a maior briga agora de manhã",
      "Eu acordei e perguntei porque ele não me acordou junto",
      "Ele disse que eu tava dormindo e ele preferiu não atrapalhar",
      "Sendo que a gente TINHA COMBINADO de ir juntos resolver o negócio do carro",
      "E o pior...",
      "Quando eu cobrei ele, ele virou e falou: 'Eu nunca disse que íamos juntos. Você tá imaginando coisas de novo.'",
      "Ele fez eu me sentir uma louca.",
      "Eu juro que ele tinha dito.",
    ],
    question: "Como você age?",
    options: [
      { text: "Isso é gaslighting. Ele tá tentando te confundir.", pattern: "psicologica",
        reply: "Gaslighting? Nossa... Será? Ele me deixou tão confusa que eu pedi desculpas no final.",
        impact: { awareness: 2, support: 2, risk: 0 } },
      { text: "Calma, as vezes ele só se confundiu mesmo.", pattern: null,
        reply: "Pode ser... as vezes eu que não prestei atenção direito.",
        impact: { awareness: 0, support: 0, risk: 2 } },
      { text: "Diz pra ele que vc não é burra e q tem certeza.", pattern: null,
        reply: "Tentei fazer isso, mas aí ele começou a gritar dizendo que eu chamo ele de mentiroso. Preferi deixar quieto.",
        impact: { awareness: 1, support: 0, risk: 1 } },
    ],
    patternId: "psicologica",
    patternLabel: "Violência Psicológica (Gaslighting)",
  },
  {
    key: "cap3",
    n: 3,
    title: '"Melhor eu ficar"',
    transition: "Sexta-feira à tarde...",
    messages: [
      "Meninas",
      "Não vou conseguir ir no aniversário da Carol hj :(",
      "Lucas não se dá muito bem com a galera de lá",
      "Ele vive dizendo que vcs não querem o nosso bem e têm inveja",
      "O q é um absurdo",
      "Ele até falou: 'Sua amiga não entende a nossa relação. Somos só nós dois contra o mundo.'",
      "Melhor eu ficar de boa em casa com ele hoje",
      "Evito briga...",
    ],
    question: "O que você percebe nessa mensagem?",
    options: [
      { text: "Isolamento. Ele tá tentando te afastar da gente.", pattern: "isolamento",
        reply: "Ai gente, calma kkkk eu tbm tô cansada, é sério. Não é que ele me proibiu, eu que escolhi não ir.",
        impact: { awareness: 2, support: 2, risk: 0 } },
      { text: "Vem com ele! A gente jura q não enche o saco.", pattern: null,
        reply: "Piorou! Se eu for com ele e alguém brincar com alguma coisa ele surta. Melhor ficar em casa mesmo.",
        impact: { awareness: 1, support: 1, risk: 1 } },
      { text: "Tudo bem amiga, a gente se vê outro dia.", pattern: null,
        reply: "Sim! Aproveitem mto por mim, bjos!!",
        impact: { awareness: 0, support: 0, risk: 2 } },
    ],
    patternId: "isolamento",
    patternLabel: "Isolamento Afetivo",
  },
];

export const CHAPTER4 = {
  key: "cap4",
  n: 4,
  title: '"Eu não vou deixar você sair"',
  transition: "Algum tempo depois...",
  messages: [
    "Ontem a noite foi terrível.",
    "A gente discutiu porque eu disse que ia visitar a minha irmã.",
    "Eu peguei na bolsa pra sair de casa...",
    "E ele simplesmente se colocou na frente da porta.",
    "Eu pedi pra ele sair da frente e ele disse calmamente: 'Nós ainda não terminamos de falar.'",
    "Eu tentei passar, e ele segurou meu braço. Com muita força.",
    "...",
    "Ficou uma marca roxa no meu pulso.",
    "Mas hoje de manhã ele chorou muito, mandou flores.",
    "Falou q perdeu a cabeça pq me ama demais e tem pânico de me perder.",
    "Ele disse que não apertou tão forte assim... Acho que minha pele que é sensível.",
  ],
  patternIds: ["psicologica", "ciclo"],
  extraLabel: "Escalada Física",
};

export const CHAPTER5 = {
  key: "cap5",
  n: 5,
  title: '"Tô com medo"',
  messages: [
    "Ele bebeu hj...",
    "Começou a falar umas coisas pesadas",
    "Falou q se eu tentar deixar ele, ele não se responsabiliza pelo q pode acontecer",
    "Ele nunca tinha falado assim.",
    "Eu acho q tô com medo real agora.",
    "Não sei o q fazer",
  ],
  question: "QUAL É A MELHOR ESTRATÉGIA AGORA?",
  checklist: [
    { text: "Acolher e perguntar onde ela está", good: true },
    { text: "Dizer 'eu te avisei' pra ela acordar", good: false },
    { text: "Orientar sobre o Ligue 180 discretamente", good: true },
    { text: "Ir até lá brigar com o Lucas", good: false },
    { text: "Pressionar para terminar imediatamente", good: false },
    { text: "Oferecer sua casa como refúgio", good: true },
    { text: "Dizer que no fundo ele é bom", good: false },
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
    title: '"Ele apareceu"',
    transition: "O término aconteceu há 2 semanas...",
    messages: [
      "Você tá acordada?",
      "Aconteceu uma coisa mto bizarra agr",
      "O Marcos acabou de aparecer aqui.",
      "...",
      "Na frente da agência.",
      "Eu não falei pra ele que eu ia fazer hora extra hj",
      "Eu nem costumo vir pra cá de quinta-feira",
      "Ele ficou parado do outro lado da rua olhando pro meu carro",
      "E depois foi embora.",
      "Como ele sabia que eu tava aqui?",
    ],
    question: "O que você acha que aconteceu?",
    options: [
      { text: "Ele pode estar te vigiando. Cuidado.", pattern: "stalking",
        reply: "Meu Deus, sério? Eu achei que eu tava ficando louca. Pq a gente nem se falou essa semana.",
        impact: { awareness: 2, support: 2, risk: 0 } },
      { text: "Deve ser coincidência, a cidade é pequena.", pattern: null,
        reply: "É... eu vou tentar acreditar nisso, senão eu não durmo hoje.",
        impact: { awareness: 0, support: 0, risk: 2 } },
      { text: "Você não postou nenhum story?", pattern: null,
        reply: "Pior que não! Eu não postei absolutamente nada.",
        impact: { awareness: 1, support: 1, risk: 1 } },
    ],
    patternId: "stalking",
    patternLabel: "Stalking (Perseguição)",
  },
  {
    key: "b2",
    n: 2,
    title: '"Coisas não resolvidas"',
    transition: "No dia seguinte...",
    messages: [
      "Amiga do céu",
      "Ele me mandou mensagem agora de manhã",
      "Disse que eu 'esqueci' de avisar que tava na agência ontem à noite",
      "Como se a gente ainda namorasse!!!",
      "E tem mais...",
      "Ele simplesmente trocou a senha do nosso antigo Drive compartilhado.",
      "Lá tem todos os meus projetos de freela, TUDO.",
      "Ele mandou um áudio dizendo que só libera o acesso se eu for no apartamento dele pegar minhas coisas 'como uma pessoa civilizada'.",
      "É um projeto que eu tenho que entregar amanhã.",
    ],
    question: "Como você orienta?",
    options: [
      { text: "Isso é chantagem. Não vai lá sozinha de jeito nenhum.", pattern: "dependencia",
        reply: "Eu sei q é armadilha, mas eu PRECISO daqueles arquivos. Que inferno.",
        impact: { awareness: 2, support: 2, risk: 0 } },
      { text: "Vai rápido, pega os arquivos e bloqueia ele.", pattern: null,
        reply: "Acho que vai ter que ser isso. Vou de dia pra evitar confusão.",
        impact: { awareness: 0, support: 0, risk: 2 } },
      { text: "Tenta pedir os arquivos por email primeiro.", pattern: null,
        reply: "Eu tentei! Ele visualizou e não respondeu. Quer me forçar a ir lá.",
        impact: { awareness: 1, support: 1, risk: 1 } },
    ],
    patternId: "dependencia",
    patternLabel: "Violência Patrimonial / Coerção",
  },
  {
    key: "b3",
    n: 3,
    title: '"A bateria..."',
    transition: "Uma semana depois...",
    messages: [
      "Tô ficando paranóica.",
      "Minha bateria do celular tá indo de 100 a zero em umas três horas.",
      "Ele fica super quente do nada.",
      "E lembra que eu te falei que ele tava sabendo onde eu ia?",
      "Ele acabou de curtir um story antigo do meu irmão... que estava num jantar fechado que eu fui ontem.",
      "Eu não postei foto do jantar.",
      "Meu irmão marcou a localização mas não me marcou na foto.",
      "Ele tá me monitorando, eu tenho certeza agora.",
    ],
    question: "O que está acontecendo?",
    options: [
      { text: "Ele pode ter instalado stalkerware no seu celular. Desliga a localização.", pattern: "stalkerware",
        reply: "Stalkerware? Que horror! Pior que ele tinha a senha do meu celular quando a gente namorava... Vou levar numa assistência urgente.",
        impact: { awareness: 2, support: 2, risk: 0 } },
      { text: "Calma, deve ser só um bug da bateria. E ele só é fofoqueiro.", pattern: null,
        reply: "Não sei... são muitas coincidências seguidas. Eu tô com uma sensação ruim.",
        impact: { awareness: 0, support: 0, risk: 2 } },
      { text: "Bloqueia ele do perfil do seu irmão também.", pattern: null,
        reply: "Já mandei meu irmão bloquear, mas ele pode só criar uma conta fake.",
        impact: { awareness: 1, support: 1, risk: 1 } },
    ],
    patternId: "stalkerware",
    patternLabel: "Cyberstalking / Monitoramento Remoto",
  },
  {
    key: "b4",
    n: 4,
    title: '"O Arquivo Oculto"',
    transition: "Madrugada de domingo...",
    messages: [
      "Eu não acredito...",
      "Ele percebeu q eu tirei o acesso à minha localização.",
      "Ele me mandou uma mensagem estranha.",
      "Falou: 'Ainda bem que eu salvei as nossas coisas.'",
      "Eu perguntei o que ele tava falando.",
      "E ele mandou...",
      "[ANEXO OCULTO — PRIVADO]",
      "Ele mandou um print daquele nosso vídeo antigo.",
      "Um vídeo que eu confiei nele e ele jurou que ia apagar na época.",
      "Ele não ameaçou vazar diretamente.",
      "Ele só disse: 'Sorte que isso tá num drive seguro comigo. Ninguém vai ver. Fica tranquila e me responde.'",
      "Eu tô destruída.",
    ],
    patternIds: ["chantagem", "ameaca-indireta"],
    extraLabel: "SEXTORSÃO VELADA / VIOLÊNCIA DIGITAL EXTREMA",
  },
  {
    key: "b5",
    n: 5,
    title: '"Preservar e Agir"',
    messages: [
      "Eu não dormi a noite toda.",
      "Se eu responder a ele, ele vai saber que me tem na mão.",
      "Se eu não responder, ele pode mandar aquilo pra minha família ou no meu trabalho.",
      "Eu não quero ceder a essa chantagem pra sempre.",
      "O que eu faço? Eu apago as mensagens dele pra não ver mais isso?",
      "Eu confronto ele de volta?",
    ],
    question: "COMO VOCÊ APOIA?",
    checklist: [
      { text: "Orientar a NÃO apagar a mensagem e salvar tudo (Lei 14.132/21)", good: true },
      { text: "Orientar ir na Delegacia da Mulher (DEAM) denunciar a Sextorsão", good: true },
      { text: "Dizer pra ela pedir desculpas pra ele acalmar", good: false },
      { text: "Avisar que a divulgação não consentida é crime federal", good: true },
      { text: "Dizer pra ela esquecer isso e que ele tá blefando", good: false },
      { text: "Ligar 180 para receber orientação jurídica gratuita", good: true },
      { text: "Mandar áudio ameaçando o Marcos", good: false },
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

/* ------------------------------------------------------------------ */
/* ENDINGS — 8 named endings + 1 secret                               */
/* ------------------------------------------------------------------ */
export const ENDINGS = {
  rede: {
    id: 'rede', n: 1, title: 'A REDE',
    text: 'Você construiu uma rede de apoio sólida. Soube ouvir sem julgar, reconheceu os sinais desde o início e nunca tentou resolver sozinho(a). A prevenção começa com presença.',
    color: 'green',
  },
  recomeco: {
    id: 'recomeco', n: 2, title: 'O RECOMEÇO',
    text: 'Você percebeu a maioria dos sinais e ofereceu apoio na hora certa. O caminho ainda está sendo construído, mas a direção é segura.',
    color: 'green',
  },
  voz: {
    id: 'voz', n: 3, title: 'A VOZ',
    text: 'Você deu voz à situação. Nem sempre soube como agir, mas o fato de ter tentado já fez diferença. Às vezes, uma palavra é o que alguém precisa para começar a pedir ajuda.',
    color: 'lilac',
  },
  silencio: {
    id: 'silencio', n: 4, title: 'O SILÊNCIO',
    text: 'Você observou, mas não agiu. Às vezes, o silêncio parece seguro — mas, para quem está sofrendo, ele pode ser o último isolamento.',
    color: 'amber',
  },
  pressa: {
    id: 'pressa', n: 5, title: 'A PRESSA',
    text: 'Você quis ajudar, mas agiu de forma precipitada. Confrontar o agressor ou forçar decisões pode colocar a vítima em mais risco. Apoiar é diferente de decidir por alguém.',
    color: 'amber',
  },
  isolamento: {
    id: 'isolamento', n: 6, title: 'O ISOLAMENTO',
    text: 'Os sinais passaram despercebidos e a rede de apoio se afastou. A vítima ficou sozinha — exatamente como o agressor planejava.',
    color: 'red',
  },
  tardeDemais: {
    id: 'tardeDemais', n: 7, title: 'TARDE DEMAIS',
    text: 'Os sinais estavam ali, mas não foram vistos a tempo. Cada padrão ignorado é uma oportunidade perdida. A prevenção começa quando paramos de normalizar.',
    color: 'red',
  },
  decoded: {
    id: 'decoded', n: 8, title: 'VOCÊ DECODIFICOU',
    text: 'Você identificou todos os padrões, fez todas as escolhas certas e protegeu a vítima em cada momento. Este é o padrão que precisamos espalhar.',
    color: 'green',
  },
  terceiraPessoa: {
    id: 'terceiraPessoa', n: 9, title: 'A TERCEIRA PESSOA',
    text: '"Você não estava vivendo a história. Você estava aprendendo a reconhecer os sinais." — E agora, eles nunca mais vão passar despercebidos.',
    color: 'lilacBright', secret: true,
  },
};
