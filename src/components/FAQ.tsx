import { useState } from 'react';
import { useScrollFade } from '../hooks/useScrollFade';

export default function FAQ() {
  const ref = useScrollFade();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { 
      question: "Is PaperCache really 100% free?", 
      answer: "Yes! PaperCache is completely free and open-source. There are no paywalls, no \"Pro\" tiers, and no hidden costs. You get the full app with all features (AI, reactive math, knowledge graphs) right out of the box." 
    },
    { 
      question: "Is it safe to use AI features in PaperCache?", 
      answer: (
        <>
          Absolutely. PaperCache is open-source, so you can audit the code yourself. If you use the inline AI features, your API keys are encrypted and stored securely using Electron's <code>safeStorage</code> API. Your data stays on your machine.
        </>
      )
    },
    { 
      question: "Was PaperCache built using AI?", 
      answer: (
        <>
          <p>Yes! PaperCache was developed using AI as a pair-programming tool, but under <strong>strict engineering guardrails and production-level direction</strong>.</p>
          <p style={{ marginTop: '8px' }}>Rather than just blindly accepting AI output, the core architecture, performance optimizations (like the true zero-idle CPU state), and state management were strictly directed and manually reviewed. AI was leveraged to move at 10x speed for boilerplate and rapid prototyping, but the final code quality, security, and performance audits were rigorously enforced to meet professional production standards.</p>
        </>
      )
    },
    { 
      question: "What do my donations go towards?", 
      answer: "Mostly coffee and snacks! ☕ If you enjoy using PaperCache and find it valuable, your donations are simply a great way to show your support and keep me fueled. Please note that donations are just a tip jar to say thanks, and do not guarantee any future features or products." 
    },
    { 
      question: "Do I get extra features if I donate?", 
      answer: "No. I believe productivity tools should be accessible to everyone. Donating doesn't unlock any secret features; it’s simply a way to say \"thank you\" and support independent open-source development. Everyone gets the exact same experience." 
    },
    { 
      question: "How can I support the project if I can't donate right now?", 
      answer: (
        <>
          There are plenty of ways to help! You can:
          <ul style={{ marginTop: '8px', paddingLeft: '20px', lineHeight: '1.8' }}>
            <li>Star the <a href="https://github.com/VariableThe/PaperCache" target="_blank" rel="noreferrer" style={{color: 'var(--accent-glow)'}}>PaperCache GitHub repo</a></li>
            <li>Report bugs or suggest features via GitHub Issues</li>
            <li>📣 Share the app with friends or on social media</li>
            <li>Submit a Pull Request if you want to contribute code!</li>
          </ul>
        </>
      )
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": typeof faq.answer === "string" ? faq.answer : faq.question
      }
    }))
  };

  return (
    <section className="faq-container fade-in-section" ref={ref}>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
      <h2 className="section-title">Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className={`faq-item ${openIndex === index ? 'open' : ''}`}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <div className="faq-question">
              <span>{faq.question}</span>
              <span className="faq-icon">{openIndex === index ? '−' : '+'}</span>
            </div>
            {openIndex === index && (
              <div className="faq-answer">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
