'use client';

import { ChevronDown, Check } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type Option = { value: string; label: string };

export default function CustomSelect({
  name,
  options,
  defaultValue,
  direction = 'rtl',
}: {
  name: string;
  options: Option[];
  defaultValue: string;
  direction?: 'ltr' | 'rtl';
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const rootRef = useRef<HTMLDivElement>(null);
  const selected = options.find((option) => option.value === value) ?? options[0];

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  return (
    <div ref={rootRef} className="relative" dir={direction}>
      <input type="hidden" name={name} value={value} />
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="field flex min-h-14 items-center justify-between gap-3 text-sm transition focus:border-gold"
      >
        <span className="truncate">{selected?.label}</span>
        <ChevronDown
          size={18}
          className={`shrink-0 transition ${open ? 'rotate-180 text-gold' : 'text-muted'}`}
        />
      </button>
      {open && (
        <div
          role="listbox"
          className="absolute inset-x-0 top-[calc(100%+8px)] z-50 max-h-60 overflow-auto rounded-xl border border-gold/50 bg-carbon p-1 shadow-2xl"
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              role="option"
              aria-selected={option.value === value}
              onClick={() => {
                setValue(option.value);
                setOpen(false);
              }}
              className="flex w-full items-center justify-between gap-3 rounded-lg px-4 py-3 text-sm text-white/85 transition hover:bg-gold/10 hover:text-gold"
            >
              <span className="truncate">{option.label}</span>
              {option.value === value && <Check size={16} className="shrink-0 text-gold" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
