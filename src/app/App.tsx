import { Navigate, Route, Routes } from "react-router-dom";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { ConsolePage } from "../features/console/ConsolePage";
import { CvPage } from "../features/cv/CvPage";
import { HomePage } from "../features/home/HomePage";
import { ResearchPage } from "../features/research/ResearchPage";
import { RouteEffects } from "./RouteEffects";

export function App() {
  return (
    <div className="site-shell">
      <RouteEffects />
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/research" element={<ResearchPage />} />
          <Route path="/research/smco-workflow" element={<ConsolePage />} />
          <Route path="/console" element={<Navigate replace to="/research/smco-workflow" />} />
          <Route path="/cv" element={<CvPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
