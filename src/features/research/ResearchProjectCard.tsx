import { Link } from "react-router-dom";
import type { ResearchProject } from "./researchTypes";
import { assetUrl } from "../../app/routes";
import { EvidenceTag } from "../../components/common/EvidenceTag";

type ProjectCardVariant = "featured" | "standard" | "industry";

export function ResearchProjectCard({
  project,
  variant = project.featured ? "featured" : "standard",
}: {
  project: ResearchProject;
  variant?: ProjectCardVariant;
}) {
  return (
    <article
      className={`research-card research-card--${variant}${project.media ? " has-media" : " is-text-only"}`}
      aria-label={`${project.title} research project`}
      data-variant={variant}
    >
      {project.media && (
        <figure className="research-card__media">
          <img src={assetUrl(project.media.src)} alt={project.media.alt} />
          <figcaption>{project.media.caption}</figcaption>
        </figure>
      )}

      <div className="research-card__body">
        <div className="research-card__topline">
          <EvidenceTag state={project.status} />
          <p className="eyebrow">{project.context}</p>
        </div>
        <h3>{project.title}</h3>
        <p className="research-card__period">{project.period}</p>
        <p className="research-card__summary">{project.summary}</p>

        {project.results && project.results.length > 0 && (
          <ul className="research-card__results" aria-label={`${project.title} results`}>
            {project.results.map((result) => (
              <li key={result}>{result}</li>
            ))}
          </ul>
        )}

        <div className="research-card__footer">
          <ul className="research-card__methods" aria-label={`${project.title} methods`}>
            {project.methods.map((method) => <li key={method}>{method}</li>)}
          </ul>
          {project.action && <Link className="button button--dark" to={project.action.to}>{project.action.label}</Link>}
        </div>
      </div>
    </article>
  );
}
