"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { navigation } from "@/lib/constants";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  function closeMenu() {
    setOpen(false);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  }

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") closeMenu(); };
    document.addEventListener("keydown", onKeyDown);
    document.body.classList.add("menu-open");
    return () => { document.removeEventListener("keydown", onKeyDown); document.body.classList.remove("menu-open"); };
  }, [open]);

  return <div className="mobile-nav"><button ref={triggerRef} className="icon-button" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="mobile-menu" aria-label="Open navigation"><MenuIcon className="size-6" /></button>{open && <div id="mobile-menu" className="mobile-menu"><div className="mobile-menu-top"><span>Navigation</span><button ref={closeRef} className="icon-button inverse" onClick={closeMenu} aria-label="Close navigation"><CloseIcon className="size-6" /></button></div><nav aria-label="Mobile navigation">{navigation.map((item, index) => <Link key={item.href} href={item.href} onClick={closeMenu}><span>0{index + 1}</span>{item.label}</Link>)}</nav><p>Private, considered guidance from Saint Kitts and Nevis.</p></div>}</div>;
}
