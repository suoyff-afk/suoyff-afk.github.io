import { CopyEmail } from "../common/CopyEmail";

export function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div>
        <p className="eyebrow">CONTACT</p>
        <p className="footer-prompt">Open to research and materials R&D conversations.</p>
      </div>
      <CopyEmail compact />
      <p className="footer-note">TU Darmstadt {" / "} Computational materials science</p>
    </footer>
  );
}
