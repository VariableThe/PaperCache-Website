import { useState } from 'react';
import { useScrollFade } from '../hooks/useScrollFade';

export default function Screenshots() {
  const ref = useScrollFade();
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <section className="screenshots-container fade-in-section" ref={ref}>
      {!isRevealed ? (
        <div style={{ display: 'flex', justifyContent: 'center', margin: '40px 0' }}>
          <button className="btn-primary" onClick={() => setIsRevealed(true)}>
            View Screenshots
          </button>
        </div>
      ) : (
        <div className="screenshots-scroll-strip fade-in-section is-visible">
          <div className="screenshot-wrapper">
            <img src="/editor-formatting.png" alt="Editor Formatting" className="screenshot-img" />
          </div>
          <div className="screenshot-wrapper">
            <img src="/ai-demo.png" alt="Inline AI" className="screenshot-img" />
          </div>
          <div className="screenshot-wrapper">
            <img src="/knowledge-management.png" alt="Knowledge Management" className="screenshot-img" />
          </div>
          <div className="screenshot-wrapper">
            <img src="/search.png" alt="Search" className="screenshot-img" />
          </div>
          <div className="screenshot-wrapper">
            <img src="/graph-view.png" alt="Graph View" className="screenshot-img" />
          </div>
        </div>
      )}
    </section>
  );
}
