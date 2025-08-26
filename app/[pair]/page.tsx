import type { Metadata } from "next";

type Props = {
  params: { pair: string };
  searchParams: {
    side?: string;
    leverage?: string;
    pnl?: string;
    price?: string;
  };
};

export async function generateMetadata({
  params,
  searchParams, // Uncomment if you want to use searchParams
}: // searchParams,
Props): Promise<Metadata> {
  const pairFromUrl = (params.pair || "ETH_USD").toUpperCase();
  const side = (searchParams.side || "BUY").toUpperCase();
  const leverage = searchParams.leverage || "10";
  const pnl = parseFloat(searchParams.pnl || "12.45");
  const pairForImage = pairFromUrl.replace("_", "-");
  const price = searchParams.price || "45123.56";

  const description = `${pnl >= 0 ? "📈" : "📉"} Just ${
    pnl >= 0 ? "made" : "took"
  } ${Math.abs(pnl).toFixed(2)}% ${
    pnl >= 0 ? "profit" : "loss"
  } on ${pairForImage} ${side} ${leverage}x!`;

  const imageUrl = `${
    process.env.NEXT_PUBLIC_BASE_URL
  }/api/og?pair=${encodeURIComponent(pairFromUrl)}&side=${encodeURIComponent(
    side
  )}&leverage=${encodeURIComponent(leverage)}&pnl=${encodeURIComponent(
    String(pnl)
  )}&price=${encodeURIComponent(price)}`;

  return {
    title: `${pairFromUrl.replace("_", "-")} – Twitter OG Demo`,
    description,
    openGraph: {
      title: `${pairFromUrl.replace("_", "-")} – Twitter OG Demo`,
      description,
      type: "website",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/${pairFromUrl}`,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: "OG Card" }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${pairFromUrl.replace("_", "-")} – Twitter OG Demo`,
      description,
      images: [imageUrl], // twitter images = string[]
    },
  };
}

export default function PairPage({ params, searchParams }: Props) {
  const pairFromUrl = (params.pair || "ETH_USD").toUpperCase();
  const side = (searchParams.side || "BUY").toUpperCase();
  const leverage = searchParams.leverage || "10";
  const pnl = parseFloat(searchParams.pnl ?? "12.45");
  const price = searchParams.price || "45123.56";
  const pairForImage = pairFromUrl.replace("_", "-");
  console.log("🚀 ~ PairPage ~ pairForImage:", pairForImage);

  const description = `${pnl >= 0 ? "📈" : "📉"} Just ${
    pnl >= 0 ? "made" : "took"
  } ${Math.abs(pnl).toFixed(2)}% ${
    pnl >= 0 ? "profit" : "loss"
  } on ${pairForImage} ${side} ${leverage}x!`;

  const shareUrl = `${
    process.env.NEXT_PUBLIC_BASE_URL
  }/${pairFromUrl}?side=${encodeURIComponent(
    side
  )}&leverage=${encodeURIComponent(leverage)}&pnl=${encodeURIComponent(
    String(pnl)
  )}`;
  const twitterIntent = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    description
  )}&url=${encodeURIComponent(shareUrl)}`;
  {
    console.log(
      "sfsdfsdf",
      `/api/og?side=${encodeURIComponent(side)}&leverage=${encodeURIComponent(
        leverage
      )}&pair=${encodeURIComponent(pairForImage)}&pnl=${encodeURIComponent(
        String(pnl)
      )}&download=1`
    );
  }

  return (
    <main className="container">
      <div className="card">
        <h1 className="text-2xl font-bold mb-2">{pairFromUrl}</h1>
        <p className="mb-6">
          <small className="muted">
            This page sets OpenGraph/Twitter metadata and points to a dynamic
            image at <code>/api/og</code>.
          </small>
        </p>

        <div className="grid">
          <div>
            <div className="label">Side</div>
            <input className="input" defaultValue={side} readOnly />
          </div>
          <div>
            <div className="label">Leverage</div>
            <input className="input" defaultValue={leverage} readOnly />
          </div>
          <div>
            <div className="label">PnL %</div>
            <input className="input" defaultValue={String(pnl)} readOnly />
          </div>
          <div>
            <div className="label">Closed price</div>
            <input className="input" defaultValue={price} readOnly />
          </div>
        </div>

        <div className="mt-6">
          <a
            className="button"
            href={twitterIntent}
            target="_blank"
            rel="noopener noreferrer"
          >
            Share on Twitter
          </a>

          <a
            className="button"
            href={`/api/og?side=${encodeURIComponent(
              side
            )}&leverage=${encodeURIComponent(
              leverage
            )}&pair=${encodeURIComponent(
              pairForImage
            )}&pnl=${encodeURIComponent(
              String(pnl)
            )}&price=${encodeURIComponent(price)}&download=1`}
            download={`${pairForImage}-${side}.png`}
          >
            Download
          </a>
        </div>
        <div className="mt-4">
          <small className="muted">Direct OG image preview:</small>
          <br />
          <a
            href={`/api/og?side=${encodeURIComponent(
              side
            )}&leverage=${encodeURIComponent(
              leverage
            )}&pair=${encodeURIComponent(
              pairForImage
            )}&pnl=${encodeURIComponent(
              String(pnl)
            )}&price=${encodeURIComponent(price)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            /api/og?side=...&leverage=...&pair=...&pnl=...
          </a>
        </div>
      </div>
    </main>
  );
}
