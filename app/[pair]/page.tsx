"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

type Props = {
  params: { pair: string };
};

export default function PairPage({ params }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const pairFromUrl = (params.pair || "ETH_USD").toUpperCase();
  const initialSide = (searchParams.get("side") || "BUY").toUpperCase();
  const initialLeverage = searchParams.get("leverage") || "10";
  const initialPnl = searchParams.get("pnl") || "12.45";
  const initialPrice = searchParams.get("price") || "2500.50";
  const initialRawPnl = searchParams.get("raw_pnl") || "124.50";
  const initialTime = searchParams.get("time") || new Date().toISOString();
  
  const [side, setSide] = useState(initialSide);
  const [leverage, setLeverage] = useState(initialLeverage);
  const [pnl, setPnl] = useState(initialPnl);
  const [price, setPrice] = useState(initialPrice);
  const [rawPnl, setRawPnl] = useState(initialRawPnl);
  const [time, setTime] = useState(initialTime);
  
  const pairForImage = pairFromUrl.replace("_", "-");
  const pnlValue = parseFloat(pnl);

  const description = `${pnlValue >= 0 ? "📈" : "📉"} Just ${
    pnlValue >= 0 ? "made" : "took"
  } ${Math.abs(pnlValue).toFixed(2)}% ${
    pnlValue >= 0 ? "profit" : "loss"
  } on ${pairForImage} ${side} ${leverage}x!`;

  const shareUrl = `${
    process.env.NEXT_PUBLIC_BASE_URL
  }/${pairFromUrl}?side=${encodeURIComponent(
    side
  )}&leverage=${encodeURIComponent(leverage)}&pnl=${encodeURIComponent(
    String(pnl)
  )}&price=${encodeURIComponent(price)}&raw_pnl=${encodeURIComponent(
    rawPnl
  )}&time=${encodeURIComponent(time)}`;
  
  const twitterIntent = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    description
  )}&url=${encodeURIComponent(shareUrl)}`;

  // Update URL when inputs change
  const updateUrl = (newSide: string, newLeverage: string, newPnl: string, newPrice: string, newRawPnl: string, newTime: string) => {
    const params = new URLSearchParams();
    params.set("side", newSide);
    params.set("leverage", newLeverage);
    params.set("pnl", newPnl);
    params.set("price", newPrice);
    params.set("raw_pnl", newRawPnl);
    params.set("time", newTime);
    
    const newUrl = `/${pairFromUrl}?${params.toString()}`;
    router.push(newUrl);
  };

  // Handle input changes
  const handleSideChange = (value: string) => {
    setSide(value.toUpperCase());
    updateUrl(value.toUpperCase(), leverage, pnl, price, rawPnl, time);
  };

  const handleLeverageChange = (value: string) => {
    setLeverage(value);
    updateUrl(side, value, pnl, price, rawPnl, time);
  };

  const handlePnlChange = (value: string) => {
    setPnl(value);
    updateUrl(side, leverage, value, price, rawPnl, time);
  };

  const handlePriceChange = (value: string) => {
    setPrice(value);
    updateUrl(side, leverage, pnl, value, rawPnl, time);
  };

  const handleRawPnlChange = (value: string) => {
    setRawPnl(value);
    updateUrl(side, leverage, pnl, price, value, time);
  };

  const handleTimeChange = (value: string) => {
    setTime(value);
    updateUrl(side, leverage, pnl, price, rawPnl, value);
  };

  // Set current time
  const setCurrentTime = () => {
    const currentTime = new Date().toISOString();
    setTime(currentTime);
    updateUrl(side, leverage, pnl, price, rawPnl, currentTime);
  };

  return (
    <main className="container">
      <div className="card">
        <h1 className="text-2xl font-bold mb-2">{pairFromUrl}</h1>
        <p className="mb-6">
          <small className="muted">
            This page sets OpenGraph/Twitter metadata and points to a dynamic
            image at <code>/api/og</code>. Change the inputs below to update the URL parameters.
          </small>
        </p>

        <div className="grid">
          <div>
            <div className="label">Side</div>
            <input 
              className="input" 
              value={side} 
              onChange={(e) => handleSideChange(e.target.value)}
              placeholder="BUY or SELL"
            />
          </div>
          <div>
            <div className="label">Leverage</div>
            <input 
              className="input" 
              value={leverage} 
              onChange={(e) => handleLeverageChange(e.target.value)}
              placeholder="10"
            />
          </div>
          <div>
            <div className="label">PnL %</div>
            <input 
              className="input" 
              value={pnl} 
              onChange={(e) => handlePnlChange(e.target.value)}
              placeholder="12.45"
            />
          </div>
          <div>
            <div className="label">Price</div>
            <input 
              className="input" 
              value={price} 
              onChange={(e) => handlePriceChange(e.target.value)}
              placeholder="2500.50"
            />
          </div>
          <div>
            <div className="label">Raw PnL</div>
            <input 
              className="input" 
              value={rawPnl} 
              onChange={(e) => handleRawPnlChange(e.target.value)}
              placeholder="124.50"
            />
          </div>
          <div>
            <div className="label">Time</div>
            <div className="flex gap-2">
              <input 
                className="input flex-1" 
                value={time} 
                onChange={(e) => handleTimeChange(e.target.value)}
                placeholder="2024-01-01T12:00:00.000Z"
              />
              <button 
                className="button"
                onClick={setCurrentTime}
                type="button"
              >
                Now
              </button>
            </div>
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
            )}&pnl=${encodeURIComponent(String(pnl))}&price=${encodeURIComponent(
              price
            )}&raw_pnl=${encodeURIComponent(rawPnl)}&time=${encodeURIComponent(
              time
            )}&download=1`}
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
            )}&pnl=${encodeURIComponent(String(pnl))}&price=${encodeURIComponent(
              price
            )}&raw_pnl=${encodeURIComponent(rawPnl)}&time=${encodeURIComponent(
              time
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            /api/og?side=...&leverage=...&pair=...&pnl=...&price=...&raw_pnl=...&time=...
          </a>
        </div>
        
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <small className="muted">Current URL parameters:</small>
          <br />
          <code className="text-sm">
            /{pairFromUrl}?side={side}&leverage={leverage}&pnl={pnl}&price={price}&raw_pnl={rawPnl}&time={time}
          </code>
        </div>
      </div>
    </main>
  );
}
