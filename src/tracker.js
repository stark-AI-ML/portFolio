// tracker.js — Lightweight visitor tracking utility
// Sends a POST to your backend endpoint on page load, and periodically sends heartbeats
// so you can measure interaction time. You handle the backend yourself.

const TRACKER_SESSION_KEY = 'portfolio_session_id';

function generateSessionId() {
  return 'sess_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 9);
}

function getSessionId() {
  let id = sessionStorage.getItem(TRACKER_SESSION_KEY);
  if (!id) {
    id = generateSessionId();
    sessionStorage.setItem(TRACKER_SESSION_KEY, id);
  }
  return id;
}

export function initTracker(config) {
  if (!config || !config.enabled || !config.endpoint) return;

  const sessionId = getSessionId();
  const startTime = Date.now();

  const payload = {
    event: 'page_view',
    sessionId,
    timestamp: new Date().toISOString(),
    url: window.location.href,
    referrer: document.referrer || null,
    userAgent: navigator.userAgent,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };

  // Fire and forget — don't block the UI
  fetch(config.endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }).catch(() => {
    // Silently fail — your backend might not be up yet
  });

  // Heartbeat: sends interaction time every N seconds
  const intervalMs = (config.heartbeatIntervalSeconds || 30) * 1000;
  const heartbeatInterval = setInterval(() => {
    const interactionTime = Math.round((Date.now() - startTime) / 1000);
    fetch(config.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'heartbeat',
        sessionId,
        timestamp: new Date().toISOString(),
        interactionTimeSeconds: interactionTime,
        url: window.location.href,
      }),
    }).catch(() => {});
  }, intervalMs);

  // Send a final event when user leaves
  const handleUnload = () => {
    const interactionTime = Math.round((Date.now() - startTime) / 1000);
    const blob = new Blob(
      [JSON.stringify({
        event: 'page_leave',
        sessionId,
        timestamp: new Date().toISOString(),
        interactionTimeSeconds: interactionTime,
        url: window.location.href,
      })],
      { type: 'application/json' }
    );
    // navigator.sendBeacon is more reliable than fetch on unload
    navigator.sendBeacon(config.endpoint, blob);
    clearInterval(heartbeatInterval);
  };

  window.addEventListener('beforeunload', handleUnload);

  // Cleanup function
  return () => {
    clearInterval(heartbeatInterval);
    window.removeEventListener('beforeunload', handleUnload);
  };
}
