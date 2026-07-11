"use client";

import { useT, type L10n } from "@/lib/i18n";
import type { TopicKey } from "@/lib/lessons";
import { SOURCES } from "@/lib/sources";

const TOPIC_LABELS: Record<TopicKey, L10n> = {
  "youth-wellbeing": {
    en: "Young athletes & mental health",
    no: "Unge utøvere og psykisk helse",
  },
  "goal-setting": { en: "Goal setting", no: "Målsetting" },
  "arousal-regulation": {
    en: "Nerves & breathing",
    no: "Nerver og pust",
  },
  "self-talk": { en: "Self-talk", no: "Indre dialog" },
  imagery: { en: "Imagery & visualization", no: "Visualisering" },
  mindfulness: { en: "Mindfulness & focus", no: "Oppmerksomhet og fokus" },
  routines: { en: "Pre-performance routines", no: "Prestasjonsrutiner" },
  confidence: { en: "Confidence & self-efficacy", no: "Selvtillit og mestringstro" },
};

const TOPIC_ORDER: TopicKey[] = [
  "youth-wellbeing",
  "goal-setting",
  "arousal-regulation",
  "self-talk",
  "imagery",
  "mindfulness",
  "routines",
  "confidence",
];

export default function SourcesPage() {
  const t = useT();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-bold text-tq-900">
          {t({ en: "The science behind the app", no: "Forskningen bak appen" })}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          {t({
            en: "Everything in this app — the lessons and the coach — is grounded in peer-reviewed research: studies published in scientific journals and checked by other experts before publication. We looked for meta-analyses and systematic reviews (studies of many studies) on PubMed and similar databases, and every citation below was independently verified against the journal's own records before making it into the app.",
            no: "Alt i denne appen — leksjonene og coachen — er bygget på fagfellevurdert forskning: studier publisert i vitenskapelige tidsskrifter og kontrollert av andre eksperter før publisering. Vi lette etter metaanalyser og systematiske oversikter (studier av mange studier) på PubMed og lignende databaser, og hver kilde nedenfor ble uavhengig verifisert mot tidsskriftets egne registre før den kom inn i appen.",
          })}
        </p>
      </div>

      {SOURCES.length === 0 ? (
        <p className="rounded-2xl bg-tq-50 px-4 py-3 text-sm text-tq-800">
          {t({
            en: "The evidence library is being assembled — check back soon.",
            no: "Kildebiblioteket er under arbeid — kom snart tilbake.",
          })}
        </p>
      ) : (
        TOPIC_ORDER.map((topic) => {
          const sources = SOURCES.filter((s) => s.topic === topic);
          if (sources.length === 0) return null;
          return (
            <section key={topic}>
              <h2 className="mb-2 font-bold text-tq-800">
                {t(TOPIC_LABELS[topic])}
              </h2>
              <ul className="flex flex-col gap-3">
                {sources.map((source) => (
                  <li
                    key={source.id}
                    className="rounded-2xl border border-tq-100 p-4"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold leading-snug text-tq-900">
                        {source.title}
                      </p>
                      <span className="shrink-0 rounded-full bg-tq-50 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-tq-700">
                        {t(source.kind)}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">
                      {source.authors} ({source.year}) · <em>{source.venue}</em>
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">
                      {t(source.summary)}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-3 text-xs">
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-tq-600 underline decoration-tq-300 underline-offset-2 hover:text-tq-700"
                      >
                        {t({ en: "Read the source", no: "Les kilden" })} ↗
                      </a>
                      {source.pmid && (
                        <span className="text-slate-400">
                          PMID: {source.pmid}
                        </span>
                      )}
                      {source.doi && (
                        <span className="break-all text-slate-400">
                          DOI: {source.doi}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          );
        })
      )}

      <p className="rounded-2xl bg-slate-50 px-4 py-3 text-xs leading-relaxed text-slate-500">
        {t({
          en: "Science evolves: single studies can be wrong, and even reviews get updated. That's why we prefer meta-analyses, name our sources, and link straight to them so you (or your coach, or your parents) can check everything yourself.",
          no: "Forskning utvikler seg: enkeltstudier kan ta feil, og selv oversikter oppdateres. Derfor foretrekker vi metaanalyser, navngir kildene våre og lenker rett til dem, slik at du (eller treneren eller foreldrene dine) kan sjekke alt selv.",
        })}
      </p>
    </div>
  );
}
