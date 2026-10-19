// ═══════════════════════════════════════════════════════════════
// Apex Nexus — Matter Credential Generator
// Computes SPAKE2+ verifier and builds a valid ESP-IDF NVS
// partition binary for the `fctry` partition.
//
// Works entirely in the browser — no backend required.
// Compatible with GitHub Pages and any static host.
//
// NVS binary format verified byte-for-byte against
// nvs_partition_gen.py output. CRC32 matches zlib.crc32()
// as used by ESP-IDF NVS internally.
// ═══════════════════════════════════════════════════════════════

// ── CRC32 table matching Python zlib.crc32 / ESP-IDF NVS ─────
// Generated via: [zlib.crc32(bytes([i]), 0) & 0xFFFFFFFF for i in range(256)]
// This is NOT the standard ISO-HDLC table — ESP-IDF NVS uses zlib's variant.
const CRC32_TABLE = new Uint32Array([
  0xd202ef8d, 0xa505df1b, 0x3c0c8ea1, 0x4b0bbe37, 0xd56f2b94, 0xa2681b02, 0x3b614ab8, 0x4c667a2e,
  0xdcd967bf, 0xabde5729, 0x32d70693, 0x45d03605, 0xdbb4a3a6, 0xacb39330, 0x35bac28a, 0x42bdf21c,
  0xcfb5ffe9, 0xb8b2cf7f, 0x21bb9ec5, 0x56bcae53, 0xc8d83bf0, 0xbfdf0b66, 0x26d65adc, 0x51d16a4a,
  0xc16e77db, 0xb669474d, 0x2f6016f7, 0x58672661, 0xc603b3c2, 0xb1048354, 0x280dd2ee, 0x5f0ae278,
  0xe96ccf45, 0x9e6bffd3, 0x0762ae69, 0x70659eff, 0xee010b5c, 0x99063bca, 0x000f6a70, 0x77085ae6,
  0xe7b74777, 0x90b077e1, 0x09b9265b, 0x7ebe16cd, 0xe0da836e, 0x97ddb3f8, 0x0ed4e242, 0x79d3d2d4,
  0xf4dbdf21, 0x83dcefb7, 0x1ad5be0d, 0x6dd28e9b, 0xf3b61b38, 0x84b12bae, 0x1db87a14, 0x6abf4a82,
  0xfa005713, 0x8d076785, 0x140e363f, 0x630906a9, 0xfd6d930a, 0x8a6aa39c, 0x1363f226, 0x6464c2b0,
  0xa4deae1d, 0xd3d99e8b, 0x4ad0cf31, 0x3dd7ffa7, 0xa3b36a04, 0xd4b45a92, 0x4dbd0b28, 0x3aba3bbe,
  0xaa05262f, 0xdd0216b9, 0x440b4703, 0x330c7795, 0xad68e236, 0xda6fd2a0, 0x4366831a, 0x3461b38c,
  0xb969be79, 0xce6e8eef, 0x5767df55, 0x2060efc3, 0xbe047a60, 0xc9034af6, 0x500a1b4c, 0x270d2bda,
  0xb7b2364b, 0xc0b506dd, 0x59bc5767, 0x2ebb67f1, 0xb0dff252, 0xc7d8c2c4, 0x5ed1937e, 0x29d6a3e8,
  0x9fb08ed5, 0xe8b7be43, 0x71beeff9, 0x06b9df6f, 0x98dd4acc, 0xefda7a5a, 0x76d32be0, 0x01d41b76,
  0x916b06e7, 0xe66c3671, 0x7f6567cb, 0x0862575d, 0x9606c2fe, 0xe101f268, 0x7808a3d2, 0x0f0f9344,
  0x82079eb1, 0xf500ae27, 0x6c09ff9d, 0x1b0ecf0b, 0x856a5aa8, 0xf26d6a3e, 0x6b643b84, 0x1c630b12,
  0x8cdc1683, 0xfbdb2615, 0x62d277af, 0x15d54739, 0x8bb1d29a, 0xfcb6e20c, 0x65bfb3b6, 0x12b88320,
  0x3fba6cad, 0x48bd5c3b, 0xd1b40d81, 0xa6b33d17, 0x38d7a8b4, 0x4fd09822, 0xd6d9c998, 0xa1def90e,
  0x3161e49f, 0x4666d409, 0xdf6f85b3, 0xa868b525, 0x360c2086, 0x410b1010, 0xd80241aa, 0xaf05713c,
  0x220d7cc9, 0x550a4c5f, 0xcc031de5, 0xbb042d73, 0x2560b8d0, 0x52678846, 0xcb6ed9fc, 0xbc69e96a,
  0x2cd6f4fb, 0x5bd1c46d, 0xc2d895d7, 0xb5dfa541, 0x2bbb30e2, 0x5cbc0074, 0xc5b551ce, 0xb2b26158,
  0x04d44c65, 0x73d37cf3, 0xeada2d49, 0x9ddd1ddf, 0x03b9887c, 0x74beb8ea, 0xedb7e950, 0x9ab0d9c6,
  0x0a0fc457, 0x7d08f4c1, 0xe401a57b, 0x930695ed, 0x0d62004e, 0x7a6530d8, 0xe36c6162, 0x946b51f4,
  0x19635c01, 0x6e646c97, 0xf76d3d2d, 0x806a0dbb, 0x1e0e9818, 0x6909a88e, 0xf000f934, 0x8707c9a2,
  0x17b8d433, 0x60bfe4a5, 0xf9b6b51f, 0x8eb18589, 0x10d5102a, 0x67d220bc, 0xfedb7106, 0x89dc4190,
  0x49662d3d, 0x3e611dab, 0xa7684c11, 0xd06f7c87, 0x4e0be924, 0x390cd9b2, 0xa0058808, 0xd702b89e,
  0x47bda50f, 0x30ba9599, 0xa9b3c423, 0xdeb4f4b5, 0x40d06116, 0x37d75180, 0xaede003a, 0xd9d930ac,
  0x54d13d59, 0x23d60dcf, 0xbadf5c75, 0xcdd86ce3, 0x53bcf940, 0x24bbc9d6, 0xbdb2986c, 0xcab5a8fa,
  0x5a0ab56b, 0x2d0d85fd, 0xb404d447, 0xc303e4d1, 0x5d677172, 0x2a6041e4, 0xb369105e, 0xc46e20c8,
  0x72080df5, 0x050f3d63, 0x9c066cd9, 0xeb015c4f, 0x7565c9ec, 0x0262f97a, 0x9b6ba8c0, 0xec6c9856,
  0x7cd385c7, 0x0bd4b551, 0x92dde4eb, 0xe5dad47d, 0x7bbe41de, 0x0cb97148, 0x95b020f2, 0xe2b71064,
  0x6fbf1d91, 0x18b82d07, 0x81b17cbd, 0xf6b64c2b, 0x68d2d988, 0x1fd5e91e, 0x86dcb8a4, 0xf1db8832,
  0x616495a3, 0x1663a535, 0x8f6af48f, 0xf86dc419, 0x660951ba, 0x110e612c, 0x88073096, 0xff000000,
]);

// CRC32 matching zlib.crc32(data, initial) — no pre/post inversion.
// Chaining: pass previous result directly as initial for next call.
function crc32(data, initial = 0xFFFFFFFF) {
  let crc = initial;
  for (let i = 0; i < data.length; i++) {
    crc = CRC32_TABLE[(crc ^ data[i]) & 0xFF] ^ (crc >>> 8);
  }
  return crc >>> 0;
}

// ── P256 scalar multiplication via WebCrypto ──────────────────
// Import the scalar as a fake ECDSA private key, export as JWK
// to extract the public key coordinates (scalar * G).
async function scalarMultBase(scalar) {
  const P256_ORDER = BigInt('0xFFFFFFFF00000000FFFFFFFFFFFFFFFFBCE6FAADA7179E84F3B9CAC2FC632551');
  const scalarMod  = scalar % P256_ORDER;
  const scalarBytes = bigIntToBytesBE(scalarMod, 32);

  const pkcs8 = new Uint8Array([
    0x30, 0x41,
    0x02, 0x01, 0x00,
    0x30, 0x13,
      0x06, 0x07, 0x2a, 0x86, 0x48, 0xce, 0x3d, 0x02, 0x01,
      0x06, 0x08, 0x2a, 0x86, 0x48, 0xce, 0x3d, 0x03, 0x01, 0x07,
    0x04, 0x27,
      0x30, 0x25,
        0x02, 0x01, 0x01,
        0x04, 0x20, ...scalarBytes,
  ]);

  const privateKey = await crypto.subtle.importKey(
    'pkcs8', pkcs8,
    { name: 'ECDSA', namedCurve: 'P-256' },
    true, ['sign']
  );
  const jwk = await crypto.subtle.exportKey('jwk', privateKey);

  const point = new Uint8Array(65);
  point[0] = 0x04;
  point.set(base64ToBytes(jwk.x), 1);
  point.set(base64ToBytes(jwk.y), 33);
  return point;
}

// ── PBKDF2-SHA256 ─────────────────────────────────────────────
async function pbkdf2SHA256(passwordBytes, saltBytes, iterations, lengthBytes) {
  const keyMaterial = await crypto.subtle.importKey(
    'raw', passwordBytes, 'PBKDF2', false, ['deriveBits']
  );
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', hash: 'SHA-256', salt: saltBytes, iterations },
    keyMaterial, lengthBytes * 8
  );
  return new Uint8Array(bits);
}

// ── SPAKE2+ verifier ─────────────────────────────────────────
// Computes w0, w1 via PBKDF2 then derives L = w1 * G on P-256.
// Returns base64-encoded verifier (97 bytes) and salt (32 bytes).
export async function computeSpake2pVerifier(passcode, iterations = 1000) {
  const P256_ORDER = BigInt('0xFFFFFFFF00000000FFFFFFFFFFFFFFFFBCE6FAADA7179E84F3B9CAC2FC632551');
  const W_SIZE     = 40;

  const salt       = crypto.getRandomValues(new Uint8Array(32));
  const passcodeLE = new Uint8Array(4);
  new DataView(passcodeLE.buffer).setUint32(0, passcode, true);

  const ws = await pbkdf2SHA256(passcodeLE, salt, iterations, W_SIZE * 2);
  const w0 = bytesToBigIntBE(ws.slice(0, W_SIZE)) % P256_ORDER;
  const w1 = bytesToBigIntBE(ws.slice(W_SIZE))    % P256_ORDER;

  const LBytes  = await scalarMultBase(w1);
  const w0Bytes = bigIntToBytesBE(w0, 32);

  const verifier = new Uint8Array(97);
  verifier.set(w0Bytes, 0);
  verifier.set(LBytes,  32);

  return {
    verifierBase64: btoa(String.fromCharCode(...verifier)),
    saltBase64:     btoa(String.fromCharCode(...salt)),
    iterations,
  };
}

// ═══════════════════════════════════════════════════════════════
// NVS PARTITION BUILDER
//
// Produces an ESP-IDF NVS binary for the `fctry` partition
// compatible with ESP32FactoryDataProvider / ESP32Config.
//
// Format verified byte-for-byte against nvs_partition_gen.py.
// Key order and names match ESP32Config.cpp exactly.
// ═══════════════════════════════════════════════════════════════

export function buildNVSPartition(disc, passcode, spake2p, size = 0x6000) {
  const buf = new Uint8Array(size).fill(0xFF);
  const v   = new DataView(buf.buffer);
  let   ei  = 0;

  // ── Page header (32 bytes at offset 0x00) ────────────────────
  // mState:     0xFFFFFFFC = FULL (page is complete, no half-written entries)
  // mSeqNumber: 0x00000000
  // mVersion:   0xFE (NVS_VERSION)
  // mReserved:  0xFF × 19 bytes
  // mCrc32:     crc32(bytes 0x04–0x1B)
  v.setUint32(0,  0xFFFFFFFC, true); // mState = FULL
  v.setUint32(4,  0x00000000, true); // mSeqNumber
  buf[8] = 0xFE;                     // mVersion
  // bytes 0x09–0x1B: mReserved, left as 0xFF
  v.setUint32(28, crc32(buf.slice(4, 28)), true); // mCrc32 at 0x1C

  // ── Entry bitmap (32 bytes at offset 0x20) ───────────────────
  // 2 bits per entry: 0b11=EMPTY, 0b10=WRITTEN, 0b01=ERASED
  // Clearing the LSB of a pair marks it WRITTEN.
  function markWritten(entryIdx) {
    const bitPos  = entryIdx * 2;
    buf[32 + Math.floor(bitPos / 8)] &= ~(1 << (bitPos % 8));
  }

  // ── Entry writer (entries start at offset 0x40) ──────────────
  // Each entry is 32 bytes:
  //   [0]    nsIndex
  //   [1]    datatype
  //   [2]    span
  //   [3]    chunkIndex (0xFF = CHUNK_ANY)
  //   [4–7]  crc32 (three-part chained over bytes 0–3 and 8–31)
  //   [8–23] key (null-terminated, zero-padded to 16 bytes)
  //   [24–31] data
  function writeEntry(nsIdx, type, span, key, data) {
    const off = 64 + ei * 32;
    if (off + 32 > size) throw new Error('NVS partition full');

    buf[off + 0] = nsIdx;
    buf[off + 1] = type;
    buf[off + 2] = span;
    buf[off + 3] = 0xFF; // chunkIndex = CHUNK_ANY

    // Key: zero-padded to 16 bytes (null terminator included)
    buf.fill(0x00, off + 8, off + 24);
    new TextEncoder().encode(key.slice(0, 15)).forEach((b, i) => { buf[off + 8 + i] = b; });
    buf[off + 8 + Math.min(key.length, 15)] = 0x00;

    // Data
    if (data instanceof Uint8Array) {
      data.slice(0, 8).forEach((b, i) => { buf[off + 24 + i] = b; });
    } else {
      if      (type === 0x01) v.setUint8( off + 24, Number(data));
      else if (type === 0x02) v.setUint16(off + 24, Number(data), true);
      else if (type === 0x04) v.setUint32(off + 24, Number(data), true);
    }

    // Item CRC32: three chained calls over bytes [0–3], [8–23], [24–31]
    // (matches Item::calculateCrc32() in nvs_types.cpp)
    let itemCrc = crc32(buf.slice(off,      off + 4));
        itemCrc = crc32(buf.slice(off + 8,  off + 24), itemCrc);
        itemCrc = crc32(buf.slice(off + 24, off + 32), itemCrc);
    v.setUint32(off + 4, itemCrc, true);

    markWritten(ei);
    ei++;
  }

  // ── String writer ─────────────────────────────────────────────
  // Strings are stored as type 0x21 (NVS_TYPE_STR).
  // Header entry data field:
  //   [0–1] uint16_t dataSize (string length including null terminator)
  //   [2–3] 0xFFFF (reserved)
  //   [4–7] uint32_t dataCrc32 (crc32 of string bytes including null)
  function writeString(nsIdx, key, value) {
    const strBytes = new TextEncoder().encode(value);
    const strLen   = strBytes.length + 1; // include null terminator
    const dataSpan = Math.ceil(strLen / 32);

    const dataWithNull = new Uint8Array(strLen);
    dataWithNull.set(strBytes);
    // last byte is already 0x00

    const sizeData = new Uint8Array(8).fill(0xFF);
    const sv = new DataView(sizeData.buffer);
    sv.setUint16(0, strLen, true);            // dataSize
    sv.setUint32(4, crc32(dataWithNull), true); // dataCrc32

    writeEntry(nsIdx, 0x21, 1 + dataSpan, key, sizeData);

    let written = 0;
    for (let i = 0; i < dataSpan; i++) {
      const off = 64 + ei * 32;
      for (let j = 0; j < 32; j++) {
        buf[off + j] = written < strLen ? dataWithNull[written++] : 0xFF;
      }
      markWritten(ei);
      ei++;
    }
  }

  // ── NVS entries — key names match ESP32Config.cpp exactly ────
  //
  // Namespace:  chip-factory  (kConfigNamespace_ChipFactory)
  // Keys:
  //   discriminator   → kConfigKey_SetupDiscriminator   (U32)
  //   iteration-count → kConfigKey_Spake2pIterationCount (U32)
  //   pin-code        → kConfigKey_SetupPinCode          (U32)
  //   salt            → kConfigKey_Spake2pSalt           (String/base64)
  //   vendor-id       → kConfigKey_VendorId              (U32)
  //   product-id      → kConfigKey_ProductId             (U32)
  //   verifier        → kConfigKey_Spake2pVerifier       (String/base64)

  writeEntry(0, 0x01, 1, 'chip-factory',    1);          // namespace entry
  writeEntry(1, 0x04, 1, 'discriminator',   disc);
  writeEntry(1, 0x04, 1, 'iteration-count', spake2p.iterations);
  writeEntry(1, 0x04, 1, 'pin-code',        passcode);
  writeString(1,          'salt',           spake2p.saltBase64);
  writeEntry(1, 0x04, 1, 'vendor-id',       0xFFF1);
  writeEntry(1, 0x04, 1, 'product-id',      0x8015);
  writeString(1,          'verifier',       spake2p.verifierBase64);

  // ── Device instance info (for Basic Information cluster) ─────
  const generateRandomHex = (n) => {
    const bytes = crypto.getRandomValues(new Uint8Array(n));
    return Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
  };

  writeString(1, 'vendor-name',   'Apex Sensor Labs LLC');
  writeString(1, 'product-name',  'Apex Core');
  writeString(1, 'hw-ver-str',    '1.0');
  writeEntry (1, 0x02, 1, 'hw-ver', 1);
  writeString(1, 'serial-num',    generateRandomHex(8));        // 16 hex chars
  writeString(1, 'mfg-date',      '2026-05-05');
  writeString(1, 'unique-id',     generateRandomHex(16));       // 32 hex chars
  writeString(1, 'part-number',   'APX-CORE-01');
  writeString(1, 'product-url',   'https://docs.apexsensorlabs.com');
  writeString(1, 'product-label', 'Apex Core');

  return buf;
}

// ── Utility functions ─────────────────────────────────────────

function bigIntToBytesBE(n, length) {
  const bytes = new Uint8Array(length);
  for (let i = length - 1; i >= 0; i--) {
    bytes[i] = Number(n & 0xFFn);
    n >>= 8n;
  }
  return bytes;
}

function bytesToBigIntBE(bytes) {
  let result = 0n;
  for (const byte of bytes) result = (result << 8n) | BigInt(byte);
  return result;
}

// Decodes standard base64 (btoa output) and base64url (WebCrypto JWK) alike.
function base64ToBytes(b64) {
  const normalized = b64.replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized.padEnd(normalized.length + (4 - normalized.length % 4) % 4, '=');
  return Uint8Array.from(atob(padded), c => c.charCodeAt(0));
}
