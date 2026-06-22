import { useEffect, useState } from 'react';

const SCENARIOS = [
  {
    lines: [
      '/var x = 10',
      'x * 3 = 30',
      '/ai explain what reactive variables are'
    ],
    aiResponse: <>Variables defined with /var update every<br />expression that references them, live.</>
  }
];

function highlight(text: string, lineIndex: number, scenarioIndex: number) {
  const elements = [];
  let currentWord = '';
  
  const pushWord = (idx: number) => {
    if (currentWord) {
      elements.push(<span key={`text-${idx}`}>{currentWord}</span>);
      currentWord = '';
    }
  };

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    
    if (scenarioIndex === 0) {
      if (char === '/' || char === '=' || char === '*') {
        pushWord(i);
        elements.push(<span key={i} className="token-op">{char}</span>);
      } else if (char === '1' && text[i+1] === '0') {
        pushWord(i);
        elements.push(<span key={i} className="token-num">10</span>);
        i++;
      } else if (char === '3' && text[i+1] === '0') {
        pushWord(i);
        elements.push(<span key={i} className="token-result">30</span>);
        i++;
      } else if (char === '3') {
        pushWord(i);
        elements.push(<span key={i} className="token-num">3</span>);
      } else if (char === 'x' && lineIndex === 1) { 
        pushWord(i);
        elements.push(<span key={i} className="var-pill">10</span>);
      } else {
        currentWord += char;
      }
    } else if (scenarioIndex === 1) {
      if (char === '/' || char === '@') {
        pushWord(i);
        elements.push(<span key={i} className="token-op">{char}</span>);
      } else if (char === 't' && text.substring(i, i+4) === 'tmrw') {
        pushWord(i);
        elements.push(<span key={i} className="token-result">tmrw</span>);
        i += 3;
      } else {
        currentWord += char;
      }
    } else if (scenarioIndex === 2) {
      if (char === '/' || char === '=') {
        pushWord(i);
        elements.push(<span key={i} className="token-op">{char}</span>);
      } else if (char === '"' && text.substring(i, i+12) === '"PaperCache"') {
        pushWord(i);
        elements.push(<span key={i} className="token-num">"PaperCache"</span>);
        i += 11;
      } else {
        currentWord += char;
      }
    } else {
      currentWord += char;
    }
  }
  pushWord(text.length);
  return elements;
}

export default function TypingDemo() {
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [line1, setLine1] = useState(prefersReducedMotion ? SCENARIOS[0].lines[0] : '');
  const [line2, setLine2] = useState(prefersReducedMotion ? SCENARIOS[0].lines[1] : '');
  const [line3, setLine3] = useState(prefersReducedMotion ? SCENARIOS[0].lines[2] : '');
  const [aiResponseVisible, setAiResponseVisible] = useState(prefersReducedMotion);
  const [cursorPhase, setCursorPhase] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    let isCancelled = false;

    const typeText = async (text: string, setter: (val: string) => void, speed = 50) => {
      for (let i = 0; i <= text.length; i++) {
        if (isCancelled) return;
        setter(text.slice(0, i));
        await new Promise(r => setTimeout(r, speed + (Math.random() * 20)));
      }
    };

    const wait = (ms: number) => new Promise(r => setTimeout(r, ms));

    const runDemo = async () => {
      let currentScenarioIndex = 0;

      while (!isCancelled) {
        const scenario = SCENARIOS[currentScenarioIndex];
        
        setScenarioIndex(currentScenarioIndex);
        setLine1('');
        setLine2('');
        setLine3('');
        setAiResponseVisible(false);
        setCursorPhase(1);

        await wait(500);
        await typeText(scenario.lines[0], setLine1);
        await wait(1000);

        setCursorPhase(2);
        await wait(300);
        await typeText(scenario.lines[1], setLine2);
        await wait(1000);

        setCursorPhase(3);
        await wait(300);
        await typeText(scenario.lines[2], setLine3);
        await wait(600);

        if (isCancelled) return;
        setCursorPhase(4); 
        setAiResponseVisible(true);
        
        await wait(4000);

        setCursorPhase(0);
        setAiResponseVisible(false);
        await wait(300);
        
        setLine1('');
        setLine2('');
        setLine3('');
        await wait(200);

        currentScenarioIndex = (currentScenarioIndex + 1) % SCENARIOS.length;
      }
    };

    runDemo();

    return () => {
      isCancelled = true;
    };
  }, [prefersReducedMotion]);

  return (
    <div className="typing-demo-container">
      <div className="typing-demo-content font-mono">
        <div className="demo-line">
          {highlight(line1, 0, scenarioIndex)}
          {cursorPhase === 1 && <span className="demo-cursor">▌</span>}
        </div>
        <div className="demo-line">
          {highlight(line2, 1, scenarioIndex)}
          {cursorPhase === 2 && <span className="demo-cursor">▌</span>}
        </div>
        <div className="demo-line">
          {highlight(line3, 2, scenarioIndex)}
          {cursorPhase === 3 && <span className="demo-cursor">▌</span>}
        </div>
        <div className={`demo-ai-response ${aiResponseVisible ? 'visible' : ''}`}>
          {SCENARIOS[scenarioIndex].aiResponse}
        </div>
      </div>
    </div>
  );
}
