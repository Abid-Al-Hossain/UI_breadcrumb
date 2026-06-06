"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import Input from "@/components/shared/input/Input";
import type { BreadcrumbState } from "../types";

type Props = { state: BreadcrumbState; update: <K extends keyof BreadcrumbState>(key: K, value: BreadcrumbState[K]) => void };

export default function MetadataSection({ state, update }: Props) {
  return <SectionCard title="Metadata" subtitle="Metadata controls for native breadcrumb generation."><Input label="id" value={state.id} onChange={(value) => update("id", value)} />
<Input label="aria-label" value={state.ariaLabel} onChange={(value) => update("ariaLabel", value)} />
<div className="rounded-2xl border p-4 text-sm" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>Breadcrumb output is always a native nav landmark containing an ordered list and aria-current on the current crumb.</div></SectionCard>;
}
