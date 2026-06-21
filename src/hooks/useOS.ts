import { useState, useEffect } from 'react';

export type OS = 'mac' | 'windows' | 'linux' | 'unknown';

export function useOS(): OS {
  const [os, setOS] = useState<OS>('unknown');

  useEffect(() => {
    const ua = navigator.userAgent;
    if (/Mac/i.test(ua)) setOS('mac');
    else if (/Win/i.test(ua)) setOS('windows');
    else if (/Linux/i.test(ua)) setOS('linux');
    else setOS('unknown');
  }, []);

  return os;
}
