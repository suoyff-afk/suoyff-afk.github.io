import { ResearchProjectCard } from "./ResearchProjectCard";
import {
  industryResearch,
  researchAreas,
  researchMethods,
  researchProjects,
} from "./researchContent";
import { assetUrl } from "../../app/routes";

export function ResearchPage() {
  return (
    <div className="page-frame interior-page research-page">
      <header className="page-intro reveal">
        <p className="eyebrow">RESEARCH / PORTFOLIO</p>
        <h1>Research</h1>
        <p className="page-subtitle">Computational approaches across processing, microstructure, mechanics, and material properties</p>
        <p className="lede">My work combines physics-based simulation, data-driven modeling, and materials characterization to study how manufacturing and microstructure shape material response.</p>
      </header>

      <section className="research-areas-section" aria-label="Research areas">
        <div className="section-heading">
          <p className="eyebrow">RESEARCH AREAS / 01</p>
          <h2>From manufacturing process to material response</h2>
        </div>
        <figure className="research-areas-visual" aria-label="Research areas overview">
          <img
            src={assetUrl("assets/workflow-concept.png")}
            alt="Conceptual workflow from PBF process through thermal history and microstructure to a property model"
          />
          <figcaption>Conceptual illustration only. Not simulation or experimental data.</figcaption>
        </figure>
        <ol className="research-area-index">
          {researchAreas.map((area, index) => (
            <li key={area.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <strong>{area.title}</strong>
                <p>{area.scope}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="academic-projects-section" aria-label="Research project gallery">
        <div className="section-heading">
          <p className="eyebrow">SELECTED RESEARCH / 02</p>
          <h2>Projects, methods, and evidence</h2>
        </div>
        <div className="research-card-grid">
          {researchProjects.map((project) => (
            <ResearchProjectCard project={project} key={project.id} />
          ))}
        </div>
      </section>

      <section className="industry-section" aria-label="Industry R&D">
        <div className="section-heading">
          <p className="eyebrow">INDUSTRY R&amp;D / 03</p>
          <h2>Materials development in a product environment</h2>
        </div>
        <ResearchProjectCard project={industryResearch} variant="industry" />
      </section>

      <section className="research-methods-section" aria-label="Methods across projects">
        <p className="eyebrow">METHODS ACROSS PROJECTS / 04</p>
        <h2>A connected computational and experimental toolkit</h2>
        <ul className="research-methods-list">
          {researchMethods.map((method) => <li key={method}>{method}</li>)}
        </ul>
      </section>
    </div>
  );
}
