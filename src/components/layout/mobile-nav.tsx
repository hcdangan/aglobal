"use client";

import { useEffect, useId, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";
import type { SiteConfig } from "@/lib/site-config";

interface MobileNavProps {
  navigation: SiteConfig["navigation"];
}

/**
 * Mobile navigation.
 *
 * Implements the disclosure pattern: the trigger controls a panel that is
 * removed from the DOM and from the tab order when closed. Escape closes it and
 * focus returns to the trigger; the panel also closes once a link is followed.
 */
export function MobileNav({ navigation }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    // Prevent the page behind the panel from scrolling.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        className="inline-flex size-11 items-center justify-center rounded-xl text-brand-700 transition-colors hover:bg-brand-50"
      >
        <Icon name={open ? "close" : "menu"} className="size-6" />
      </button>

      <div
        id={panelId}
        hidden={!open}
        className={cn(
          "fixed inset-x-0 top-[var(--header-height)] bottom-0 z-40 overflow-y-auto bg-white",
          "border-t border-ink-100 px-5 pt-6 pb-10",
        )}
      >
        <nav aria-label="Mobile">
          <ul className="flex flex-col gap-1">
            {navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-xl px-4 py-3.5 text-lg font-semibold text-brand-800 transition-colors hover:bg-brand-50"
                >
                  {item.label}
                  <Icon name="arrow-right" className="size-5 text-brand-300" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <Button
          href="#contact"
          size="lg"
          className="mt-6 w-full"
          onClick={() => setOpen(false)}
        >
          Send an enquiry
        </Button>
      </div>
    </div>
  );
}
