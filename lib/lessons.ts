import type { L10n } from "@/lib/i18n";

/** Topics mirror the evidence library — each lesson cites its topic's verified sources. */
export type TopicKey =
  | "youth-wellbeing"
  | "goal-setting"
  | "arousal-regulation"
  | "self-talk"
  | "imagery"
  | "mindfulness"
  | "routines"
  | "confidence";

export type ExerciseKind =
  | "checkin"
  | "goals"
  | "breathing"
  | "selftalk"
  | "imagery"
  | "focus"
  | "routine"
  | "confidence";

export type Lesson = {
  id: string;
  topic: TopicKey;
  emoji: string;
  title: L10n;
  tagline: L10n;
  minutes: number;
  intro: L10n;
  science: L10n;
  sections: { heading: L10n; body: L10n }[];
  exercise: ExerciseKind;
  exerciseTitle: L10n;
  exerciseIntro: L10n;
  takeaways: L10n[];
};

export const LESSONS: Lesson[] = [
  {
    id: "what-is-mental-training",
    topic: "youth-wellbeing",
    emoji: "🧠",
    title: { en: "What is mental training?", no: "Hva er mental trening?" },
    tagline: {
      en: "Your brain is trainable — just like your body",
      no: "Hjernen din kan trenes — akkurat som kroppen",
    },
    minutes: 6,
    intro: {
      en: "You already train your legs, your lungs and your technique. Mental training means practicing the skills in your head — focus, confidence, staying calm — the same way: a little at a time, over and over. Nobody is just \"born with\" a strong mindset. It's built.",
      no: "Du trener allerede bein, lunger og teknikk. Mental trening betyr å øve på ferdighetene i hodet — fokus, selvtillit, å holde seg rolig — på samme måte: litt om gangen, om og om igjen. Ingen er bare «født med» et sterkt hode. Det bygges.",
    },
    science: {
      en: "Research on athletes shows that mental skills like goal setting, self-talk and imagery can be learned, and that practicing them is linked to better performance and better wellbeing. Sports medicine organizations also remind us that athletes get stressed, nervous and low sometimes — that's normal, and asking for support is a strength, not a weakness.",
      no: "Forskning på utøvere viser at mentale ferdigheter som målsetting, indre dialog og visualisering kan læres, og at trening på dem henger sammen med bedre prestasjon og bedre trivsel. Idrettsmedisinske organisasjoner minner oss også på at utøvere blir stressa, nervøse og nedfor iblant — det er normalt, og å be om støtte er en styrke, ikke en svakhet.",
    },
    sections: [
      {
        heading: { en: "Mental skills are skills", no: "Mentale ferdigheter er ferdigheter" },
        body: {
          en: "Think of your mind like a muscle group you haven't trained systematically yet. A free throw feels awkward the first hundred times — then it becomes automatic. Calming your nerves or refocusing after a mistake works exactly the same way. The exercises in this app are short reps for your brain.",
          no: "Tenk på hodet ditt som en muskelgruppe du ikke har trent systematisk ennå. Et straffekast føles klønete de første hundre gangene — så blir det automatisk. Å roe nervene eller finne fokus igjen etter en feil fungerer på akkurat samme måte. Øvelsene i denne appen er korte repetisjoner for hjernen.",
        },
      },
      {
        heading: { en: "What you'll learn here", no: "Hva du lærer her" },
        body: {
          en: "This course covers the basics that sport psychologists teach first: setting goals that actually motivate you, breathing to control nerves, talking to yourself like a good coach, seeing success before it happens, focusing on the next play, building routines, and growing real confidence. One lesson at a time.",
          no: "Dette kurset dekker det grunnleggende som idrettspsykologer lærer bort først: å sette mål som faktisk motiverer deg, pusteteknikk mot nerver, å snakke til deg selv som en god trener, å se suksess før den skjer, å fokusere på neste aksjon, å bygge rutiner og å utvikle ekte selvtillit. Én leksjon om gangen.",
        },
      },
      {
        heading: { en: "When to ask for help", no: "Når du bør be om hjelp" },
        body: {
          en: "Mental training is for performance and everyday nerves — it is not therapy. If you feel sad, anxious or exhausted most days, if sport has stopped being fun for a long stretch, or if things feel too heavy to handle alone: talk to a parent, coach, school nurse or doctor. Elite athletes do exactly this. It works.",
          no: "Mental trening er for prestasjon og hverdagsnerver — det er ikke terapi. Hvis du føler deg trist, engstelig eller utslitt de fleste dager, hvis idretten har sluttet å være gøy over lengre tid, eller hvis ting kjennes for tungt å bære alene: snakk med en forelder, trener, helsesykepleier eller lege. Toppidrettsutøvere gjør akkurat dette. Det funker.",
        },
      },
    ],
    exercise: "checkin",
    exerciseTitle: { en: "Mental skills check-in", no: "Mental sjekk-inn" },
    exerciseIntro: {
      en: "Rate where you are today. There are no wrong answers — this is your starting point, and you can come back later to see how you've grown.",
      no: "Vurder hvor du er i dag. Det finnes ingen gale svar — dette er startpunktet ditt, og du kan komme tilbake senere og se hvordan du har utviklet deg.",
    },
    takeaways: [
      {
        en: "Mental skills can be trained, just like physical skills.",
        no: "Mentale ferdigheter kan trenes, akkurat som fysiske.",
      },
      {
        en: "Small, regular practice beats big, rare efforts.",
        no: "Små, jevnlige økter slår store, sjeldne skippertak.",
      },
      {
        en: "Feeling nervous or low sometimes is normal — asking for help is a strength.",
        no: "Å være nervøs eller nedfor iblant er normalt — å be om hjelp er en styrke.",
      },
    ],
  },
  {
    id: "goal-setting",
    topic: "goal-setting",
    emoji: "🎯",
    title: { en: "Goals that actually work", no: "Mål som faktisk virker" },
    tagline: {
      en: "Dream big — then control what you can control",
      no: "Drøm stort — og styr det du kan styre",
    },
    minutes: 8,
    intro: {
      en: "\"I want to win\" is a dream, not a plan. Athletes who improve fastest turn big dreams into small, specific targets they can hit this week. This lesson shows you the three types of goals and how to combine them.",
      no: "«Jeg vil vinne» er en drøm, ikke en plan. Utøvere som utvikler seg raskest, gjør store drømmer om til små, konkrete mål de kan nå denne uka. Denne leksjonen viser deg de tre måltypene og hvordan du kombinerer dem.",
    },
    science: {
      en: "Goal setting is one of the most studied tools in sport psychology. Reviews of the research find that specific, challenging-but-realistic goals improve performance more than vague \"do your best\" goals — and that process goals (what you do) work especially well because they're fully under your control.",
      no: "Målsetting er et av de mest studerte verktøyene i idrettspsykologien. Oppsummeringer av forskningen viser at konkrete og passe utfordrende mål gir bedre prestasjon enn vage «gjør ditt beste»-mål — og at prosessmål (det du gjør) fungerer spesielt godt fordi du har full kontroll over dem.",
    },
    sections: [
      {
        heading: { en: "Three types of goals", no: "Tre typer mål" },
        body: {
          en: "Outcome goals are about results: win the league, make the team. Performance goals are about your own numbers: shave two seconds off your time, hit 80% of first serves. Process goals are about actions: do ten minutes of ball control after every practice. Outcome goals give direction — process goals do the work.",
          no: "Resultatmål handler om utfall: vinne serien, komme på laget. Prestasjonsmål handler om dine egne tall: kutte to sekunder på tida, treffe 80 % av førsteservene. Prosessmål handler om handlinger: ti minutter ballkontroll etter hver trening. Resultatmål gir retning — prosessmål gjør jobben.",
        },
      },
      {
        heading: { en: "Make them specific", no: "Gjør dem konkrete" },
        body: {
          en: "\"Get better at defense\" is impossible to measure. \"Win five 1-v-1 duels per match this month\" tells you exactly what to do and whether you did it. A good goal is specific, measurable, and challenging but realistic — hard enough to be exciting, close enough to be possible.",
          no: "«Bli bedre i forsvar» er umulig å måle. «Vinne fem 1-mot-1-dueller per kamp denne måneden» forteller deg nøyaktig hva du skal gjøre og om du klarte det. Et godt mål er konkret, målbart og passe utfordrende — vanskelig nok til å være spennende, nært nok til å være mulig.",
        },
      },
      {
        heading: { en: "Write it down, check it weekly", no: "Skriv det ned, sjekk det ukentlig" },
        body: {
          en: "A goal in your head is easy to forget or quietly abandon. Written goals that you review every week keep you honest — and let you celebrate progress you'd otherwise miss. Adjust goals when life changes; abandoning a goal on purpose is fine, drifting away from it isn't.",
          no: "Et mål i hodet er lett å glemme eller stille forlate. Nedskrevne mål som du ser over hver uke, holder deg ærlig — og lar deg feire framgang du ellers ville oversett. Juster målene når livet endrer seg; å droppe et mål med vilje er greit, å skli bort fra det er det ikke.",
        },
      },
    ],
    exercise: "goals",
    exerciseTitle: { en: "Your goal ladder", no: "Målstigen din" },
    exerciseIntro: {
      en: "Build a ladder from your dream down to this week: one dream goal, one performance goal, and two process goals you fully control.",
      no: "Bygg en stige fra drømmen din og ned til denne uka: ett drømmemål, ett prestasjonsmål og to prosessmål du har full kontroll over.",
    },
    takeaways: [
      {
        en: "Combine outcome, performance and process goals — they do different jobs.",
        no: "Kombiner resultat-, prestasjons- og prosessmål — de gjør ulike jobber.",
      },
      {
        en: "Specific and measurable beats vague every time.",
        no: "Konkret og målbart slår vagt hver gang.",
      },
      {
        en: "Process goals are 100% yours — no referee or opponent can take them away.",
        no: "Prosessmål er 100 % dine — ingen dommer eller motstander kan ta dem fra deg.",
      },
    ],
  },
  {
    id: "calm-breathing",
    topic: "arousal-regulation",
    emoji: "🌬️",
    title: { en: "Calm under pressure", no: "Rolig under press" },
    tagline: {
      en: "Your breath is a remote control for your nerves",
      no: "Pusten er fjernkontrollen til nervene dine",
    },
    minutes: 7,
    intro: {
      en: "Racing heart before a race? Butterflies before you step on court? That's your body getting ready to perform — but too much of it can make you tight and rushed. The fastest tool to dial it down is one you carry everywhere: your breath.",
      no: "Hjertebank før et løp? Sommerfugler før du går på banen? Det er kroppen som gjør seg klar til å prestere — men for mye av det kan gjøre deg stiv og stressa. Det raskeste verktøyet for å skru det ned har du alltid med deg: pusten.",
    },
    science: {
      en: "Slow, deep breathing — especially with a long, relaxed exhale — activates the body's calming system (the parasympathetic nervous system) and lowers heart rate. Studies of slow-paced breathing in athletes link it to reduced anxiety and better recovery, which is why it's a standard tool in sport psychology.",
      no: "Langsom, dyp pust — særlig med lang, avslappet utpust — aktiverer kroppens ro-system (det parasympatiske nervesystemet) og senker pulsen. Studier av langsom pust hos utøvere kobler det til mindre nervøsitet og bedre restitusjon, og derfor er det et standardverktøy i idrettspsykologien.",
    },
    sections: [
      {
        heading: { en: "Nerves aren't the enemy", no: "Nerver er ikke fienden" },
        body: {
          en: "The adrenaline that makes your heart pound also makes you faster and sharper. Top athletes don't feel zero nerves — they interpret them as readiness. The goal isn't to delete the feeling; it's to keep it at a level where you still play loose and think clearly.",
          no: "Adrenalinet som får hjertet til å dunke, gjør deg også raskere og skarpere. Topputøvere føler ikke null nerver — de tolker dem som tegn på at kroppen er klar. Målet er ikke å slette følelsen, men å holde den på et nivå der du fortsatt spiller løst og tenker klart.",
        },
      },
      {
        heading: { en: "The long exhale trick", no: "Trikset med lang utpust" },
        body: {
          en: "Breathe in through your nose for about 4 seconds, low into your belly. Pause briefly. Then breathe out slowly for about 6 seconds, like you're gently fogging a mirror. The exhale is where the calming happens — make it longer than the inhale. Four to six rounds is enough to feel a difference.",
          no: "Pust inn gjennom nesa i cirka 4 sekunder, lavt ned i magen. Hold pusten et lite øyeblikk. Pust så rolig ut i cirka 6 sekunder, som om du dugger et speil forsiktig. Det er utpusten som roer — gjør den lengre enn innpusten. Fire til seks runder er nok til å kjenne forskjell.",
        },
      },
      {
        heading: { en: "When to use it", no: "Når du bruker det" },
        body: {
          en: "In the locker room before the game. On the start line. After a mistake, to reset. Between points, sets or attempts. Even in bed before a big day. Like any skill, it works best under pressure if you've practiced it when calm — so do your reps this week.",
          no: "I garderoben før kampen. På startstreken. Etter en feil, for å nullstille. Mellom poeng, sett eller forsøk. Til og med i senga før en stor dag. Som alle ferdigheter virker den best under press hvis du har øvd når du er rolig — så ta repetisjonene dine denne uka.",
        },
      },
    ],
    exercise: "breathing",
    exerciseTitle: { en: "Guided calm breathing", no: "Guidet rolig pust" },
    exerciseIntro: {
      en: "Follow the circle: in for 4, hold for 2, out for 6. Six rounds — about one minute. Sit or stand relaxed, shoulders down.",
      no: "Følg sirkelen: inn i 4, hold i 2, ut i 6. Seks runder — omtrent ett minutt. Sitt eller stå avslappet, med senkede skuldre.",
    },
    takeaways: [
      {
        en: "Nerves mean your body is ready — you just steer the level.",
        no: "Nerver betyr at kroppen er klar — du styrer bare nivået.",
      },
      {
        en: "A slow exhale, longer than the inhale, is the fastest calming tool.",
        no: "En rolig utpust, lengre enn innpusten, er det raskeste ro-verktøyet.",
      },
      {
        en: "Practice breathing when calm so it works when it counts.",
        no: "Øv på pusten når du er rolig, så virker den når det gjelder.",
      },
    ],
  },
  {
    id: "self-talk",
    topic: "self-talk",
    emoji: "💬",
    title: { en: "Talk to yourself like a coach", no: "Snakk til deg selv som en trener" },
    tagline: {
      en: "The voice in your head is on your team — train it",
      no: "Stemmen i hodet ditt er på laget ditt — tren den",
    },
    minutes: 8,
    intro: {
      en: "Everyone has an inner voice. After a mistake it might yell \"you always mess up!\" — words you would never say to a teammate. Self-talk training means noticing that voice and giving it better lines. Not fake positivity: useful instructions and honest encouragement.",
      no: "Alle har en indre stemme. Etter en feil roper den kanskje «du ødelegger alltid!» — ord du aldri ville sagt til en lagkamerat. Trening på indre dialog handler om å legge merke til stemmen og gi den bedre replikker. Ikke falsk positivitet: nyttige instruksjoner og ærlig oppmuntring.",
    },
    science: {
      en: "A large body of research, including meta-analyses across dozens of studies, shows that planned self-talk improves sport performance. Instructional self-talk (\"elbow high\", \"soft hands\") helps most with technique and precision, while motivational self-talk (\"you've got this\", \"strong finish\") helps with effort and endurance.",
      no: "Mye forskning, inkludert metaanalyser av titalls studier, viser at planlagt indre dialog forbedrer idrettsprestasjon. Instruerende selvsnakk («høy albue», «myke hender») hjelper mest på teknikk og presisjon, mens motiverende selvsnakk («du klarer dette», «sterk avslutning») hjelper på innsats og utholdenhet.",
    },
    sections: [
      {
        heading: { en: "Catch the automatic voice", no: "Fang den automatiske stemmen" },
        body: {
          en: "You can't change what you don't notice. This week, pay attention to what you say to yourself after a mistake, before a hard moment, and when you're tired. Just noticing it — \"there's the harsh voice again\" — already takes away some of its power.",
          no: "Du kan ikke endre det du ikke legger merke til. Denne uka: følg med på hva du sier til deg selv etter en feil, før et vanskelig øyeblikk, og når du er sliten. Bare det å legge merke til det — «der er den strenge stemmen igjen» — tar allerede bort noe av kraften dens.",
        },
      },
      {
        heading: { en: "Two kinds that work", no: "To typer som virker" },
        body: {
          en: "Instructional: short technical cues that point your focus at the right thing — \"see the ball\", \"quick feet\", \"long stride\". Motivational: fuel for effort — \"one more rep\", \"you're strong\", \"attack\". Pick words that are short, personal and believable. Slogans you don't believe in don't work.",
          no: "Instruerende: korte tekniske stikkord som retter fokuset mot riktig ting — «se ballen», «raske føtter», «lange steg». Motiverende: drivstoff for innsats — «én til», «du er sterk», «angrip». Velg ord som er korte, personlige og troverdige. Slagord du ikke tror på, virker ikke.",
        },
      },
      {
        heading: { en: "The teammate test", no: "Lagkamerat-testen" },
        body: {
          en: "When the harsh voice shows up, run the teammate test: would I say this to my best friend after the same mistake? If not, rewrite it. \"I always choke\" becomes \"That one's gone — next play, low and hard.\" Some athletes get extra distance by using their own name: \"Okay Sara, breathe, you know this.\"",
          no: "Når den strenge stemmen dukker opp, kjør lagkamerat-testen: ville jeg sagt dette til bestevennen min etter samme feil? Hvis ikke, skriv om. «Jeg roter det alltid til» blir «Den er borte — neste aksjon, lavt og hardt.» Noen utøvere får ekstra avstand ved å bruke sitt eget navn: «Okei Sara, pust, du kan dette.»",
        },
      },
    ],
    exercise: "selftalk",
    exerciseTitle: { en: "Reframe builder", no: "Omformulerings-verksted" },
    exerciseIntro: {
      en: "Take a harsh thought you've actually had in sport, and rewrite it into something a good coach would say. Save your best lines — they become your script.",
      no: "Ta en streng tanke du faktisk har hatt i idretten, og skriv den om til noe en god trener ville sagt. Lagre de beste replikkene dine — de blir manuset ditt.",
    },
    takeaways: [
      {
        en: "Planned self-talk measurably improves performance — it's not just vibes.",
        no: "Planlagt indre dialog gir målbart bedre prestasjon — det er ikke bare «gode vibber».",
      },
      {
        en: "Instructional cues for technique, motivational lines for effort.",
        no: "Instruerende stikkord for teknikk, motiverende replikker for innsats.",
      },
      {
        en: "The teammate test: never say to yourself what you wouldn't say to a friend.",
        no: "Lagkamerat-testen: aldri si til deg selv det du ikke ville sagt til en venn.",
      },
    ],
  },
  {
    id: "visualization",
    topic: "imagery",
    emoji: "🎬",
    title: { en: "See it before you do it", no: "Se det før du gjør det" },
    tagline: {
      en: "Imagery: extra reps without extra load",
      no: "Visualisering: ekstra repetisjoner uten ekstra belastning",
    },
    minutes: 8,
    intro: {
      en: "Watch a ski racer before their run: eyes closed, body swaying through every gate. That's imagery — mentally rehearsing a performance in vivid detail. Done right, it's like getting extra practice reps without touching your legs.",
      no: "Se på en alpinist før rennet: lukkede øyne, kroppen svaier gjennom hver port. Det er visualisering — mental gjennomkjøring av en prestasjon i levende detalj. Gjort riktig er det som ekstra treningsrepetisjoner uten å belaste kroppen.",
    },
    science: {
      en: "Imagery is among the best-documented techniques in sport psychology: reviews and meta-analyses find that combining mental practice with physical practice improves performance more than physical practice alone. Frameworks like PETTLEP recommend making the image as close to the real situation as possible — same position, same kit, same timing.",
      no: "Visualisering er blant de best dokumenterte teknikkene i idrettspsykologien: oppsummeringer og metaanalyser viser at mental trening kombinert med fysisk trening gir bedre prestasjon enn fysisk trening alene. Rammeverk som PETTLEP anbefaler å gjøre bildet så likt den virkelige situasjonen som mulig — samme posisjon, samme utstyr, samme tempo.",
    },
    sections: [
      {
        heading: { en: "All senses, not just eyes", no: "Alle sanser, ikke bare synet" },
        body: {
          en: "Good imagery is more than a mental movie. Feel the grip in your hands, hear the crowd and your breathing, sense your muscles working, notice the smell of the gym or the grass. The more senses you load in, the more your brain treats it like the real thing.",
          no: "God visualisering er mer enn en mental film. Kjenn grepet i hendene, hør publikum og din egen pust, kjenn musklene jobbe, legg merke til lukten av hallen eller gresset. Jo flere sanser du kobler på, desto mer behandler hjernen det som ekte.",
        },
      },
      {
        heading: { en: "Make it real", no: "Gjør det virkelig" },
        body: {
          en: "Rehearse in real time, not fast-forward. Stand or sit the way you would in the real moment. Wear or hold your gear if you can. Picture the venue you'll actually compete in. See it from inside your own eyes first — that's the view you'll have on game day.",
          no: "Kjør gjennom i sanntid, ikke på spoling. Stå eller sitt slik du ville gjort i det virkelige øyeblikket. Bruk eller hold utstyret ditt hvis du kan. Se for deg arenaen du faktisk skal konkurrere i. Se det innenfra dine egne øyne først — det er utsikten du har på konkurransedagen.",
        },
      },
      {
        heading: { en: "Rehearse the recovery too", no: "Øv på opphentingen også" },
        body: {
          en: "Don't only visualize perfection. Imagine the serve that goes long — and then your calm reset and the next good serve. Rehearsing how you respond to mistakes builds a plan your brain can grab under pressure, so one error doesn't become three.",
          no: "Ikke visualiser bare det perfekte. Se for deg serven som går langt ut — og deretter din rolige nullstilling og neste gode serve. Å øve på hvordan du reagerer på feil, bygger en plan hjernen kan gripe til under press, sånn at én feil ikke blir til tre.",
        },
      },
    ],
    exercise: "imagery",
    exerciseTitle: { en: "Guided imagery rep", no: "Guidet visualisering" },
    exerciseIntro: {
      en: "A two-minute guided rehearsal of one skill you want to sharpen. Find a quiet spot, sit comfortably, and follow the steps.",
      no: "En to-minutters guidet gjennomkjøring av én ferdighet du vil skjerpe. Finn et rolig sted, sitt godt, og følg stegene.",
    },
    takeaways: [
      {
        en: "Imagery + physical practice beats physical practice alone.",
        no: "Visualisering + fysisk trening slår fysisk trening alene.",
      },
      {
        en: "Use all your senses and real timing — make the image lifelike.",
        no: "Bruk alle sansene og ekte tempo — gjør bildet virkelighetsnært.",
      },
      {
        en: "Rehearse your response to mistakes, not just perfect runs.",
        no: "Øv på reaksjonen din på feil, ikke bare perfekte gjennomkjøringer.",
      },
    ],
  },
  {
    id: "focus",
    topic: "mindfulness",
    emoji: "🧘",
    title: { en: "Focus on the next play", no: "Fokus på neste aksjon" },
    tagline: {
      en: "Train your attention to come back — fast",
      no: "Tren oppmerksomheten din til å komme raskt tilbake",
    },
    minutes: 7,
    intro: {
      en: "Your mind will wander mid-game. To the mistake you just made, to the scoreboard, to what people think. That's not a flaw — it's what minds do. The skill isn't never losing focus; it's noticing you've lost it and bringing it back to right now.",
      no: "Tankene dine vil vandre midt i kampen. Til feilen du nettopp gjorde, til stillingen, til hva folk tenker. Det er ikke en svakhet — det er sånn hjernen fungerer. Ferdigheten er ikke å aldri miste fokus, men å merke at du har mistet det og hente det tilbake til akkurat nå.",
    },
    science: {
      en: "Mindfulness-based programs designed for athletes (like MSPE and the MAC approach) have been tested in real teams. Reviews of these studies report improvements in attention, lower competition anxiety, and more \"flow\" — the locked-in feeling where performance comes easily. The core exercise is simple: focus on one anchor, notice when you drift, return without beating yourself up.",
      no: "Mindfulness-programmer laget for utøvere (som MSPE og MAC-tilnærmingen) er testet på ekte lag. Oppsummeringer av disse studiene rapporterer bedre oppmerksomhet, mindre konkurranseangst og mer «flow» — den låste følelsen der prestasjonen kommer lett. Kjerneøvelsen er enkel: fokuser på ett ankerpunkt, merk når du glir vekk, vend tilbake uten å dømme deg selv.",
    },
    sections: [
      {
        heading: { en: "The reset skill", no: "Nullstillings-ferdigheten" },
        body: {
          en: "Dwelling on a mistake steals attention from the next play — and the next play is the only one you can still affect. Great competitors have a short memory on purpose: acknowledge the error, take one breath, pick a cue for what's next. Mistake, breath, next.",
          no: "Å dvele ved en feil stjeler oppmerksomhet fra neste aksjon — og neste aksjon er den eneste du fortsatt kan påvirke. Gode konkurrenter har kort hukommelse med vilje: anerkjenn feilen, ta ett pust, velg et stikkord for det som kommer. Feil, pust, neste.",
        },
      },
      {
        heading: { en: "Anchors", no: "Ankerpunkter" },
        body: {
          en: "An anchor is something in the present moment you can always return to: your breath, the feeling of your feet on the ground, the ball in your hands, the sound of the arena. When your head runs to the past or future, the anchor pulls you back to now. Choose one anchor and use it every time.",
          no: "Et anker er noe i nåøyeblikket du alltid kan vende tilbake til: pusten, følelsen av føttene mot underlaget, ballen i hendene, lyden i hallen. Når hodet stikker til fortida eller framtida, drar ankeret deg tilbake til nå. Velg ett anker og bruk det hver gang.",
        },
      },
      {
        heading: { en: "Don't judge the wandering", no: "Ikke døm vandringen" },
        body: {
          en: "Here's the counterintuitive part: getting annoyed at yourself for losing focus is just more lost focus. In mindfulness training, every time you notice your mind has wandered and calmly return — that's a successful rep, not a failure. Noticing is the exercise.",
          no: "Her er det som overrasker mange: å irritere seg over at du mistet fokus, er bare enda mer mistet fokus. I oppmerksomhetstrening er hver gang du merker at tankene har vandret og rolig vender tilbake, en vellykket repetisjon — ikke en feil. Det å legge merke til det er selve øvelsen.",
        },
      },
    ],
    exercise: "focus",
    exerciseTitle: { en: "One-minute focus rep", no: "Ett-minutts fokusøvelse" },
    exerciseIntro: {
      en: "For 60 seconds, keep your attention on your breathing and tap once for every exhale. When your mind wanders (it will), just notice it and come back. The score isn't the point — the returning is.",
      no: "I 60 sekunder: hold oppmerksomheten på pusten og trykk én gang for hver utpust. Når tankene vandrer (det gjør de), bare legg merke til det og kom tilbake. Poengsummen er ikke poenget — tilbakevendingen er.",
    },
    takeaways: [
      {
        en: "Attention wanders — noticing and returning IS the skill.",
        no: "Oppmerksomheten vandrer — å merke det og vende tilbake ER ferdigheten.",
      },
      {
        en: "Use one anchor (breath, feet, ball) to come back to the present.",
        no: "Bruk ett anker (pust, føtter, ball) for å komme tilbake til nået.",
      },
      {
        en: "After a mistake: acknowledge, breathe, focus on the next play.",
        no: "Etter en feil: anerkjenn, pust, fokuser på neste aksjon.",
      },
    ],
  },
  {
    id: "routines",
    topic: "routines",
    emoji: "📋",
    title: { en: "Build your pre-performance routine", no: "Bygg din prestasjonsrutine" },
    tagline: {
      en: "Same steps, every time — calm on demand",
      no: "Samme steg, hver gang — ro på bestilling",
    },
    minutes: 7,
    intro: {
      en: "Watch a basketball player before a free throw: three dribbles, spin the ball, breathe, shoot. Every single time. That's not superstition — it's a pre-performance routine, and it's one of the most reliable tricks in sport for performing under pressure.",
      no: "Se på en basketspiller før et straffekast: tre sprett, snurr ballen, pust, skyt. Hver eneste gang. Det er ikke overtro — det er en prestasjonsrutine, og det er et av de mest pålitelige triksene i idretten for å prestere under press.",
    },
    science: {
      en: "Studies and meta-analyses of pre-performance routines — especially in self-paced skills like free throws, serves, penalties and putts — show that athletes who follow a consistent routine perform better, particularly under pressure. The routine gives your brain a familiar track to run on, leaving less room for overthinking and distraction.",
      no: "Studier og metaanalyser av prestasjonsrutiner — særlig i selvstyrte ferdigheter som straffekast, server, straffer og putter — viser at utøvere som følger en fast rutine presterer bedre, spesielt under press. Rutinen gir hjernen et kjent spor å kjøre på, med mindre rom for overtenking og distraksjon.",
    },
    sections: [
      {
        heading: { en: "Why routines beat nerves", no: "Hvorfor rutiner slår nerver" },
        body: {
          en: "Under pressure, your brain wants to think about everything at once: the score, the crowd, what happens if you miss. A routine replaces that chaos with a short, familiar checklist. Your body has done these steps a thousand times, so it relaxes into autopilot — exactly where well-trained skills live.",
          no: "Under press vil hjernen tenke på alt på en gang: stillingen, publikum, hva som skjer hvis du bommer. En rutine erstatter kaoset med en kort, kjent sjekkliste. Kroppen har gjort disse stegene tusen ganger, så den slapper av inn i autopilot — akkurat der godt trente ferdigheter bor.",
        },
      },
      {
        heading: { en: "Build it from three parts", no: "Bygg den av tre deler" },
        body: {
          en: "A solid routine has: (1) a physical action that grounds you — bounce the ball, adjust your grip, roll your shoulders; (2) one calm breath; (3) a cue — one word or image that points your focus at the task: \"smooth\", \"low and hard\", \"through the target\". Keep the whole thing under 10 seconds.",
          no: "En solid rutine har: (1) en fysisk handling som jorder deg — sprett ballen, juster grepet, rull skuldrene; (2) ett rolig pust; (3) et stikkord — ett ord eller bilde som retter fokuset mot oppgaven: «mykt», «lavt og hardt», «gjennom målet». Hold hele rutinen under 10 sekunder.",
        },
      },
      {
        heading: { en: "A reset routine for mistakes", no: "En nullstillingsrutine for feil" },
        body: {
          en: "Make a second, even shorter routine for after errors: a physical \"delete\" gesture (wipe your hand on your shorts, tap the ground), one breath, one cue for the next play. Practice both routines in training until they're automatic — a routine invented on game day won't hold up.",
          no: "Lag en ekstra, enda kortere rutine for etter feil: en fysisk «slett»-bevegelse (tørk hånda på shortsen, klapp i bakken), ett pust, ett stikkord for neste aksjon. Øv på begge rutinene på trening til de er automatiske — en rutine du finner på på kampdagen, holder ikke.",
        },
      },
    ],
    exercise: "routine",
    exerciseTitle: { en: "Routine builder", no: "Rutinebyggeren" },
    exerciseIntro: {
      en: "Pick a moment in your sport (serve, free throw, start line...), then build your routine: 2–4 steps, under 10 seconds. Save it and start drilling it in practice.",
      no: "Velg et øyeblikk i idretten din (serve, straffekast, startstrek ...), og bygg rutinen din: 2–4 steg, under 10 sekunder. Lagre den og begynn å drille den på trening.",
    },
    takeaways: [
      {
        en: "Consistent routines improve performance under pressure — it's well documented.",
        no: "Faste rutiner gir bedre prestasjon under press — det er godt dokumentert.",
      },
      {
        en: "Physical action + breath + cue word, all under 10 seconds.",
        no: "Fysisk handling + pust + stikkord, alt under 10 sekunder.",
      },
      {
        en: "Drill the routine in training until it's automatic.",
        no: "Drill rutinen på trening til den er automatisk.",
      },
    ],
  },
  {
    id: "confidence",
    topic: "confidence",
    emoji: "💪",
    title: { en: "Confidence you can build", no: "Selvtillit du kan bygge" },
    tagline: {
      en: "Confidence isn't a mood — it's evidence",
      no: "Selvtillit er ikke et humør — det er bevis",
    },
    minutes: 8,
    intro: {
      en: "Confidence can feel like weather: some days it's there, some days it's gone. But sport psychology treats it differently — as something built from concrete sources you can stack up on purpose. That means low confidence isn't a personality trait. It's a supply problem.",
      no: "Selvtillit kan føles som vær: noen dager er den der, andre dager er den borte. Men idrettspsykologien behandler den annerledes — som noe som bygges av konkrete kilder du kan stable opp med vilje. Det betyr at lav selvtillit ikke er et personlighetstrekk. Det er et forsyningsproblem.",
    },
    science: {
      en: "The classic theory here is self-efficacy — your belief in your ability to do a specific task. Decades of research show it predicts performance, and that its strongest source is mastery experiences: proof that you've done it (or something close) before. Other sources include watching others succeed, encouragement you trust, and how you read your body's signals.",
      no: "Den klassiske teorien her er mestringstro («self-efficacy») — troen din på at du klarer en bestemt oppgave. Flere tiår med forskning viser at den predikerer prestasjon, og at den sterkeste kilden er mestringserfaringer: bevis på at du har fått det til (eller noe lignende) før. Andre kilder er å se andre lykkes, oppmuntring du stoler på, og hvordan du tolker kroppens signaler.",
    },
    sections: [
      {
        heading: { en: "Collect your proof", no: "Samle bevisene dine" },
        body: {
          en: "Your memory is biased — it replays the misses and forgets the wins. Fight back with a written evidence bank: training sessions where you pushed through, skills that used to be impossible and are now easy, matches where you handled pressure. Before competition, read your bank. This is confidence with receipts.",
          no: "Hukommelsen din er partisk — den spiller av bommene og glemmer seirene. Slå tilbake med en skriftlig bevisbank: økter der du sto i det, ferdigheter som før var umulige og nå er enkle, kamper der du taklet presset. Les banken din før konkurranse. Dette er selvtillit med kvittering.",
        },
      },
      {
        heading: { en: "Preparation is a source", no: "Forberedelse er en kilde" },
        body: {
          en: "Nothing beats the quiet confidence of knowing you've done the work. Every completed practice, every rehearsed routine, every visualized rep goes into the same account. That's also why the other lessons in this app feed this one: goals give you wins to record, imagery gives you successful reps, routines give you a plan you trust.",
          no: "Ingenting slår den rolige tryggheten i å vite at du har gjort jobben. Hver gjennomførte trening, hver innøvde rutine, hver visualiserte repetisjon går inn på samme konto. Derfor bygger de andre leksjonene i appen opp under denne: mål gir deg seire å notere, visualisering gir deg vellykkede repetisjoner, rutiner gir deg en plan du stoler på.",
        },
      },
      {
        heading: { en: "Act it, don't fake it", no: "Vis det, ikke lat som" },
        body: {
          en: "Body language talks back to your brain. Shoulders back, head up, walking with purpose — these don't make problems disappear, but they nudge how you feel and how opponents read you. Combine that with your best self-talk lines, and you can act your way into a more confident state even on a shaky day.",
          no: "Kroppsspråket snakker tilbake til hjernen. Skuldrene tilbake, hodet oppe, målbevisst gange — det får ikke problemer til å forsvinne, men det påvirker hvordan du føler deg og hvordan motstandere leser deg. Kombiner det med de beste selvsnakk-replikkene dine, så kan du handle deg inn i en tryggere tilstand selv på en skjelven dag.",
        },
      },
    ],
    exercise: "confidence",
    exerciseTitle: { en: "Your evidence bank", no: "Bevisbanken din" },
    exerciseIntro: {
      en: "Deposit at least three pieces of evidence: things you've achieved, struggles you've pushed through, skills you've built. Keep adding to it — and read it before your next competition.",
      no: "Sett inn minst tre bevis: ting du har fått til, motgang du har stått i, ferdigheter du har bygget. Fortsett å fylle på — og les den før neste konkurranse.",
    },
    takeaways: [
      {
        en: "Confidence is built from evidence — mastery experiences are the strongest source.",
        no: "Selvtillit bygges av bevis — mestringserfaringer er den sterkeste kilden.",
      },
      {
        en: "Keep a written evidence bank; read it before you compete.",
        no: "Før en skriftlig bevisbank; les den før du konkurrerer.",
      },
      {
        en: "Preparation, body language and self-talk all feed the same account.",
        no: "Forberedelser, kroppsspråk og indre dialog fyller alle samme konto.",
      },
    ],
  },
];

export function getLesson(id: string): Lesson | undefined {
  return LESSONS.find((l) => l.id === id);
}
