import { ImageResponse } from "next/og";

const apiBaseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://api.example.com";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const download = searchParams.get("download");

  const side = (searchParams.get("side") || "BUY").toUpperCase(); // BUY/SELL
  const leverage = searchParams.get("leverage") || "10";
  const pair = searchParams.get("pair") || "BTC-USDT";
  const pnlPercentage = parseFloat(searchParams.get("pnl") || "12.45");
  const raw_pnl = parseFloat(searchParams.get("raw_pnl") || "123.45");
  const price = searchParams.get("price") || "45123.56";
  const timestamp = searchParams.get("timestamp") || "2025-08-19 14:22";

  const poppinsRegular = fetch(
    new URL(`${apiBaseUrl}/fonts/Poppins-Regular.woff`, import.meta.url)
  ).then((res) => res.arrayBuffer());
  const poppinsMedium = fetch(
    new URL(`${apiBaseUrl}/fonts/Poppins-Medium.woff`, import.meta.url)
  ).then((res) => res.arrayBuffer());
  const PoppinsSemiBold = fetch(
    new URL(`${apiBaseUrl}/fonts/Poppins-SemiBold.woff`, import.meta.url)
  ).then((res) => res.arrayBuffer());
  const PoppinsBold = fetch(
    new URL(`${apiBaseUrl}/fonts/Poppins-Bold.woff`, import.meta.url)
  ).then((res) => res.arrayBuffer());
  return new ImageResponse(
    (
      <div
        tw="flex flex-col w-full h-full justify-center p-6"
        style={{
          backgroundColor: "#000000",
          backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.9) 100%), url('${apiBaseUrl}/images/share-bg.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          fontFamily: "Poppins",
        }}
      >
        {/* Header row */}
        <div
          tw="mb-8"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
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
          <div tw=" flex flex-col w-1 h-1 rounded-full bg-gray-400" />

          <div tw="flex flex-col text-gray-300 font-medium">{leverage}x</div>
          <div tw="flex flex-col w-1 h-1 rounded-full bg-gray-400" />

          <div tw="flex flex-col text-gray-300 font-medium">{pair}</div>
        </div>

        {/* PNL */}
        <div tw="mb-7 flex flex-col">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "36px",
              fontWeight: 600,
              color: pnlPercentage >= 0 ? "#20DB74" : "#FF7D5D",
            }}
          >
            {pnlPercentage.toFixed(2)}%
          </div>
          <div
            style={{
              fontWeight: 600,
              color: raw_pnl >= 0 ? "#20DB74" : "#FF7D5D",
            }}
          >
            {Number(raw_pnl).toFixed(2)}
          </div>
        </div>

        {/* Price + timestamp */}
        <div
          tw="flex flex-row text-gray-300 font-medium mb-7"
          style={{
            gap: "8px",
          }}
        >
          <span
            style={{
              color: "rgba(255, 255, 255, 0.4)",
            }}
          >
            Closed Price:{" "}
          </span>
          {price}
        </div>
        <div
          tw="text-sm "
          style={{
            color: "rgba(255, 255, 255, 0.4)",
          }}
        >
          {timestamp}
        </div>

        {/* Side illustration */}
        <div tw="flex flex-row absolute right-0 top-0">
          <img
            src={`${apiBaseUrl}/images/shareable.svg`}
            width={225}
            height={275}
            alt="share"
          />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Poppins",
          data: await poppinsRegular,
          weight: 400,
          style: "normal",
        },
        {
          name: "Poppins",
          data: await poppinsMedium,
          style: "normal",
          weight: 500,
        },
        {
          name: "Poppins",
          data: await PoppinsSemiBold,
          style: "normal",
          weight: 600,
        },
        {
          name: "Poppins",
          data: await PoppinsBold,
          style: "normal",
          weight: 700,
        },
      ],
    }
  );
}
