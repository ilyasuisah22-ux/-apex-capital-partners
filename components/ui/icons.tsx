type IconProps = { className?: string };

export function ArrowUpRight({ className }: IconProps) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" /></svg>;
}

export function MenuIcon({ className }: IconProps) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.5" /></svg>;
}

export function CloseIcon({ className }: IconProps) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.5" /></svg>;
}

export function PlayIcon({ className }: IconProps) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m9 7 8 5-8 5V7Z" stroke="currentColor" strokeWidth="1.5" /></svg>;
}

export function SunIcon({ className }: IconProps) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" /></svg>;
}

export function MoonIcon({ className }: IconProps) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>;
}
