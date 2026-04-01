export function ShieldIcon({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className}>
      <path d="M20 4L6 10V20C6 29 12.4 35.8 20 38C27.6 35.8 34 29 34 20V10L20 4Z" fill="var(--accent)" opacity="0.15" />
      <path d="M20 4L6 10V20C6 29 12.4 35.8 20 38C27.6 35.8 34 29 34 20V10L20 4Z" stroke="var(--accent)" strokeWidth="2" fill="none" />
      <path d="M14 20L18 24L26 16" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
