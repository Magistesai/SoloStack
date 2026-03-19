import { NextResponse } from 'next/server';
import { tools } from '@/lib/data';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const tool = tools.find(t => t.slug === slug);

  if (!tool) {
    return NextResponse.redirect(new URL('/tools', request.url), 302);
  }

  // Future: log click event here (e.g., to Supabase, Plausible event, etc.)

  return NextResponse.redirect(tool.affiliateUrl, 302);
}

// Generate static params so this works as a static export if needed
export async function generateStaticParams() {
  const { tools } = await import('@/lib/data');
  return tools.map(t => ({ slug: t.slug }));
}
