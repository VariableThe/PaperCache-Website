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
            <img src="/screenshot-1.png" alt="Editor and Formatting" className="screenshot-img" />
          </div>
          <div className="screenshot-wrapper">
            <img src="/screenshot-2.png" alt="Tasks and Math" className="screenshot-img" />
          </div>
          <div className="screenshot-wrapper">
            <img src="/screenshot-3.png" alt="Knowledge Management and AI" className="screenshot-img" />
          </div>
        </div>
      )}
    </section>
  );
}
