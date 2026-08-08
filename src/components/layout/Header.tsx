import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const links = [
  ["Research", "/research"],
  ["CV", "/cv"],
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstMenuLinkRef = useRef<HTMLAnchorElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => setOpen(false), [location.pathname, location.hash]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 821px)");
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };

    if (desktop.matches) setOpen(false);
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstMenuLinkRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        toggleRef.current?.focus();
        setOpen(false);
        return;
      }

      if (event.key !== "Tab") return;
      const focusable = Array.from(menuRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const navItems = links.map(([label, to]) => (
    <NavLink key={to} to={to}>{label}</NavLink>
  ));

  return (
    <>
      <header className="site-header">
        <a className="skip-link" href="#main-content">Skip to content</a>
        <div className="header-inner">
          <NavLink className="wordmark" to="/" aria-label="Yifan Suo home">Yifan Suo<span aria-hidden="true">*</span></NavLink>
          <nav className="desktop-nav" aria-label="Primary">
            {navItems}
          </nav>
          <button
            ref={toggleRef}
            className="menu-toggle"
            type="button"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <span /><span />
          </button>
        </div>
      </header>
      {open && (
        <div ref={menuRef} className="mobile-menu" role="dialog" aria-label="Mobile navigation" aria-modal="true">
          <nav aria-label="Mobile primary">
            {links.map(([label, to], index) => (
              <NavLink ref={index === 0 ? firstMenuLinkRef : undefined} key={to} to={to}>{label}</NavLink>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
