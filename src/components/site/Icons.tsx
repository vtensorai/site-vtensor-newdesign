/** Icônes filaires 1.5 px, 24 px de grille, taille ajustable. */

type P = { size?: number; className?: string };

function I({ size = 16, className, children }: P & { children: React.ReactNode }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} style={{ flexShrink: 0 }}>
      {children}
    </svg>
  );
}

export const Icon = {
  check: (p: P) => <I {...p}><path d="M5 12.5l4.5 4.5L19 7" /></I>,
  arrow: (p: P) => <I {...p}><path d="M4 12h16M13 5l7 7-7 7" /></I>,
  minus: (p: P) => <I {...p}><path d="M5 12h14" /></I>,
  plus: (p: P) => <I {...p}><path d="M12 5v14M5 12h14" /></I>,
  mail: (p: P) => <I {...p}><rect x="3" y="5" width="18" height="14" rx="1" /><path d="M3 7l9 6 9-6" /></I>,
  chat: (p: P) => <I {...p}><path d="M4 5h16v11H9l-5 4z" /></I>,
  phone: (p: P) => <I {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z" /></I>,
  app: (p: P) => <I {...p}><rect x="3" y="4" width="18" height="16" rx="1" /><path d="M3 9h18M8 4v5" /></I>,
  send: (p: P) => <I {...p}><path d="M21 3L3 10.5l7.5 3L13.5 21z" /></I>,
  server: (p: P) => <I {...p}><rect x="3" y="4" width="18" height="6" rx="1" /><rect x="3" y="14" width="18" height="6" rx="1" /><path d="M7 7h.01M7 17h.01" /></I>,
  shield: (p: P) => <I {...p}><path d="M12 3l8 3v6c0 4.5-3.5 7.8-8 9-4.5-1.2-8-4.5-8-9V6z" /><path d="M9 12l2 2 4-4" /></I>,
  file: (p: P) => <I {...p}><path d="M6 3h8l5 5v13H6z" /><path d="M14 3v5h5M9 13h6M9 17h6" /></I>,
  eye: (p: P) => <I {...p}><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></I>,
  grid: (p: P) => <I {...p}><rect x="4" y="4" width="6" height="6" /><rect x="14" y="4" width="6" height="6" /><rect x="4" y="14" width="6" height="6" /><rect x="14" y="14" width="6" height="6" /></I>,
  users: (p: P) => <I {...p}><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M21.5 20a6.5 6.5 0 0 0-4.5-6.2" /></I>,
  folder: (p: P) => <I {...p}><path d="M3 6h6l2 2h10v11H3z" /></I>,
  wand: (p: P) => <I {...p}><path d="M4 20L15 9M15 5l1-2 1 2 2 1-2 1-1 2-1-2-2-1zM19 12l.7-1.3L21 10l-1.3-.7L19 8l-.7 1.3L17 10l1.3.7z" /></I>,
  brain: (p: P) => <I {...p}><path d="M12 4a3 3 0 0 0-3 3 3 3 0 0 0-3 3 3 3 0 0 0 1 5.5A3 3 0 0 0 12 20a3 3 0 0 0 5-4.5A3 3 0 0 0 18 10a3 3 0 0 0-3-3 3 3 0 0 0-3-3z" /><path d="M12 4v16" /></I>,
  globe: (p: P) => <I {...p}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18" /></I>,
  external: (p: P) => <I {...p}><path d="M14 4h6v6M20 4l-9 9M18 14v6H4V6h6" /></I>,
};

export const CHANNEL_ICON = { email: Icon.mail, whatsapp: Icon.chat, telegram: Icon.send, phone: Icon.phone, web: Icon.app } as const;
