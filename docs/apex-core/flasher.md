---
title: Apex Core Flasher
---

<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=DM+Mono:wght@300;400&display=swap" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/qrcode/build/qrcode.min.js"></script>
<script type="module" src="https://unpkg.com/esp-web-tools@10/dist/web/install-button.js"></script>

<style>
  :root {
    /* Use Material Theme variables or compatible shades */
    --glass-bg:       rgba(255, 255, 255, 0.03);
    --glass-bg-deep:  rgba(255, 255, 255, 0.05);
    --glass-border:   rgba(255, 255, 255, 0.1);
    --glass-shadow:   0 4px 20px rgba(0, 0, 0, 0.3);
    
    /* Brand Colors matching extra.css */
    --brand-green:     #297038;
    --brand-green-hi:  #34a050;
    --brand-green-glow: rgba(41, 112, 56, 0.3);

    --text-dim: #70707a;
    --radius:    12px;
    --radius-sm: 8px;
    --font: 'Inter', sans-serif;
    --mono: 'DM Mono', monospace;
  }

  /* ── Page Container ── */
  .flasher-container {
    max-width: 640px;
    margin: 2rem auto;
  }

  /* ── Header ── */
  .flasher-header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 32px;
    padding: 16px;
    background: var(--md-card-bg-color, var(--glass-bg));
    border: 1px solid var(--glass-border);
    border-radius: var(--radius);
  }
  .header-icon {
    width: 48px;
    height: 48px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.05);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .header-icon img { width: 100%; height: 100%; object-fit: cover; }
  .header-title { font-size: 1.1rem; font-weight: 700; color: var(--md-typeset-color); }
  .header-sub { font-size: 0.8rem; color: var(--text-dim); }
  .header-badge {
    margin-left: auto;
    font-family: var(--mono);
    font-size: 10px;
    color: var(--brand-green-hi);
    background: rgba(41, 112, 56, 0.1);
    padding: 2px 8px;
    border-radius: 12px;
  }

  /* ── Cards ── */
  .steps { display: flex; flex-direction: column; gap: 16px; }

  .card {
    background: var(--md-card-bg-color, var(--glass-bg));
    border: 1px solid var(--glass-border);
    border-radius: var(--radius);
    transition: transform 0.2s ease, border-color 0.2s ease;
  }
  .card.active {
    border-color: var(--brand-green);
    box-shadow: 0 0 0 1px var(--brand-green), var(--glass-shadow);
  }
  .card.done { opacity: 0.6; }

  .card-header {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 16px;
  }

  .step-orb {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--mono);
    font-size: 12px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--glass-border);
    color: var(--text-dim);
  }
  .card.active .step-orb {
    background: var(--brand-green);
    color: white;
    border-color: transparent;
  }
  .card.done .step-orb {
    background: #1e4d28;
    color: var(--brand-green-hi);
  }

  .card-meta { flex: 1; }
  .card-title { font-size: 0.95rem; font-weight: 600; color: var(--md-typeset-color); }
  .card-subtitle { font-size: 0.75rem; color: var(--text-dim); }

  .pill {
    font-size: 10px;
    font-weight: 600;
    padding: 2px 8px;
    border-radius: 10px;
  }
  .pill-waiting { background: rgba(255, 255, 255, 0.05); color: var(--text-dim); }
  .pill-ready   { background: rgba(41, 112, 56, 0.15); color: var(--brand-green-hi); }
  .pill-done    { background: rgba(41, 112, 56, 0.1); color: var(--brand-green-hi); }

  .card-body {
    padding: 0 16px 16px;
    border-top: 1px solid var(--glass-border);
  }
  .card-desc {
    font-size: 0.85rem;
    color: var(--text-dim);
    line-height: 1.6;
    margin: 12px 0;
  }

  /* ── SW status ── */
  .sw-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    background: rgba(255, 255, 255, 0.03);
    padding: 4px 10px;
    border-radius: 20px;
    margin-bottom: 12px;
  }
  .sw-dot { width: 6px; height: 6px; border-radius: 50%; background: #444; }
  .sw-dot.ready { background: var(--brand-green-hi); box-shadow: 0 0 8px var(--brand-green-glow); }

  /* ── Buttons ── */
  .btn-row { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 12px; }
  esp-web-install-button { display: contents; }

  .btn {
    font-family: var(--font);
    font-size: 13px;
    font-weight: 600;
    padding: 8px 16px;
    border-radius: var(--radius-sm);
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  .btn:disabled { opacity: 0.3; cursor: not-allowed; }

  .btn-primary {
    background: var(--brand-green);
    color: white;
  }
  .btn-primary:hover:not(:disabled) { background: var(--brand-green-hi); }

  .btn-glass {
    background: rgba(255, 255, 255, 0.05);
    color: var(--md-typeset-color);
    border: 1px solid var(--glass-border);
  }

  /* ── Log ── */
  .log {
    background: rgba(0, 0, 0, 0.2);
    border: 1px solid var(--glass-border);
    border-radius: 6px;
    padding: 10px;
    font-family: var(--mono);
    font-size: 11px;
    max-height: 120px;
    overflow-y: auto;
    margin-top: 12px;
    color: #888;
  }
  .log .ok { color: var(--brand-green-hi); }
  .log .info { color: #5a9fff; }
  .log .err { color: #ff453a; }

  /* ── Credentials ── */
  .creds { display: none; margin-top: 16px; }
  .creds.visible { display: block; animation: slideDown 0.3s ease-out; }

  .creds-inner {
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-sm);
    background: rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
  .creds-header-bar {
    padding: 8px 12px;
    background: rgba(255, 214, 10, 0.05);
    font-size: 11px;
    color: #c8960a;
    border-bottom: 1px solid var(--glass-border);
  }
  .creds-body { display: flex; flex-wrap: wrap; }
  .creds-qr { padding: 16px; border-right: 1px solid var(--glass-border); background: white; }
  .creds-fields { padding: 16px; flex: 1; display: flex; flex-direction: column; gap: 12px; }
  .field-label { font-size: 9px; text-transform: uppercase; color: #555; letter-spacing: 0.5px; }
  .field-value { font-family: var(--mono); font-size: 13px; color: var(--md-typeset-color); }
  .field-value.large { font-size: 20px; color: var(--brand-green-hi); font-weight: 300; }

  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 480px) {
    .creds-qr { border-right: none; border-bottom: 1px solid var(--glass-border); width: 100%; display: center; }
  }
</style>

<div class="flasher-container">

  <!-- Header -->
  <header class="flasher-header">
    <div class="header-icon">
      <img src="/assets/apex_logo_dark_transparent_black_filled.png" alt="">
    </div>
    <div>
      <div class="header-title">Apex Core Flasher</div>
      <div class="header-sub">Zigbee Bridge — Web Setup Tool</div>
    </div>
    <span class="header-badge">v1.0.0</span>
  </header>

  <!-- Steps -->
  <div class="steps">

    <!-- Warning: Test Credentials -->
    <div class="card glass" style="border-color: rgba(255, 152, 0, 0.5); background: rgba(255, 152, 0, 0.05); margin-bottom: 16px;">
      <div class="card-body" style="padding: 16px; border-top: none;">
        <div style="display: flex; gap: 12px; align-items: center;">
          <span style="font-size: 20px;">⚠️</span>
          <div style="font-size: 0.85rem; color: var(--text-dim); line-height: 1.4;">
            <strong style="color: #ff9800; display: block; margin-bottom: 2px;">Developer Mode / Uncertified Device</strong>
            This tool uses <strong>Matter Test Credentials</strong>. Your smart home platform (Apple Home, Google Home, etc.) will display a warning that this is an "Uncertified Accessory." This is normal for Apex Core development hardware.
          </div>
        </div>
      </div>
    </div>

    <!-- Step 1 -->
    <div class="card glass active" id="step1">
      <div class="card-header">
        <div class="step-orb" id="step1Num">1</div>
        <div class="card-meta">
          <div class="card-title">Generate Credentials</div>
          <div class="card-subtitle">Create unique pairing data for this device</div>
        </div>
        <span class="pill pill-ready" id="step1Status">Ready</span>
      </div>
      <div class="card-body">
        <p class="card-desc">Generates a unique discriminator, passcode, and SPAKE2+ verifier entirely in your browser. Nothing leaves this page.</p>

        <div class="sw-pill">
          <span class="sw-dot" id="swDot"></span>
          <span id="swText">Initializing…</span>
        </div>

        <div class="btn-row">
          <button class="btn btn-primary" id="btnGenerate" onclick="window.doGenerateCredentials()" disabled>
            Generate Credentials
          </button>
        </div>

        <div class="log" id="log1"><span class="dim">// Waiting for service worker…</span></div>

        <div class="creds" id="credsPanel">
          <div class="creds-inner glass-deep">
            <div class="creds-header-bar">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="rgba(255,159,10,0.9)">
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
              </svg>
              <span>Pairing Credentials — Save before continuing</span>
            </div>
            <div class="creds-body">
              <div class="creds-qr">
                <canvas id="qrCanvas"></canvas>
                <div class="qr-label">Scan to pair</div>
              </div>
              <div class="creds-fields">
                <div class="field">
                  <label class="field-label">Manual Pairing Code</label>
                  <div class="field-value large" id="fManual">—</div>
                </div>
                <div class="field">
                  <label class="field-label">Discriminator</label>
                  <div class="field-value" id="fDisc">—</div>
                </div>
                <div class="field">
                  <label class="field-label">Passcode</label>
                  <div class="field-value" id="fPass">—</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Step 2 -->
    <div class="card glass" id="step2">
      <div class="card-header">
        <div class="step-orb" id="step2Num">2</div>
        <div class="card-meta">
          <div class="card-title">Flash Device</div>
          <div class="card-subtitle">Write firmware and credentials in one operation</div>
        </div>
        <span class="pill pill-waiting" id="step2Status">Waiting</span>
      </div>
      <div class="card-body">
        <p class="card-desc">Connects to your device and flashes the firmware and NVS credentials in a single operation.</p>
        <div class="btn-row">
          <esp-web-install-button id="espInstallBtn" manifest="">
            <button slot="activate" class="btn btn-primary" id="btnFlash" disabled>Flash Device</button>
          </esp-web-install-button>
          <button class="btn btn-glass" id="btnFlashDone" onclick="window.onFlashDone()" disabled>Mark Complete</button>
          <button class="btn btn-glass" id="btnDownload" onclick="window.doDownloadNVS()" disabled>Download NVS</button>
        </div>
        <div class="log" id="log2"><span class="dim">// Complete Step 1 first</span></div>
      </div>
    </div>

    <!-- Step 3 -->
    <div class="card glass" id="step3">
      <div class="card-header">
        <div class="step-orb" id="step3Num">✓</div>
        <div class="card-meta">
          <div class="card-title">Device Ready</div>
          <div class="card-subtitle">Commission using the pairing code from Step 1</div>
        </div>
        <span class="pill pill-waiting" id="step3Status">Waiting</span>
      </div>
      <div class="card-body">
        <p class="card-desc">Your Apex Core is ready. Open Apple Home, Google Home, or Home Assistant and enter the manual pairing code.</p>
        <div class="btn-row">
          <button class="btn btn-glass" onclick="window.doReset()">Set Up Another Device</button>
        </div>
      </div>
    </div>

  </div>

</div>

---

<div class="grid cards" markdown>

-   [:octicons-arrow-right-24: **Next Step: Adding To Home (Step 3)**](./commissioning.md)

</div>


<script type="module">
import { computeSpake2pVerifier, buildNVSPartition } from './spake2p.js';

const BASE           = window.location.href.replace(/\/[^/]*$/, '/');
const NVS_URL        = new URL('/apex-core/firmware/nvs-current.bin', BASE).href;
const BOOTLOADER_OFFSET = 0x0;
const PARTITIONS_OFFSET = 0xC000;
const OTA_OFFSET        = 0x1F000;
const FIRMWARE_OFFSET   = 0x30000;
const NVS_OFFSET        = 0x4D0000;
const NVS_SIZE          = 0x6000;
const NVS_ITERATIONS    = 1000;

const state = { nvsBuffer: null, manifestURL: null, discriminator: null, passcode: null, swReady: false };

function log(id, msg, cls = '') {
  const el = document.getElementById(id);
  const line = document.createElement('div');
  if (cls) line.className = cls;
  line.textContent = `[${new Date().toLocaleTimeString('en-US',{hour12:false})}] ${msg}`;
  el.appendChild(line);
  el.scrollTop = el.scrollHeight;
}

function setStep(n, statusText, statusClass, cardClass) {
  document.getElementById(`step${n}`).className         = `card glass ${cardClass}`;
  document.getElementById(`step${n}Status`).className   = `pill ${statusClass}`;
  document.getElementById(`step${n}Status`).textContent = statusText;
}

function setSWStatus(text, s = 'idle') {
  document.getElementById('swText').textContent = text;
  const dot = document.getElementById('swDot');
  dot.className = 'sw-dot' + (s === 'ready' ? ' ready' : s === 'error' ? ' error' : '');
}

async function waitForController() {
  if (navigator.serviceWorker.controller) return;
  await new Promise(resolve => {
    navigator.serviceWorker.addEventListener('controllerchange', resolve, { once: true });
  });
}

async function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) { setSWStatus('Not supported', 'error'); return false; }
  try {
    await navigator.serviceWorker.register('./sw.js', { scope: './' });
    await navigator.serviceWorker.ready;
    await waitForController();
    setSWStatus('Ready', 'ready');
    log('log1', 'Service worker ready', 'ok');
    state.swReady = true;
    document.getElementById('btnGenerate').disabled = false;
    return true;
  } catch(e) {
    setSWStatus(`Error: ${e.message}`, 'error');
    log('log1', `Service worker error: ${e.message}`, 'err');
    return false;
  }
}

async function sendNVSToServiceWorker(buffer) {
  return new Promise((resolve, reject) => {
    const sw = navigator.serviceWorker.controller;
    if (!sw) { reject(new Error('Service worker not controlling page — refresh and try again')); return; }
    const channel = new MessageChannel();
    channel.port1.onmessage = (e) => e.data?.ok ? resolve(e.data) : reject(new Error('SW rejected buffer'));
    sw.postMessage({ type: 'SET_NVS', buffer }, [channel.port2, buffer]);
  });
}

registerServiceWorker();

const INVALID_PASSCODES = new Set([0,11111111,22222222,33333333,44444444,55555555,66666666,77777777,88888888,99999999,12345678,87654321]);
function randomDiscriminator() { return Math.floor(Math.random() * 4096); }
function randomPasscode() { let c; do { c = Math.floor(Math.random()*99999997)+1; } while(INVALID_PASSCODES.has(c)); return c; }

function buildQRPayload(disc, pass, vid=0xFFF1, pid=0x8015) {
  const B = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ-.';
  const bits = new Uint8Array(11); let offset = 0;
  function populateBits(value, numBits) {
    for (let i = 0; i < numBits; i++) { const index = offset+i; if((value>>i)&1) bits[index>>3]|=(1<<(index&7)); }
    offset += numBits;
  }
  populateBits(0,3); populateBits(vid,16); populateBits(pid,16);
  populateBits(0,2); populateBits(2,8); populateBits(disc,12);
  populateBits(pass,27); populateBits(0,4);
  function base38Encode(buf) {
    let r='';
    for(let i=0;i<buf.length;i+=3){
      const rem=buf.length-i;
      if(rem>=3){let n=buf[i]|(buf[i+1]<<8)|(buf[i+2]<<16);for(let j=0;j<5;j++){r+=B[n%38];n=Math.floor(n/38);}}
      else if(rem===2){let n=buf[i]|(buf[i+1]<<8);for(let j=0;j<4;j++){r+=B[n%38];n=Math.floor(n/38);}}
      else{let n=buf[i];for(let j=0;j<2;j++){r+=B[n%38];n=Math.floor(n/38);}}
    }
    return r;
  }
  return 'MT:' + base38Encode(bits);
}

function buildManualCode(disc, passcode) {
  const shortDisc=(disc>>8), discMsb=(shortDisc>>2)&0x3, discLsb=shortDisc&0x3;
  const chunk1=discMsb, chunk2=(passcode&0x3FFF)|(discLsb<<14), chunk3=(passcode>>14)&0x1FFF;
  const digits=String(chunk1).padStart(1,'0')+String(chunk2).padStart(5,'0')+String(chunk3).padStart(4,'0');
  const M=[0,1,2,3,4,5,6,7,8,9,1,2,3,4,0,6,7,8,9,5,2,3,4,0,1,7,8,9,5,6,3,4,0,1,2,8,9,5,6,7,
           4,0,1,2,3,9,5,6,7,8,5,9,8,7,6,0,4,3,2,1,6,5,9,8,7,1,0,4,3,2,7,6,5,9,8,2,1,0,4,3,
           8,7,6,5,9,3,2,1,0,4,9,8,7,6,5,4,3,2,1,0];
  const P=[1,5,7,6,2,8,3,0,9,4];
  function permute(val,count){val=val%10;return count===0?val:permute(P[val],count-1);}
  let c=0;
  for(let i=1;i<=digits.length;i++) c=M[c*10+permute(parseInt(digits[digits.length-i]),i)];
  const checksum=(c>0&&c<5)?5-c:c;
  return digits.slice(0,5)+'-'+digits.slice(5)+checksum;
}

customElements.whenDefined('esp-web-install-button').then(() => {
  document.getElementById('espInstallBtn').addEventListener('state-changed', (e) => {
    const s = e.detail?.state ?? '';
    log('log2', `ESP Tools: ${s}`, 'info');
    if (s === 'FINISHED' || s === 'DISCONNECT') {
      log('log2','Flash complete','ok');
      setStep(2,'Done','pill-done','done');
      document.getElementById('step2Num').textContent='✓';
      setStep(3,'Ready','pill-ready','active');
      document.getElementById('step3Num').textContent='✓';
      document.getElementById('step3').scrollIntoView({behavior:'smooth',block:'start'});
    }
    if (s === 'ERROR') {
      log('log2',`Flash error: ${JSON.stringify(e.detail)}`,'err');
      setStep(2,'Error','pill-error','active');
    }
  });
});

window.doGenerateCredentials = async function() {
  document.getElementById('btnGenerate').disabled = true;
  document.getElementById('credsPanel').classList.remove('visible');
  log('log1','Generating unique credentials…','info');

  const disc=randomDiscriminator(), pcode=randomPasscode();
  const qr=buildQRPayload(disc,pcode), manual=buildManualCode(disc,pcode);
  state.discriminator=disc; state.passcode=pcode;

  log('log1','Computing SPAKE2+ verifier…','info');
  let spake2p;
  try {
    spake2p = await computeSpake2pVerifier(pcode, NVS_ITERATIONS);
  } catch(e) {
    log('log1',`SPAKE2+ error: ${e.message}`,'err');
    document.getElementById('btnGenerate').disabled=false;
    return;
  }

  log('log1','Building NVS partition…','info');
  const nvsBuf = buildNVSPartition(disc, pcode, spake2p, NVS_SIZE);

  log('log1','Sending to service worker…','info');
  try {
    const nvsBufferCopy = nvsBuf.slice(0).buffer;
    await sendNVSToServiceWorker(nvsBuf.buffer);
    const bc = new BroadcastChannel('nvs-channel');
    bc.postMessage({type:'SET_NVS_BROADCAST',buffer:nvsBufferCopy}); bc.close();
    state.nvsBuffer = nvsBufferCopy;
  } catch(e) {
    log('log1',`Service worker error: ${e.message}`,'err');
    document.getElementById('btnGenerate').disabled=false;
    return;
  }

  const stamp = `?t=${Date.now()}`, firmwareBase = new URL('/apex-core/firmware/', BASE).href;
  const manifest={name:'Apex Core',version:'1.0.0',new_install_prompt_erase:true,builds:[{chipFamily:'ESP32-C6',parts:[
    {path:firmwareBase+'bootloader.bin'+stamp,      offset:BOOTLOADER_OFFSET},
    {path:firmwareBase+'partition-table.bin'+stamp,  offset:PARTITIONS_OFFSET},
    {path:firmwareBase+'esp_secure_cert.bin'+stamp,  offset:0xD000},
    {path:firmwareBase+'ota_data_initial.bin'+stamp, offset:OTA_OFFSET},
    {path:firmwareBase+'translator.bin'+stamp,       offset:FIRMWARE_OFFSET},
    {path:NVS_URL+stamp,                             offset:NVS_OFFSET},
  ]}]};
  const btn=document.getElementById('espInstallBtn');
  if(state.manifestURL) URL.revokeObjectURL(state.manifestURL);
  state.manifestURL=URL.createObjectURL(new Blob([JSON.stringify(manifest)],{type:'application/json'}));
  if(btn) btn.setAttribute('manifest',state.manifestURL);

  QRCode.toCanvas(document.getElementById('qrCanvas'),qr,{
    width:140,margin:1,color:{dark:'#1a1f1b',light:'#ffffff'}
  });

  document.getElementById('fManual').textContent=manual;
  document.getElementById('fDisc').textContent=disc;
  document.getElementById('fPass').textContent=String(pcode).padStart(8,'0');
  document.getElementById('credsPanel').classList.add('visible');

  setStep(1,'Done','pill-done','done');
  document.getElementById('step1Num').textContent='✓';
  setStep(2,'Ready','pill-ready','active');
  document.getElementById('btnFlash').disabled=false;
  document.getElementById('btnFlashDone').disabled=false;
  document.getElementById('btnDownload').disabled=false;
};

window.onFlashDone = function() {
  setStep(2,'Done','pill-done','done');
  document.getElementById('step2Num').textContent='✓';
  setStep(3,'Ready','pill-ready','active');
};

window.doDownloadNVS = function() {
  if(!state.nvsBuffer) return;
  const url=URL.createObjectURL(new Blob([state.nvsBuffer],{type:'application/octet-stream'}));
  Object.assign(document.createElement('a'),{href:url,download:'apex-nexus-nvs.bin'}).click();
  URL.revokeObjectURL(url);
};

window.doReset = function() {
  window.location.reload();
};
</script>
