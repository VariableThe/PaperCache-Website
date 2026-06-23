import { useScrollFade } from '../hooks/useScrollFade';

export default function Features() {
  const ref1 = useScrollFade<HTMLDivElement>();
  const ref2 = useScrollFade<HTMLDivElement>();
  const ref3 = useScrollFade<HTMLDivElement>();
  const ref4 = useScrollFade<HTMLDivElement>();
  const refFooter = useScrollFade<HTMLDivElement>();

  return (
    <section className="features-container">
      <div className="features-grid">
        <div className="feature-card fade-in-section" ref={ref1}>
          <h3 className="font-mono text-accent-glow">Stealth mode</h3>
          <p className="text-muted">No dock icon. No window chrome. Press your global hotkey, it appears on whatever screen your cursor is on. The ultimate <span className="font-mono">floating notes app</span> for developers who need zero-friction access.</p>
        </div>
        <div className="feature-card fade-in-section" ref={ref2}>
          <h3 className="font-mono text-accent-glow">Reactive math</h3>
          <p className="text-muted">Define <span className="font-mono">/var x = 10</span>, write <span className="font-mono">x * 3 =</span>, get 30. Change the variable, everything updates. A true <span className="font-mono">reactive math calculator</span> and <span className="font-mono">markdown calculator</span> built right into your notes.</p>
        </div>
        <div className="feature-card fade-in-section" ref={ref3}>
          <h3 className="font-mono text-accent-glow">Inline AI</h3>
          <p className="text-muted">Type <span className="font-mono">/ai &lt;prompt&gt;</span>, press enter. The answer appears in your note. No sidebar, no context switching — just faster <span className="font-mono">developer productivity</span>.</p>
        </div>
        <div className="feature-card fade-in-section" ref={ref4}>
          <h3 className="font-mono text-accent-glow">Tasks</h3>
          <p className="text-muted">Type <span className="font-mono">/task @ 1d2h</span> to set a due date. Cmd+T opens a unified task view. Perfect for <span className="font-mono">quick note taking</span> with built-in productivity tracking.</p>
        </div>
      </div>
      <div className="features-footer fade-in-section" ref={refFooter} style={{ textAlign: 'center', marginTop: '60px' }}>
        <p className="text-muted" style={{ fontSize: '1.1rem' }}>
          ...and a <a href="https://github.com/VariableThe/PaperCache/blob/main/features.md" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>whole suite of other features</a>.
        </p>
      </div>
    </section>
  );
}
