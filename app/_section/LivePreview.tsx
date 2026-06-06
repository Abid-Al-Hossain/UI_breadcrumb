"use client";

import type { CSSProperties } from "react";
import type { BreadcrumbState } from "../types";

type CrumbItem = { index: number; label: string; collapsed?: boolean };

const FALLBACK_LABELS = ["Home", "Products", "Components", "Navigation", "Breadcrumb", "Current page"];

function shell(state: BreadcrumbState): CSSProperties {
  return {
    width: state.width,
    minHeight: state.height,
    padding: state.padding,
    borderRadius: state.radius,
    border: `${state.borderWidth}px solid ${state.border}`,
    boxShadow: `0 ${Math.round(state.shadow / 3)}px ${state.shadow}px rgba(0,0,0,.28)`,
    background: state.background,
    color: state.foreground,
    fontFamily: state.fontFamily,
    opacity: state.disabled ? 0.55 : 1,
  };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function separatorFor(value: string) {
  if (value === "chevron") return ">";
  if (value === "dot") return ".";
  if (value === "pipe") return "|";
  return "/";
}

function visibleCrumbs(items: CrumbItem[], mode: string): CrumbItem[] {
  if (items.length <= 5 || mode === "none") return items;
  if (mode === "start") return [{ index: -1, label: "...", collapsed: true }, ...items.slice(-4)];
  if (mode === "end") return [...items.slice(0, 4), { index: -1, label: "...", collapsed: true }];
  return [items[0], { index: -1, label: "...", collapsed: true }, ...items.slice(-3)];
}

export default function LivePreview({ state }: { state: BreadcrumbState }) {
  const count = clamp(state.itemCount, 1, 14);
  const currentIndex = clamp(state.currentIndex, 0, count - 1);
  const items = Array.from({ length: count }, (_, index) => ({
    index,
    label: FALLBACK_LABELS[index] ?? `Level ${index + 1}`,
  }));
  const crumbs = visibleCrumbs(items, state.collapseMode);
  const separator = separatorFor(state.separator);

  return (
    <nav id={state.id} aria-label={state.ariaLabel} style={shell(state)} className="grid content-center gap-4">
      <ol className="flex flex-wrap items-center gap-2">
        {crumbs.map((crumb, position) => {
          const isCurrent = crumb.index === currentIndex;
          return (
            <li key={`${crumb.index}-${position}`} className="flex items-center gap-2 text-sm">
              {position > 0 && <span aria-hidden="true" style={{ color: state.muted }}>{separator}</span>}
              {crumb.collapsed ? (
                <span aria-label="Collapsed breadcrumb levels" className="rounded-full border px-3 py-1" style={{ borderColor: state.border, color: state.muted }}>...</span>
              ) : isCurrent ? (
                <span aria-current={state.ariaCurrent} className="max-w-[14rem] truncate rounded-full px-3 py-1 font-bold" style={{ background: state.accent, color: "#020617" }}>
                  {state.showIcons && <span aria-hidden="true"># </span>}
                  {crumb.label}
                </span>
              ) : (
                <a href={`#breadcrumb-${crumb.index + 1}`} className="max-w-[12rem] truncate rounded-full border px-3 py-1" style={{ borderColor: state.border, color: state.foreground }}>
                  {state.showIcons && <span aria-hidden="true"># </span>}
                  {crumb.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
      <p className="text-xs" style={{ color: state.muted }}>
        Ordered-list breadcrumb with aria-current {state.ariaCurrent}, aria-hidden separators, and {state.collapseMode} collapsing.
      </p>
    </nav>
  );
}
