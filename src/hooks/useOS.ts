import { useState } from 'react';

export type OS = 'mac' | 'windows' | 'linux' | 'unknown';

export function useOS(): OS {
  const [os] = useState<OS>(() => {
    if (typeof navigator === 'undefined') return 'unknown';
    const ua = navigator.userAgent;
    if (/Mac/i.test(ua)) return 'mac';
    if (/Win/i.test(ua)) return 'windows';
    if (/Linux/i.test(ua)) return 'linux';
    return 'unknown';
  });

  return os;
}
