import type { L10n } from "@/lib/i18n";
import type { TopicKey } from "@/lib/lessons";

/**
 * The evidence library. Every entry was located via PubMed/scholarly search
 * and independently fact-checked (title, authors, year, venue) against
 * PubMed or the publisher's records before being added — no citations from
 * memory. This list feeds both the lesson pages and the coach chatbot's
 * system prompt.
 */
export type Source = {
  id: string;
  topic: TopicKey;
  title: string;
  authors: string;
  year: number;
  venue: string;
  url: string;
  pmid?: string;
  doi?: string;
  kind: L10n;
  summary: L10n;
};

const KIND = {
  meta: { en: "Meta-analysis", no: "Metaanalyse" },
  review: { en: "Systematic review", no: "Systematisk oversikt" },
  consensus: { en: "Consensus statement", no: "Konsensusuttalelse" },
  rct: { en: "Randomized trial", no: "Randomisert studie" },
  theory: { en: "Theoretical review", no: "Teoretisk oversikt" },
} as const;

export const SOURCES: Source[] = [
  // ── Young athletes & mental health ────────────────────────────────
  {
    id: "reardon-2019",
    topic: "youth-wellbeing",
    title:
      "Mental health in elite athletes: International Olympic Committee consensus statement (2019)",
    authors: "Reardon CL, Hainline B, et al.",
    year: 2019,
    venue: "British Journal of Sports Medicine, 53(11), 667–699",
    url: "https://pubmed.ncbi.nlm.nih.gov/31097450/",
    pmid: "31097450",
    doi: "10.1136/bjsports-2019-100715",
    kind: KIND.consensus,
    summary: {
      en: "The IOC's expert consensus: mental health symptoms are common among elite athletes and can affect performance — and athletes should be supported to seek help early, just as they would for a physical injury.",
      no: "IOCs ekspertkonsensus: psykiske plager er vanlige blant toppidrettsutøvere og kan påvirke prestasjonen — og utøvere bør støttes i å søke hjelp tidlig, akkurat som ved en fysisk skade.",
    },
  },
  {
    id: "bergeron-2015",
    topic: "youth-wellbeing",
    title:
      "International Olympic Committee consensus statement on youth athletic development",
    authors: "Bergeron MF, Mountjoy M, et al.",
    year: 2015,
    venue: "British Journal of Sports Medicine, 49(13), 843–851",
    url: "https://pubmed.ncbi.nlm.nih.gov/26084524/",
    pmid: "26084524",
    doi: "10.1136/bjsports-2015-094962",
    kind: KIND.consensus,
    summary: {
      en: "The IOC's guidelines for developing young athletes: aim high, but keep development healthy, balanced and fun — including psychological wellbeing, varied training and realistic expectations.",
      no: "IOCs retningslinjer for utvikling av unge utøvere: sikt høyt, men hold utviklingen sunn, balansert og gøy — inkludert psykisk trivsel, variert trening og realistiske forventninger.",
    },
  },

  // ── Goal setting ──────────────────────────────────────────────────
  {
    id: "williamson-2024",
    topic: "goal-setting",
    title:
      "The performance and psychological effects of goal setting in sport: A systematic review and meta-analysis",
    authors: "Williamson O, Swann C, et al.",
    year: 2024,
    venue:
      "International Review of Sport and Exercise Psychology, 17(2), 1050–1078",
    url: "https://www.tandfonline.com/doi/full/10.1080/1750984X.2022.2116723",
    doi: "10.1080/1750984X.2022.2116723",
    kind: KIND.meta,
    summary: {
      en: "Across 27 studies, process goals (about what you do) improved performance far more (effect d = 1.36) than performance goals (0.44) or outcome goals (0.09) — and they also boosted athletes' belief in their own ability.",
      no: "På tvers av 27 studier ga prosessmål (om det du gjør) langt bedre prestasjon (effekt d = 1,36) enn prestasjonsmål (0,44) og resultatmål (0,09) — og de styrket også utøvernes tro på egne ferdigheter.",
    },
  },
  {
    id: "jeong-2023",
    topic: "goal-setting",
    title:
      "The application of Goal Setting Theory to goal setting interventions in sport: a systematic review",
    authors: "Jeong YH, Healy LC & McEwan D",
    year: 2023,
    venue:
      "International Review of Sport and Exercise Psychology, 16(1), 474–499",
    url: "https://www.tandfonline.com/doi/full/10.1080/1750984X.2021.1901298",
    doi: "10.1080/1750984X.2021.1901298",
    kind: KIND.review,
    summary: {
      en: "A review of 27 real-world goal-setting programs with athletes: even simple goal setting improved performance, and specific goals you're committed to — with regular feedback — work best.",
      no: "En gjennomgang av 27 målsettingsopplegg med utøvere i praksis: selv enkel målsetting bedret prestasjonen, og konkrete mål du er forpliktet til — med jevnlig oppfølging — fungerer best.",
    },
  },
  {
    id: "kyllo-1995",
    topic: "goal-setting",
    title:
      "Goal Setting in Sport and Exercise: A Research Synthesis to Resolve the Controversy",
    authors: "Kyllo LB & Landers DM",
    year: 1995,
    venue: "Journal of Sport & Exercise Psychology, 17(2), 117–137",
    url: "https://journals.humankinetics.com/view/journals/jsep/17/2/article-p117.xml",
    doi: "10.1123/jsep.17.2.117",
    kind: KIND.meta,
    summary: {
      en: "The classic synthesis of 36 studies: setting goals improved sport performance by about a third of a standard deviation — with moderately difficult, specific goals, and short-term goals combined with long-term ones, working best.",
      no: "Den klassiske oppsummeringen av 36 studier: målsetting bedret idrettsprestasjonen med rundt en tredjedels standardavvik — og passe vanskelige, konkrete mål, og kortsiktige mål kombinert med langsiktige, virket best.",
    },
  },
  {
    id: "lu-2022",
    topic: "goal-setting",
    title:
      "Effects of a SMART Goal Setting and 12-Week Core Strength Training Intervention on Physical Fitness and Exercise Attitudes in Adolescents",
    authors: "Lu Y, Yu K & Gan X",
    year: 2022,
    venue:
      "International Journal of Environmental Research and Public Health, 19(13)",
    url: "https://pubmed.ncbi.nlm.nih.gov/35805372/",
    pmid: "35805372",
    doi: "10.3390/ijerph19137715",
    kind: KIND.rct,
    summary: {
      en: "A trial with 362 teenagers (around age 14): combining SMART goal setting with 12 weeks of training improved fitness and attitudes toward exercise more than training alone.",
      no: "Et forsøk med 362 tenåringer (rundt 14 år): SMART-målsetting kombinert med 12 ukers trening ga bedre fysisk form og holdninger til trening enn trening alene.",
    },
  },

  // ── Nerves & breathing ────────────────────────────────────────────
  {
    id: "laborde-2022",
    topic: "arousal-regulation",
    title:
      "Effects of voluntary slow breathing on heart rate and heart rate variability: A systematic review and a meta-analysis",
    authors: "Laborde S, Allen MS, et al.",
    year: 2022,
    venue: "Neuroscience & Biobehavioral Reviews, 138, 104711",
    url: "https://pubmed.ncbi.nlm.nih.gov/35623448/",
    pmid: "35623448",
    doi: "10.1016/j.neubiorev.2022.104711",
    kind: KIND.meta,
    summary: {
      en: "Slow-paced breathing measurably activates the body's calming (parasympathetic) system — during the exercise, right after it, and as a lasting baseline shift after regular practice.",
      no: "Langsom pust aktiverer målbart kroppens ro-system (det parasympatiske nervesystemet) — under øvelsen, rett etterpå, og som en varig endring etter jevnlig trening.",
    },
  },
  {
    id: "laborde-2024",
    topic: "arousal-regulation",
    title:
      "The influence of breathing techniques on physical sport performance: a systematic review and meta-analysis",
    authors: "Laborde S, Zammit N, et al.",
    year: 2024,
    venue: "International Review of Sport and Exercise Psychology, 17(2)",
    url: "https://www.tandfonline.com/doi/full/10.1080/1750984X.2022.2145573",
    doi: "10.1080/1750984X.2022.2145573",
    kind: KIND.meta,
    summary: {
      en: "Across 37 studies, athletes who trained slow-paced breathing over time improved their physical sport performance — with a large effect for longer-term practice.",
      no: "På tvers av 37 studier presterte utøvere som trente på langsom pust over tid, bedre fysisk — med stor effekt for lengre treningsperioder.",
    },
  },

  // ── Self-talk ─────────────────────────────────────────────────────
  {
    id: "hatzigeorgiadis-2011",
    topic: "self-talk",
    title: "Self-Talk and Sports Performance: A Meta-Analysis",
    authors: "Hatzigeorgiadis A, Zourbanos N, Galanis E & Theodorakis Y",
    year: 2011,
    venue: "Perspectives on Psychological Science, 6(4), 348–356",
    url: "https://pubmed.ncbi.nlm.nih.gov/26167788/",
    pmid: "26167788",
    doi: "10.1177/1745691611413136",
    kind: KIND.meta,
    summary: {
      en: "Across 32 studies, planned self-talk improved sport performance (moderate effect, ES = 0.48). Instructional self-talk helped most on precision and technique tasks.",
      no: "På tvers av 32 studier forbedret planlagt indre dialog prestasjonen (moderat effekt, ES = 0,48). Instruerende selvsnakk hjalp mest på presisjons- og teknikkoppgaver.",
    },
  },
  {
    id: "tod-2011",
    topic: "self-talk",
    title: "Effects of self-talk: a systematic review",
    authors: "Tod D, Hardy J & Oliver E",
    year: 2011,
    venue: "Journal of Sport and Exercise Psychology, 33(5), 666–687",
    url: "https://pubmed.ncbi.nlm.nih.gov/21984641/",
    pmid: "21984641",
    doi: "10.1123/jsep.33.5.666",
    kind: KIND.review,
    summary: {
      en: "A review of 47 studies: positive, instructional and motivational self-talk all helped performance — solid evidence that training your inner voice is worth the effort.",
      no: "En gjennomgang av 47 studier: positivt, instruerende og motiverende selvsnakk hjalp alle på prestasjonen — solid dokumentasjon på at det lønner seg å trene den indre stemmen.",
    },
  },
  {
    id: "walter-2019",
    topic: "self-talk",
    title:
      "Effects of Self-Talk Training on Competitive Anxiety, Self-Efficacy, Volitional Skills, and Performance",
    authors: "Walter N, Nikoleizig L & Alfermann D",
    year: 2019,
    venue: "Sports (Basel), 7(6), 148",
    url: "https://pubmed.ncbi.nlm.nih.gov/31248129/",
    pmid: "31248129",
    doi: "10.3390/sports7060148",
    kind: KIND.rct,
    summary: {
      en: "117 junior athletes (average age 16) did self-talk training: it lowered competition nerves and raised self-confidence, self-efficacy and performance — and eight weeks of practice beat one week.",
      no: "117 juniorutøvere (snittalder 16) trente på indre dialog: det dempet konkurransenervene og økte selvtillit, mestringstro og prestasjon — og åtte ukers trening slo én uke.",
    },
  },

  // ── Imagery ───────────────────────────────────────────────────────
  {
    id: "simonsmeier-2021",
    topic: "imagery",
    title: "The effects of imagery interventions in sports: a meta-analysis",
    authors: "Simonsmeier BA, Andronie M, Buecker S & Frank C",
    year: 2021,
    venue: "International Review of Sport and Exercise Psychology, 14(1), 186–207",
    url: "https://www.tandfonline.com/doi/full/10.1080/1750984X.2020.1780627",
    doi: "10.1080/1750984X.2020.1780627",
    kind: KIND.meta,
    summary: {
      en: "Imagery interventions had a medium positive effect on sport outcomes (d = 0.43) and also strengthened confidence and motivation. Imagery plus physical practice beat physical practice alone.",
      no: "Visualiseringstrening hadde en middels positiv effekt på idrettsresultater (d = 0,43) og styrket også selvtillit og motivasjon. Visualisering pluss fysisk trening slo fysisk trening alene.",
    },
  },
  {
    id: "liu-2025",
    topic: "imagery",
    title:
      "The Effects of Imagery Practice on Athletes' Performance: A Multilevel Meta-Analysis",
    authors: "Liu Y, Zhao S, et al.",
    year: 2025,
    venue: "Behavioral Sciences (Basel), 15(5), 685",
    url: "https://pubmed.ncbi.nlm.nih.gov/40426460/",
    pmid: "40426460",
    doi: "10.3390/bs15050685",
    kind: KIND.meta,
    summary: {
      en: "Across 86 studies with 3,593 athletes, imagery practice improved performance — with roughly three ~10-minute sessions a week, kept up over time, giving the biggest gains.",
      no: "På tvers av 86 studier med 3 593 utøvere forbedret visualiseringstrening prestasjonen — og rundt tre økter på ~10 minutter i uka, over tid, ga størst gevinst.",
    },
  },
  {
    id: "holmes-collins-2001",
    topic: "imagery",
    title:
      "The PETTLEP Approach to Motor Imagery: A Functional Equivalence Model for Sport Psychologists",
    authors: "Holmes PS & Collins DJ",
    year: 2001,
    venue: "Journal of Applied Sport Psychology, 13(1), 60–83",
    url: "https://www.tandfonline.com/doi/abs/10.1080/10413200109339004",
    doi: "10.1080/10413200109339004",
    kind: KIND.theory,
    summary: {
      en: "The paper behind the PETTLEP checklist: imagery works best when it closely simulates the real thing — same position, equipment, setting, real-time speed and real emotions — because the brain processes imagined and real movement in similar ways.",
      no: "Artikkelen bak PETTLEP-sjekklisten: visualisering virker best når den ligner mest mulig på den virkelige situasjonen — samme stilling, utstyr, omgivelser, ekte tempo og ekte følelser — fordi hjernen behandler forestilte og ekte bevegelser på lignende måter.",
    },
  },

  // ── Mindfulness & focus ───────────────────────────────────────────
  {
    id: "myall-2023",
    topic: "mindfulness",
    title:
      "Effect of mindfulness-based programmes on elite athlete mental health: a systematic review and meta-analysis",
    authors: "Myall K, Montero-Marin J, et al.",
    year: 2023,
    venue: "British Journal of Sports Medicine, 57(2), 99–108",
    url: "https://pubmed.ncbi.nlm.nih.gov/36223914/",
    pmid: "36223914",
    doi: "10.1136/bjsports-2022-105596",
    kind: KIND.meta,
    summary: {
      en: "Across trials with 614 elite athletes, mindfulness-based programs improved mental health — clearly reducing anxiety, stress and psychological distress.",
      no: "I studier med 614 topputøvere forbedret mindfulness-baserte programmer psykisk helse — med tydelig mindre angst, stress og psykiske plager.",
    },
  },
  {
    id: "buhlmayer-2017",
    topic: "mindfulness",
    title:
      "Effects of Mindfulness Practice on Performance-Relevant Parameters and Performance Outcomes in Sports: A Meta-Analytical Review",
    authors: "Bühlmayer L, Birrer D, Röthlin P, et al.",
    year: 2017,
    venue: "Sports Medicine, 47(11), 2309–2321",
    url: "https://pubmed.ncbi.nlm.nih.gov/28664327/",
    pmid: "28664327",
    doi: "10.1007/s40279-017-0752-9",
    kind: KIND.meta,
    summary: {
      en: "A meta-analysis of mindfulness practice in sport: it improved performance-relevant factors like attention and physiological stress markers — and performance outcomes improved too.",
      no: "En metaanalyse av mindfulness-trening i idrett: den forbedret prestasjonsrelevante faktorer som oppmerksomhet og fysiologiske stressmarkører — og selve prestasjonene ble også bedre.",
    },
  },

  // ── Pre-performance routines ──────────────────────────────────────
  {
    id: "rupprecht-2024",
    topic: "routines",
    title:
      "The effectiveness of pre-performance routines in sports: a meta-analysis",
    authors: "Rupprecht AGO, Tran US & Gröpel P",
    year: 2024,
    venue:
      "International Review of Sport and Exercise Psychology, 17(1), 39–64",
    url: "https://www.tandfonline.com/doi/full/10.1080/1750984X.2021.1944271",
    doi: "10.1080/1750984X.2021.1944271",
    kind: KIND.meta,
    summary: {
      en: "Data from 15 sports and over 800 athletes: performers using a pre-performance routine did better than those without one — under both calm and pressure conditions.",
      no: "Data fra 15 idretter og over 800 utøvere: de som brukte en fast prestasjonsrutine, gjorde det bedre enn de uten — både i rolige situasjoner og under press.",
    },
  },
  {
    id: "gropel-mesagno-2019",
    topic: "routines",
    title: "Choking interventions in sports: A systematic review",
    authors: "Gröpel P & Mesagno C",
    year: 2019,
    venue:
      "International Review of Sport and Exercise Psychology, 12(1), 176–201",
    url: "https://www.tandfonline.com/doi/full/10.1080/1750984X.2017.1408134",
    doi: "10.1080/1750984X.2017.1408134",
    kind: KIND.review,
    summary: {
      en: "A review of 47 studies on choking under pressure: pre-performance routines and getting used to pressure (acclimatization training) were the interventions that most reliably protected performance.",
      no: "En gjennomgang av 47 studier om å «kollapse» under press: prestasjonsrutiner og det å venne seg til press (tilvenningstrening) var tiltakene som mest pålitelig beskyttet prestasjonen.",
    },
  },

  // ── Confidence & self-efficacy ────────────────────────────────────
  {
    id: "moritz-2000",
    topic: "confidence",
    title:
      "The relation of self-efficacy measures to sport performance: a meta-analytic review",
    authors: "Moritz SE, Feltz DL, Fahrbach KR & Mack DE",
    year: 2000,
    venue: "Research Quarterly for Exercise and Sport, 71(3), 280–294",
    url: "https://pubmed.ncbi.nlm.nih.gov/10999265/",
    pmid: "10999265",
    doi: "10.1080/02701367.2000.10608908",
    kind: KIND.meta,
    summary: {
      en: "Across 45 studies, athletes' self-efficacy — their belief that they can perform a specific task — was clearly linked to how they actually performed (average correlation .38).",
      no: "På tvers av 45 studier hang utøvernes mestringstro — troen på at de klarer en bestemt oppgave — tydelig sammen med hvordan de faktisk presterte (gjennomsnittlig korrelasjon 0,38).",
    },
  },
  {
    id: "lochbaum-2022",
    topic: "confidence",
    title:
      "Revisiting the Self-Confidence and Sport Performance Relationship: A Systematic Review with Meta-Analysis",
    authors: "Lochbaum M, Sherburn M, et al.",
    year: 2022,
    venue:
      "International Journal of Environmental Research and Public Health, 19(11), 6381",
    url: "https://pubmed.ncbi.nlm.nih.gov/35681963/",
    pmid: "35681963",
    doi: "10.3390/ijerph19116381",
    kind: KIND.meta,
    summary: {
      en: "A meta-analysis of 41 studies with 3,711 athletes from 24 sports: self-confidence and sport performance are consistently positively related.",
      no: "En metaanalyse av 41 studier med 3 711 utøvere fra 24 idretter: selvtillit og idrettsprestasjon henger konsekvent positivt sammen.",
    },
  },
];

export function sourcesForTopic(topic: TopicKey): Source[] {
  return SOURCES.filter((s) => s.topic === topic);
}
