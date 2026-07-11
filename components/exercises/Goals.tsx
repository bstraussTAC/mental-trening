"use client";

import { useState } from "react";
import { useT, type L10n } from "@/lib/i18n";
import { useLocalStorage } from "@/lib/progress";

type GoalLadder = {
  dream: string;
  performance: string;
  process1: string;
  process2: string;
};

const EMPTY: GoalLadder = { dream: "", performance: "", process1: "", process2: "" };

const FIELDS: {
  key: keyof GoalLadder;
  label: L10n;
  placeholder: L10n;
  hint: L10n;
}[] = [
  {
    key: "dream",
    label: { en: "Dream goal (outcome)", no: "Drømmemål (resultat)" },
    placeholder: {
      en: "e.g. Make the regional team next season",
      no: "f.eks. Komme på kretslaget neste sesong",
    },
    hint: {
      en: "Where do you want to end up? Big is fine.",
      no: "Hvor vil du ende opp? Stort er helt greit.",
    },
  },
  {
    key: "performance",
    label: { en: "Performance goal (your numbers)", no: "Prestasjonsmål (dine tall)" },
    placeholder: {
      en: "e.g. Run 3000m under 11:30 by June",
      no: "f.eks. Løpe 3000 m under 11.30 innen juni",
    },
    hint: {
      en: "Measurable and about your own performance — not the opponent's.",
      no: "Målbart og om din egen prestasjon — ikke motstanderens.",
    },
  },
  {
    key: "process1",
    label: { en: "Process goal #1 (this week)", no: "Prosessmål 1 (denne uka)" },
    placeholder: {
      en: "e.g. 10 min extra technique work after each practice",
      no: "f.eks. 10 min ekstra teknikktrening etter hver økt",
    },
    hint: {
      en: "An action you fully control.",
      no: "En handling du har full kontroll over.",
    },
  },
  {
    key: "process2",
    label: { en: "Process goal #2 (this week)", no: "Prosessmål 2 (denne uka)" },
    placeholder: {
      en: "e.g. Do the breathing exercise before every session",
      no: "f.eks. Ta pusteøvelsen før hver økt",
    },
    hint: {
      en: "Small enough that you can't fail on a busy week.",
      no: "Lite nok til at det ikke ryker i en travel uke.",
    },
  },
];

export default function Goals() {
  const t = useT();
  const [stored, setStored] = useLocalStorage<GoalLadder>("mt-goals", EMPTY);
  const [draft, setDraft] = useState<GoalLadder | null>(null);
  const [saved, setSaved] = useState(false);

  const current = draft ?? stored;

  const save = () => {
    if (draft) setStored(draft);
    setSaved(true);
  };

  return (
    <div className="flex flex-col gap-4">
      {FIELDS.map((field) => (
        <label key={field.key} className="block">
          <span className="text-sm font-semibold text-slate-700">
            {t(field.label)}
          </span>
          <input
            type="text"
            value={current[field.key]}
            placeholder={t(field.placeholder)}
            onChange={(e) => {
              setSaved(false);
              setDraft({ ...current, [field.key]: e.target.value });
            }}
            className="mt-1 w-full rounded-xl border border-tq-200 px-3 py-2.5 text-sm outline-none transition-colors focus:border-tq-500"
          />
          <span className="mt-0.5 block text-xs text-slate-400">
            {t(field.hint)}
          </span>
        </label>
      ))}
      <button
        onClick={save}
        className="rounded-full bg-tq-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-tq-600"
      >
        {saved
          ? t({ en: "Saved ✓", no: "Lagret ✓" })
          : t({ en: "Save my goals", no: "Lagre målene mine" })}
      </button>
      <p className="text-xs text-slate-400">
        {t({
          en: "Your goals are saved on this device. Review them once a week.",
          no: "Målene lagres på denne enheten. Se over dem én gang i uka.",
        })}
      </p>
    </div>
  );
}
