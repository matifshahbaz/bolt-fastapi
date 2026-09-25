'use client';

import { useState, type ReactNode } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { cn } from '@/lib/utils';

export type ComboboxOption = {
  value: string;
  /** Shown in the closed trigger button — keep this a single line, it gets truncated. */
  label: ReactNode;
  /** Shown inside the open dropdown row; falls back to `label` if omitted. Safe to be multi-line. */
  itemLabel?: ReactNode;
  /** Extra strings (Urdu translation, English abbreviation, raw value) matched by cmdk's fuzzy filter. */
  keywords?: string[];
};

export function ComboboxFilter({
  value,
  onChange,
  options,
  allLabel,
  placeholder,
  emptyText,
}: {
  value: string;
  onChange: (value: string) => void;
  options: ComboboxOption[];
  allLabel: string;
  placeholder: string;
  emptyText: string;
}) {
  const [open, setOpen] = useState(false);
  const selected = options.find((option) => option.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="h-9 w-full justify-between rounded-xl border-border/60 bg-secondary/30 px-3 font-normal transition-colors hover:bg-secondary/50"
        >
          <span className="truncate">{value === 'all' || !selected ? allLabel : selected.label}</span>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-0" align="start">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              <CommandItem
                value="all"
                onSelect={() => {
                  onChange('all');
                  setOpen(false);
                }}
              >
                <Check className={cn('ml-2 h-4 w-4', value === 'all' ? 'opacity-100' : 'opacity-0')} />
                {allLabel}
              </CommandItem>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  keywords={option.keywords}
                  onSelect={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                >
                  <Check className={cn('ml-2 h-4 w-4 shrink-0', value === option.value ? 'opacity-100' : 'opacity-0')} />
                  {option.itemLabel ?? option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
