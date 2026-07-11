import type { L10n } from "@/lib/i18n";
import type { TopicKey } from "@/lib/lessons";

/**
 * The evidence library. Every entry was located and independently
 * fact-checked against PubMed / the publisher's page (title, authors, year,
 * venue) before being added — no citations from memory.
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

// Filled in from the verified research pass — see the sources page.
export const SOURCES: Source[] = [];

export function sourcesForTopic(topic: TopicKey): Source[] {
  return SOURCES.filter((s) => s.topic === topic);
}
