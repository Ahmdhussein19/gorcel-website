export interface SectionLabelProps {
  children: React.ReactNode;
}

export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <p className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-ink/60">
      {children}
    </p>
  );
}
