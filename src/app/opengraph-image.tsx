import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'SoloStack — The Solo Founder Toolkit';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f0f17 0%, #1a1a2e 100%)',
        fontFamily: 'sans-serif',
        padding: 80,
      }}
    >
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 40 }}>
        <div style={{
          width: 60,
          height: 60,
          background: '#4f46e5',
          borderRadius: 12,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: 28,
          fontWeight: 'bold',
        }}>S</div>
        <div style={{ color: 'white', fontSize: 42, fontWeight: 'bold', letterSpacing: -1 }}>
          Solo<span style={{ color: '#818cf8' }}>Stack</span>.dev
        </div>
      </div>
      {/* Headline */}
      <div style={{
        color: 'white',
        fontSize: 52,
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: 1.2,
        maxWidth: 900,
        marginBottom: 24,
      }}>
        The opinionated toolkit for builders who ship alone.
      </div>
      {/* Subtext */}
      <div style={{
        color: '#9ca3af',
        fontSize: 26,
        textAlign: 'center',
        maxWidth: 700,
      }}>
        200+ tools rated by Solo Score • 12 categories • Free forever
      </div>
    </div>,
    { ...size }
  );
}
