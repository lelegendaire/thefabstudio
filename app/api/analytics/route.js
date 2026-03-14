/**
 * API Route : /api/analytics
 * Récupère les données Web Analytics de Vercel (vues + clics) par mois
 *
 * Variables d'environnement requises :
 *   VERCEL_TOKEN       → votre token d'API Vercel (Settings > Tokens)
 *   VERCEL_TEAM_ID     → team_wQ1e3aCAaMnzDrxEaDw0eUKI
 *   VERCEL_PROJECT_ID  → prj_Q0hyEAngkifBAb77TKyQ8IOYA0vk
 */

export const dynamic = "force-dynamic";

const VERCEL_API = "https://vercel.com/api";
const TEAM_ID = process.env.VERCEL_TEAM_ID || "team_wQ1e3aCAaMnzDrxEaDw0eUKI";
const PROJECT_ID =
  process.env.VERCEL_PROJECT_ID || "prj_Q0hyEAngkifBAb77TKyQ8IOYA0vk";

const MONTH_NAMES = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December",
];

/** Retourne {from, to} en ms pour les N derniers mois complets */
function getRange(months = 6) {
  const now = new Date();
  const to = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
  const from = new Date(now.getFullYear(), now.getMonth() - months + 1, 1);
  return { from: from.getTime(), to: to.getTime() };
}

/** Appel générique à l'API Vercel Analytics */
async function fetchInsights(path, params = {}) {
  const token = process.env.VERCEL_TOKEN;
  if (!token) throw new Error("VERCEL_TOKEN manquant dans les variables d'environnement");

  const url = new URL(`${VERCEL_API}/web/insights/${path}`);
  url.searchParams.set("teamId", TEAM_ID);
  url.searchParams.set("projectId", PROJECT_ID);
  url.searchParams.set("environment", "production");
  url.searchParams.set("filter", "{}");
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    next: { revalidate: 3600 }, // cache 1 heure
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Vercel API ${res.status}: ${text}`);
  }
  return res.json();
}

export async function GET() {
  try {
    const { from, to } = getRange(6);

    // Récupère le timeseries des pages vues (granularité mensuelle)
    const [viewsData, clicksData] = await Promise.all([
      fetchInsights("timeseries", { from, to, granularity: "month", event: "pageview" }),
      fetchInsights("timeseries", { from, to, granularity: "month", event: "click" }),
    ]);

    // Indexe les clics par timestamp pour le merge
    const clicksMap = {};
    for (const point of clicksData?.data ?? []) {
      clicksMap[point.key] = point.total;
    }

    // Construit le tableau chartData compatible avec Recharts
    const chartData = (viewsData?.data ?? []).map((point) => {
      const date = new Date(point.key);
      return {
        month: MONTH_NAMES[date.getMonth()],
        visiteur: point.total ?? 0,
        client: clicksMap[point.key] ?? 0,
      };
    });

    // Fallback si aucune donnée (Analytics pas encore activé, etc.)
    if (chartData.length === 0) {
      return Response.json(
        { data: [], message: "Aucune donnée Analytics disponible pour cette période." },
        { status: 200 }
      );
    }

    return Response.json({ data: chartData });
  } catch (err) {
    console.error("[/api/analytics]", err.message);
    return Response.json({ error: err.message }, { status: 500 });
  }
}