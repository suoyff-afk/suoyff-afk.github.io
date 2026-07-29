import { useEffect, useRef, useState } from "react";
import { copyTextOrMailto } from "../../shared/copyText";
import { email } from "../../shared/contact";

export function CopyEmail({ compact = false }: { compact?: boolean }) {
  const [copied, setCopied] = useState(false);
  const resetTimerRef = useRef<number | undefined>(undefined);

  useEffect(() => () => {
    if (resetTimerRef.current !== undefined) window.clearTimeout(resetTimerRef.current);
  }, []);

  async function copyEmail() {
    const copiedSuccessfully = await copyTextOrMailto(email);
    if (!copiedSuccessfully) return;

    setCopied(true);
    if (resetTimerRef.current !== undefined) window.clearTimeout(resetTimerRef.current);
    resetTimerRef.current = window.setTimeout(() => {
      resetTimerRef.current = undefined;
      setCopied(false);
    }, 2200);
  }

  return (
    <div className={compact ? "copy-email copy-email--compact" : "copy-email"}>
      <button className="text-button" type="button" onClick={copyEmail} aria-label={`Copy email ${email}`}>
        <span>{email}</span>
        <span aria-hidden="true">{copied ? "OK" : "COPY"}</span>
      </button>
      <span className="copy-status" aria-live="polite">{copied ? "Email copied" : ""}</span>
    </div>
  );
}
