"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import Select from "@/components/shared/input/Select";
import type { BreadcrumbState } from "../types";

type Props = { state: BreadcrumbState; update: <K extends keyof BreadcrumbState>(key: K, value: BreadcrumbState[K]) => void };

export default function LayoutSection({ state, update }: Props) {
  return <SectionCard title="Layout" subtitle="Layout controls for native breadcrumb generation."><Select label="Separator" value={state.separator} options={[
  "slash",
  "chevron",
  "dot",
  "pipe"
]} onChange={(value) => update("separator", value)} />
<Select label="Collapse mode" value={state.collapseMode} options={[
  "none",
  "middle",
  "start",
  "end"
]} onChange={(value) => update("collapseMode", value)} /></SectionCard>;
}
