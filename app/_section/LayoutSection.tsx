"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import type { BreadcrumbState } from "../types";

type Props = { state: BreadcrumbState; update: <K extends keyof BreadcrumbState>(key: K, value: BreadcrumbState[K]) => void };

export default function LayoutSection({ state, update }: Props) {
  return <SectionCard title="Layout" subtitle="Layout controls for native breadcrumb generation."><div className="rounded-2xl border p-4 text-sm" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>No separate native controls are needed for this section in this component.</div></SectionCard>;
}
