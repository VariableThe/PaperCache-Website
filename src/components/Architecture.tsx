import { useScrollFade } from '../hooks/useScrollFade';

export default function Architecture() {
  const ref = useScrollFade();

  return (
    <section className="architecture-container fade-in-section" ref={ref}>
      <h2 className="section-title">Rebuilt in Rust & Tauri</h2>
      <div className="architecture-content">
        <div className="architecture-card">
          <p className="text-muted">
            PaperCache was originally built using Electron, but we recently migrated the entire backend to <span className="highlight-text">Rust and Tauri</span>. Why? Because a background scratchpad shouldn't devour your RAM.
          </p>
          <ul className="benefits-list text-muted">
            <li><strong>Tiny Memory Footprint:</strong> The application now consumes a fraction of the memory compared to its Electron predecessor.</li>
            <li><strong>Instant Cold Starts:</strong> Lightning-fast execution, summoning the scratchpad exactly when you need it.</li>
            <li><strong>True Zero-Idle State:</strong> The app takes literally 0% CPU when not actively in use, preserving your battery life perfectly.</li>
            <li><strong>Native Feel:</strong> Deep OS integration across macOS, Windows, and Linux.</li>
          </ul>
          <div className="audit-link-wrapper">
            <a 
              href="https://github.com/VariableThe/PaperCache/blob/main/PERFORMANCE_AUDIT.md" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="audit-link"
            >
              Read the Full Performance Audit →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
