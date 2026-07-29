import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { titleForPath } from "./routes";

export function RouteEffects() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    document.title = titleForPath(pathname);
    let target: HTMLElement | null = null;
    if (hash) {
      try {
        const id = decodeURIComponent(hash.slice(1));
        if (id) target = document.getElementById(id);
      } catch {
        target = null;
      }
    }

    if (target) {
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.scrollIntoView?.({ block: "start" });
      target.focus({ preventScroll: true });
      return;
    }

    window.scrollTo?.(0, 0);
    document.getElementById("main-content")?.focus({ preventScroll: true });
  }, [hash, pathname]);

  return null;
}
