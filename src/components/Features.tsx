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
          <p className="text-muted">No dock icon. No window chrome. Press your hotkey, it appears on whatever screen your cursor is on.</p>
        </div>
        <div className="feature-card fade-in-section" ref={ref2}>
          <h3 className="font-mono text-accent-glow">Reactive math</h3>
          <p className="text-muted">Define <span className="font-mono">/var x = 10</span>, write <span className="font-mono">x * 3 =</span>, get 30. Change the variable, everything updates.</p>
        </div>
        <div className="feature-card fade-in-section" ref={ref3}>
          <h3 className="font-mono text-accent-glow">Inline AI</h3>
          <p className="text-muted">Type <span className="font-mono">/ai &lt;prompt&gt;</span>, press enter. The answer appears in your note. No sidebar.</p>
        </div>
        <div className="feature-card fade-in-section" ref={ref4}>
          <h3 className="font-mono text-accent-glow">Tasks</h3>
          <p className="text-muted">Type <span className="font-mono">/task @ 1d2h</span> to set a due date. Cmd+T opens a unified task view.</p>
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
