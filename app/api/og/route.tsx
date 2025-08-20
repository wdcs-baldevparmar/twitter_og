import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  console.log("🚀 ~ GET ~ searchParams:", searchParams);
  const side = (searchParams.get("side") || "BUY").toUpperCase();
  const leverage = searchParams.get("leverage") || "10";
  const pair = searchParams?.get("pair") || "BTC-USDT";
  const pnl = parseFloat(searchParams.get("pnl") || "12.45");
  console.log("🚀 ~ GET ~ pnl:", pnl);

  const color = pnl >= 0 ? "#20DB74" : "#FF7D5D";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "64px",
          background: "#000",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            opacity: 0.6,
            fontSize: 24,
            display: "flex",
            gap: 6,
          }}
        >
          <span
            style={{
              color: color,
            }}
          >
            {pnl >= 0 ? "Profit" : "Loss"} ({pnl} USDC) on
          </span>

          <span>{pair}</span>
          <span>{side}</span>
          <span>{leverage}x</span>
          <span>pnl </span>
        </div>
        <div
          style={{
            position: "absolute",
            right: 48,
            bottom: 40,
            opacity: 0.4,
            fontSize: 22,
          }}
        >
          twitter-og-demo asdasd
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
