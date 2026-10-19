// ═══════════════════════════════════════════════════════════════
// Apex Nexus — Service Worker
// ═══════════════════════════════════════════════════════════════

const CACHE_VERSION = 'v2';
const NVS_URL = '/apex-core/firmware/nvs-current.bin';
const CACHE_NAME = `apex-nvs-cache-${CACHE_VERSION}`;

// ── Message handler — main page sends NVS buffer here ─────────
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SET_NVS') {
    const buffer = event.data.buffer;
    
    // Store persistently in the Cache API so it survives SW sleep
    event.waitUntil((async () => {
      const cache = await caches.open(CACHE_NAME);
      const response = new Response(buffer, {
        headers: {
          'Content-Type': 'application/octet-stream',
          'Content-Length': buffer.byteLength.toString()
        }
      });
      await cache.put(NVS_URL, response);
      console.log(`[SW] NVS buffer safely cached: ${buffer.byteLength} bytes`);
      event.ports[0]?.postMessage({ ok: true, bytes: buffer.byteLength });
    })());
  }
});

// Also listen on BroadcastChannel so all SW instances get the buffer
const bc = new BroadcastChannel('nvs-channel');
bc.onmessage = (event) => {
  if (event.data && event.data.type === 'SET_NVS_BROADCAST') {
    const buffer = event.data.buffer;
    // BroadcastChannel events don't have waitUntil — use self.registration
    self.registration.active && (async () => {
      const cache = await caches.open(CACHE_NAME);
      const response = new Response(buffer, {
        headers: { 'Content-Type': 'application/octet-stream' }
      });
      await cache.put(NVS_URL, response);
      console.log(`[SW] NVS buffer cached via broadcast: ${buffer.byteLength} bytes`);
    })();
  }
};

// ── Fetch interceptor ─────────────────────────────────────────
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Only intercept the NVS binary URL
  if (url.pathname === NVS_URL || url.pathname.endsWith('/nvs-current.bin')) {
    event.respondWith(handleNVSFetch(event.request));
    return;
  }

  // All other requests pass through normally
  event.respondWith(fetch(event.request));
});

async function handleNVSFetch(request) {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(NVS_URL);

  if (!cachedResponse) {
    console.warn('[SW] NVS fetch intercepted but no cache found');
    return new Response('NVS not generated yet', { status: 404 });
  }

  const nvsBuffer = await cachedResponse.arrayBuffer();

  // Bulletproof cache-busting and CORS headers
  const headers = new Headers({
    'Content-Type': 'application/octet-stream',
    'Accept-Ranges': 'bytes',
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
    'Access-Control-Allow-Origin': '*'
  });

  // Check if esptool.js is asking for a specific chunk (Range request)
  const rangeHeader = request.headers.get('Range');
  if (rangeHeader) {
    const match = rangeHeader.match(/bytes=(\d+)-(\d*)/);
    if (match) {
      const start = parseInt(match[1], 10);
      const end = match[2] ? parseInt(match[2], 10) : nvsBuffer.byteLength - 1;
      
      // Handle invalid range requests
      if (start >= nvsBuffer.byteLength || end >= nvsBuffer.byteLength || start > end) {
        headers.set('Content-Range', `bytes */${nvsBuffer.byteLength}`);
        return new Response(null, { status: 416, headers }); 
      }

      // Slice the exact chunk esptool.js asked for
      const chunk = nvsBuffer.slice(start, end + 1);
      headers.set('Content-Range', `bytes ${start}-${end}/${nvsBuffer.byteLength}`);
      headers.set('Content-Length', chunk.byteLength.toString());
      
      console.log(`[SW] Serving NVS chunk: bytes ${start}-${end}`);
      return new Response(chunk, { status: 206, headers });
    }
  }

  // Standard 200 OK response if no Range was requested
  console.log(`[SW] Serving full NVS binary: ${nvsBuffer.byteLength} bytes`);
  headers.set('Content-Length', nvsBuffer.byteLength.toString());
  
  return new Response(nvsBuffer, { status: 200, headers });
}

// ── Lifecycle — activate immediately, don't wait ──────────────
self.addEventListener('install',  () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('install',  () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

