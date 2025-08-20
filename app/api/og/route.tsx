import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const side = (searchParams.get('side') || 'BUY').toUpperCase();
  const leverage = searchParams.get('leverage') || '10';
  const pair = searchParams.get('pair') || 'BTC-USDT';
  const pnl = parseFloat(searchParams.get('pnl') || '12.45');

  const color = pnl >= 0 ? '#20DB74' : '#FF7D5D';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '64px',
          background: '#000',
          color: '#fff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display:'flex', gap:12, alignItems:'center', fontSize: 42, fontWeight: 700 }}>
          <span style={{ color }}>{side}</span>
          <span style={{ opacity:.5 }}>•</span>
          <span style={{ opacity:.9 }}>{leverage}x</span>
          <span style={{ opacity:.5 }}>•</span>
          <span style={{ opacity:.9 }}>{pair}</span>
        </div>

        <div style={{ height: 28 }} />

        <div style={{ fontSize: 92, fontWeight: 800, color }}>{pnl.toFixed(2)}%</div>
        <div style={{ opacity:.6, fontSize: 24 }}>
          {pnl >= 0 ? 'Profit' : 'Loss'} on {pair} {side} {leverage}x
        </div>

        <div style={{ position:'absolute', right: 48, bottom: 40, opacity:.4, fontSize: 22 }}>
          twitter-og-demo
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
