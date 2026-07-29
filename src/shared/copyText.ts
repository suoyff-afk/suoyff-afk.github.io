type ClipboardWriter = Pick<Clipboard, "writeText">;

type CopyDependencies = {
  clipboard?: ClipboardWriter | null;
  legacyCopy?: (text: string) => boolean;
  navigate?: (href: string) => void;
};

export function copyTextWithTextarea(text: string) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.tabIndex = -1;
  textarea.setAttribute("aria-hidden", "true");
  Object.assign(textarea.style, {
    position: "fixed",
    left: "-9999px",
    top: "0",
    opacity: "0",
    pointerEvents: "none",
  });

  document.body.appendChild(textarea);
  try {
    textarea.select();
    return document.execCommand("copy");
  } catch {
    return false;
  } finally {
    textarea.remove();
  }
}

export async function copyTextOrMailto(text: string, dependencies: CopyDependencies = {}) {
  const clipboard = dependencies.clipboard === undefined ? navigator.clipboard : dependencies.clipboard;
  const legacyCopy = dependencies.legacyCopy ?? copyTextWithTextarea;
  const navigate = dependencies.navigate ?? ((href: string) => { window.location.href = href; });

  if (clipboard?.writeText) {
    try {
      await clipboard.writeText(text);
      return true;
    } catch {
      // Continue to the synchronous fallback when clipboard permission is denied.
    }
  }

  if (legacyCopy(text)) return true;

  navigate(`mailto:${text}`);
  return false;
}
