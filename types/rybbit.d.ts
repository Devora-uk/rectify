export {};

declare global {
  interface Window {
    rybbit?: {
      event: (eventName: string, eventData?: Record<string, unknown>) => void;
      pageview: () => void;
      identify: (userId: string, traits?: Record<string, unknown>) => void;
    };
  }
}
