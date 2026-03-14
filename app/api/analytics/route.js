/**
 * app/api/analytics/route.js
 *
 * Récupère les données Google Search Console (impressions + clics)
 * agrégées par mois sur les 6 derniers mois.
 *
 * ── Variables d'environnement requises ──────────────────────────────────────
 *   GSC_CLIENT_EMAIL   → email du compte de service Google
 *   GSC_PRIVATE_KEY    → clé privée du compte de service (avec \n)
 *   GSC_SITE_URL       → URL exacte de ta propriété ex: "sc-domain:thefabstudio.fr"
 *                         ou "https://www.thefabstudio.fr/"
 * ────────────────────────────────────────────────────────────────────────────
 */

export const dynamic = "force-dynamic";

const MONTH_NAMES = [
  "January","February","March","April",
  "May","June","July","August",
  "September","October","November","December",
];

// ── Helpers date ─────────────────────────────────────────────────────────────
function toYMD(date) {
  return date.toISOString().slice(0, 10); // "YYYY-MM-DD"
}

function lastSixMonthsRange() {
  const now   = new Date();
  // Début : 1er jour il y a 5 mois
  const start = new Date(now.getFullYear(), now.getMonth() - 5, 1);
  // Fin   : dernier jour du mois courant
  const end   = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return { startDate: toYMD(start), endDate: toYMD(end) };
}

// ── Authentification OAuth2 via Service Account (JWT) ────────────────────────
async function getAccessToken(clientEmail, privateKey) {
  const now = Math.floor(Date.now() / 1000);
  const header  = { alg: "RS256", typ: "JWT" };
  const payload = {
    iss: clientEmail,
    scope: "https://www.googleapis.com/auth/webmasters.readonly",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  };

  const encode = (obj) =>
    btoa(JSON.stringify(obj))
      .replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");

  const signingInput = `${encode(header)}.${encode(payload)}`;

  // Importe la clé privée RSA
  const pemKey = privateKey.replace(/\\n/g, "\n");
  const binaryKey = pemToBinary(pemKey);
  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    binaryKey,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    cryptoKey,
    new TextEncoder().encode(signingInput)
  );

  const jwt = `${signingInput}.${arrayBufferToBase64Url(signature)}`;

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!tokenRes.ok) {
    const txt = await tokenRes.text();
    throw new Error(`OAuth token error: ${txt}`);
  }
  const { access_token } = await tokenRes.json();
  return access_token;
}

function pemToBinary(pem) {
  const b64 = pem
    .replace(/-----BEGIN PRIVATE KEY-----/, "")
    .replace(/-----END PRIVATE KEY-----/, "")
    .replace(/\s/g, "");
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

function arrayBufferToBase64Url(buffer) {
  const bytes = new Uint8Array(buffer);
  let str = "";
  for (const b of bytes) str += String.fromCharCode(b);
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

// ── Appel Search Console API ─────────────────────────────────────────────────
async function fetchSearchConsole(accessToken, siteUrl, startDate, endDate) {
  const apiUrl = `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`;

  const res = await fetch(apiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      startDate,
      endDate,
      dimensions: ["date"],       // granularité quotidienne → on agrège par mois côté serveur
      rowLimit: 500,
      dataState: "final",
    }),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Search Console API ${res.status}: ${txt}`);
  }
  return res.json();
}

// ── Agrégation par mois ───────────────────────────────────────────────────────
function aggregateByMonth(rows = []) {
  const map = {}; // "YYYY-MM" → { clicks, impressions }

  for (const row of rows) {
    const monthKey = row.keys[0].slice(0, 7); // "2025-03"
    if (!map[monthKey]) map[monthKey] = { clicks: 0, impressions: 0 };
    map[monthKey].clicks      += row.clicks ?? 0;
    map[monthKey].impressions += row.impressions ?? 0;
  }

  // Génère les 6 derniers mois dans l'ordre chronologique
  const result = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d   = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = toYMD(d).slice(0, 7);
    result.push({
      month:    MONTH_NAMES[d.getMonth()],
      visiteur: map[key]?.impressions ?? 0,   // Impressions = "Vues"
      client:   map[key]?.clicks      ?? 0,   // Clicks      = "Clics"
    });
  }
  return result;
}

// ── GET ───────────────────────────────────────────────────────────────────────
export async function GET() {
  const clientEmail = process.env.GSC_CLIENT_EMAIL;
  const privateKey  = process.env.GSC_PRIVATE_KEY;
  const siteUrl     = process.env.GSC_SITE_URL;

  if (!clientEmail || !privateKey || !siteUrl) {
    return Response.json(
      {
        error:
          "Variables manquantes : GSC_CLIENT_EMAIL, GSC_PRIVATE_KEY et GSC_SITE_URL " +
          "doivent être définies dans les env vars Vercel.",
      },
      { status: 500 }
    );
  }

  try {
    const accessToken = await getAccessToken(clientEmail, privateKey);
    const { startDate, endDate } = lastSixMonthsRange();
    const gscData = await fetchSearchConsole(accessToken, siteUrl, startDate, endDate);
    const data    = aggregateByMonth(gscData.rows);

    return Response.json({ data });
  } catch (err) {
    console.error("[/api/analytics]", err.message);
    return Response.json({ error: err.message }, { status: 500 });
  }
}