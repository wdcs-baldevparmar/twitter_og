// app/api/og/route.tsx
import { ImageResponse } from "next/og";
export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);

  const download = searchParams.get("download");
  const side = (searchParams.get("side") || "BUY").toUpperCase();
  const leverage = (searchParams.get("leverage") || "10").toString();
  const pair = (searchParams.get("pair") || "BTC-USDT").toUpperCase();
  const pnl = parseFloat(searchParams.get("pnl") || "12.45");
  const raw = parseFloat(searchParams.get("raw_pnl") || "123.45");
  const price = searchParams.get("price") || "45123.56";
  const timestamp = searchParams.get("timestamp") || "2025-08-19 14:22";

  const tryLoad = async (url: string) => {
    try {
      const r = await fetch(url, { cache: "force-cache" });
      if (!r.ok) throw 0;
      return await r.arrayBuffer();
    } catch {
      return undefined;
    }
  };

  const [p400, p500, p600, p700] = await Promise.all([
    tryLoad(`${origin}/fonts/Poppins-Regular.woff`),
    tryLoad(`${origin}/fonts/Poppins-Medium.woff`),
    tryLoad(`${origin}/fonts/Poppins-SemiBold.woff`),
    tryLoad(`${origin}/fonts/Poppins-Bold.woff`),
  ]);

  const img = new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          padding: 24,
          backgroundColor: "#000",
          fontFamily: "Poppins, sans-serif",
          position: "relative",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              color: side === "BUY" ? "#20DB74" : "#FF7D5D",
              fontWeight: 600,
            }}
          >
            {side}
          </div>
          <div
            style={{
              display: "flex",
              width: 4,
              height: 4,
              borderRadius: 9999,
              background: "#9CA3AF",
            }}
          />
          <div style={{ display: "flex", color: "#D1D5DB", fontWeight: 500 }}>
            {leverage}x
          </div>
          <div
            style={{
              display: "flex",
              width: 4,
              height: 4,
              borderRadius: 9999,
              background: "#9CA3AF",
            }}
          />
          <div style={{ display: "flex", color: "#D1D5DB", fontWeight: 500 }}>
            {pair.replace("_", "-")}
          </div>
        </div>

        {/* PnL */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 36,
              fontWeight: 600,
              color: pnl >= 0 ? "#20DB74" : "#FF7D5D",
            }}
          >
            {pnl.toFixed(2)}%
          </div>
          <div
            style={{
              display: "flex",
              fontWeight: 600,
              color: raw >= 0 ? "#20DB74" : "#FF7D5D",
            }}
          >
            {raw.toFixed(2)}
          </div>
        </div>

        {/* Price row */}
        <div
          style={{
            display: "flex",
            gap: 8,
            color: "#D1D5DB",
            fontWeight: 500,
            marginBottom: 28,
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.4)" }}>Closed Price:</span>
          {price}
        </div>

        {/* Timestamp (single child, no flex needed) */}
        <div
          style={{
            display: "flex",
            fontSize: 14,
            color: "rgba(255,255,255,0.4)",
          }}
        >
          {timestamp}
        </div>

        {/* Decorative (no children) */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 260,
            height: 260,
            background:
              "radial-gradient(closest-side, rgba(32,219,116,0.25), transparent 70%)",
            filter: "blur(6px)",
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        p400 && { name: "Poppins", data: p400, weight: 400, style: "normal" },
        p500 && { name: "Poppins", data: p500, weight: 500, style: "normal" },
        p600 && { name: "Poppins", data: p600, weight: 600, style: "normal" },
        p700 && { name: "Poppins", data: p700, weight: 700, style: "normal" },
      ].filter(Boolean) as any,
    }
  );

  const headers = new Headers(img.headers);
  headers.set("Content-Type", "image/png");

  if (download) {
    const safe = (s: string) => s.replace(/[^a-z0-9._-]/gi, "_");
    headers.set(
      "Content-Disposition",
      `attachment; filename="${safe(pair)}-${safe(side)}-${safe(
        leverage
      )}x.png"`
    );
    headers.set("Cache-Control", "no-store");
  } else {
    headers.set("Cache-Control", "public, max-age=31536000, immutable");
  }

  return new Response(img.body, { headers });
}
