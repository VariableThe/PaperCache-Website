import { useEffect, useState } from 'react';

function highlight(text: string, isLine2: boolean) {
  const elements = [];
  let currentWord = '';
  
  const pushWord = () => {
    if (currentWord) {
      elements.push(currentWord);
      currentWord = '';
    }
  };

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === '/' || char === '=' || char === '*') {
      pushWord();
      elements.push(<span key={i} className="token-op">{char}</span>);
    } else if (char === '1' && text[i+1] === '0') {
      pushWord();
      elements.push(<span key={i} className="token-num">10</span>);
      i++;
    } else if (char === '3' && text[i+1] === '0') {
      pushWord();
      elements.push(<span key={i} className="token-result">30</span>);
      i++;
    } else if (char === '3') {
      pushWord();
      elements.push(<span key={i} className="token-num">3</span>);
    } else if (char === 'x' && isLine2) {
      pushWord();
      elements.push(<span key={i} className="var-pill">10</span>);
    } else {
      currentWord += char;
    }
  }
  pushWord();
  return elements;
}

export default function TypingDemo() {
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [line3, setLine3] = useState('');
  const [aiResponseVisible, setAiResponseVisible] = useState(false);
  const [cursorPhase, setCursorPhase] = useState(0);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setLine1('/var x = 10');
      setLine2('x * 3 = 30');
      setLine3('/ai explain what reactive variables are');
      setAiResponseVisible(true);
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
      while (!isCancelled) {
        // Reset
        setLine1('');
        setLine2('');
        setLine3('');
        setAiResponseVisible(false);
        setCursorPhase(1);

        // Type line 1
        await wait(500);
        await typeText('/var x = 10', setLine1);
        await wait(1000);

        setCursorPhase(2);
        // Next line
        await wait(300);
        await typeText('x * 3 = ', setLine2);
        await wait(200);
        if (isCancelled) return;
        setLine2('x * 3 = 30');
        await wait(1000);

        setCursorPhase(3);
        // Next line
        await wait(300);
        await typeText('/ai explain what reactive variables are', setLine3);
        await wait(600);

        if (isCancelled) return;
        // AI Response
        setCursorPhase(4); 
        setAiResponseVisible(true);
        
        await wait(4000);
      }
    };

    runDemo();

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <div className="typing-demo-container">
      <div className="typing-demo-content font-mono">
        <div className="demo-line">
          {highlight(line1, false)}
          {cursorPhase === 1 && <span className="demo-cursor">▌</span>}
        </div>
        <div className="demo-line">
          {highlight(line2, true)}
          {cursorPhase === 2 && <span className="demo-cursor">▌</span>}
        </div>
        <div className="demo-line">
          {highlight(line3, false)}
          {cursorPhase === 3 && <span className="demo-cursor">▌</span>}
        </div>
        <div className={`demo-ai-response ${aiResponseVisible ? 'visible' : ''}`}>
          Variables defined with /var update every<br />
          expression that references them, live.
        </div>
      </div>
    </div>
  );
}
