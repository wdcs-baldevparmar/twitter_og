import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  // const { searchParams } = new URL(request.url);
  // const side = (searchParams.get("side") || "BUY").toUpperCase();
  // const leverage = searchParams.get("leverage") || "10";
  // const pair = searchParams?.get("pair") || "BTC-USDT";
  // const pnl = parseFloat(searchParams.get("pnl") || "12.45");

  // const color = pnl >= 0 ? "#20DB74" : "#FF7D5D";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
          fontSize: 32,
          fontWeight: 600,
        }}
      >
        <svg
          width="75"
          viewBox="0 0 75 65"
          fill="#000"
          style={{ margin: "0 75px" }}
        >
          <path d="M37.59.25l36.95 64H.64l36.95-64z"></path>
        </svg>
        {/* {pair} */}
        <div style={{ marginTop: 40 }}>Hello, World</div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
