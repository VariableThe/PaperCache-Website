import { useState } from 'react';
import { useScrollFade } from '../hooks/useScrollFade';

export default function GrievanceForm() {
  const ref = useScrollFade();
  const [feedback, setFeedback] = useState('');

  const issueUrl = `https://github.com/VariableThe/PaperCache/issues/new?body=${encodeURIComponent(feedback)}`;

  return (
    <section className="grievance-container fade-in-section" ref={ref}>
      <h2 className="section-title">Feedback & Grievances</h2>
      <div className="grievance-card">
        <p className="text-muted text-center" style={{ marginBottom: '2rem' }}>
          Encountered a bug, have a feature request, or just want to tell us what could be better? We handle all feedback publicly to ensure transparency and community collaboration.
        </p>
        <div className="form-mockup">
          <div className="form-group">
            <label>What's on your mind?</label>
            <textarea 
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Describe your issue or suggestion here..."
              rows={4}
            ></textarea>
          </div>
          <a 
            href={issueUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-primary form-submit-btn"
          >
            Submit via GitHub Issues
          </a>
        </div>
      </div>
    </section>
  );
}
