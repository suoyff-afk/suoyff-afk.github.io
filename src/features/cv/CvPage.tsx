import { CopyEmail } from "../../components/common/CopyEmail";
import { education, experience, skillGroups } from "./cvContent";

export function CvPage() {
  return (
    <div className="page-frame interior-page cv-page">
      <header className="page-intro reveal">
        <p className="eyebrow">PROFILE / CV</p>
        <h1>Profile &amp; CV</h1>
        <p className="page-subtitle">Computational Materials Scientist</p>
      </header>

      <section className="profile-grid">
        <div className="portrait-placeholder" role="img" aria-label="Portrait not available">
          <span>PORTRAIT</span>
          <strong>Portrait not available</strong>
          <p>A real photograph will be added when provided.</p>
        </div>
        <div className="profile-copy">
          <p className="eyebrow">YIFAN SUO</p>
          <h2>PhD Student in computational materials science</h2>
          <p className="lede">Researching process-structure-property relationships in additively manufactured magnetic materials through phase-field, GPU, finite-element, and hysteresis workflows.</p>
          <dl className="cv-facts">
            <div><dt>Current role</dt><dd>PhD Student, TU Darmstadt</dd></div>
            <div><dt>Location</dt><dd>Darmstadt, Germany</dd></div>
            <div><dt>Focus</dt><dd>Computational materials science and materials R&amp;D</dd></div>
          </dl>
          <div className="cv-actions">
            <button className="button button--disabled" type="button" disabled>CV PDF coming soon</button>
            <CopyEmail compact />
          </div>
        </div>
      </section>

      <section className="cv-section" aria-label="Education timeline">
        <div className="section-heading"><p className="eyebrow">BACKGROUND / 01</p><h2>Education</h2></div>
        <div className="timeline-list">
          {education.map((entry) => (
            <article className="timeline-row" key={`${entry.title}-${entry.period}`}>
              <p className="timeline-period">{entry.period}</p>
              <div><h3>{entry.title}</h3><strong>{entry.subtitle}</strong><p>{entry.detail}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="cv-section" aria-label="Research and R&D timeline">
        <div className="section-heading"><p className="eyebrow">EXPERIENCE / 02</p><h2>Research &amp; R&amp;D Experience</h2></div>
        <div className="timeline-list">
          {experience.map((entry) => (
            <article className="timeline-row" key={entry.title}>
              <p className="timeline-period">{entry.period}</p>
              <div><h3>{entry.title}</h3><strong>{entry.subtitle}</strong><p>{entry.detail}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="cv-section" aria-label="Skills">
        <div className="section-heading"><p className="eyebrow">CAPABILITIES / 03</p><h2>Skills</h2></div>
        <div className="skills-list">
          {skillGroups.map((group) => <article key={group.title}><h3>{group.title}</h3><p>{group.detail}</p></article>)}
        </div>
      </section>
    </div>
  );
}
