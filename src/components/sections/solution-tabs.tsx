"use client";

import { useId, useRef, useState } from "react";

import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";
import type { SolutionGroup } from "@/lib/types";

interface SolutionTabsProps {
  groups: readonly SolutionGroup[];
}

/**
 * Distribution / Regulatory solution explorer.
 *
 * Implements the WAI-ARIA tabs pattern with automatic activation and full
 * arrow-key support. Content is always in the DOM for the selected panel only,
 * which keeps the accessibility tree honest.
 */
export function SolutionTabs({ groups }: SolutionTabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const baseId = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const active = groups[activeIndex] ?? groups[0];
  if (!active) return null;

  const focusTab = (index: number) => {
    const next = (index + groups.length) % groups.length;
    setActiveIndex(next);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        focusTab(activeIndex + 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        focusTab(activeIndex - 1);
        break;
      case "Home":
        event.preventDefault();
        focusTab(0);
        break;
      case "End":
        event.preventDefault();
        focusTab(groups.length - 1);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="Solution areas"
        onKeyDown={onKeyDown}
        className="flex flex-col gap-2 rounded-2xl bg-ink-100/70 p-1.5 sm:inline-flex sm:flex-row"
      >
        {groups.map((group, index) => {
          const selected = index === activeIndex;
          return (
            <button
              key={group.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${group.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${group.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "rounded-xl px-5 py-3 text-sm font-semibold transition-colors duration-200 sm:text-base",
                selected
                  ? "bg-brand-700 text-white shadow-card"
                  : "text-ink-600 hover:bg-white hover:text-brand-700",
              )}
            >
              {group.label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${baseId}-panel-${active.id}`}
        aria-labelledby={`${baseId}-tab-${active.id}`}
        tabIndex={0}
        className="mt-10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-500"
      >
        <h3 className="text-heading font-bold text-brand-800">{active.headline}</h3>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-600 sm:text-base">
          {active.intro}
        </p>

        <ul className="mt-6 flex flex-wrap gap-2">
          {active.pillars.map((pillar) => (
            <li
              key={pillar}
              className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3.5 py-1.5 text-xs font-semibold text-brand-700 ring-1 ring-inset ring-brand-100 sm:text-sm"
            >
              <Icon name="check" className="size-4" />
              {pillar}
            </li>
          ))}
        </ul>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {active.cards.map((card) => (
            <li
              key={card.title}
              className="flex h-full gap-4 rounded-2xl border border-ink-100 bg-white p-5 shadow-card transition-[box-shadow,transform] duration-300 ease-out hover:-translate-y-1 hover:shadow-lift"
            >
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-inset ring-brand-100">
                <Icon name={card.icon} className="size-5" />
              </span>
              <div>
                <h4 className="text-sm font-bold text-brand-800 sm:text-base">
                  {card.title}
                </h4>
                <p className="mt-1.5 text-xs leading-relaxed text-ink-600 sm:text-sm">
                  {card.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
