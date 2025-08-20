import Link from 'next/link';

export default function Home() {
  return (
    <main className="container">
      <div className="card">
        <h1 className="text-3xl font-bold mb-2">Twitter OG Demo</h1>
        <p className="mb-6">This demo shows a dynamic OpenGraph image via <code>/api/og</code> and a Twitter share button.</p>
        <div className="grid">
          <div>
            <h3>ETH_USD Example</h3>
            <p className="mb-2"><small className="muted">Visit the pair page and click "Share on Twitter".</small></p>
            <Link className="button" href="/ETH_USD">Open ETH_USD page</Link>
          </div>
          <div>
            <h3>BTC_USDT Example</h3>
            <p className="mb-2"><small className="muted">Uses same dynamic OG image route.</small></p>
            <Link className="button" href="/BTC_USDT">Open BTC_USDT page</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
