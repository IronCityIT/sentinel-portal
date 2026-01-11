import { NextRequest, NextResponse } from 'next/server';

// API route to trigger GitHub workflows (server-side to protect PAT)
export async function POST(request: NextRequest) {
  try {
    const { repo, workflow, inputs } = await request.json();
    
    // Get PAT from environment variable (set in Vercel)
    const pat = process.env.GITHUB_PAT;
    
    if (!pat) {
      return NextResponse.json(
        { error: 'GitHub PAT not configured' },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://api.github.com/repos/${repo}/actions/workflows/${workflow}/dispatches`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${pat}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ref: 'main',
          inputs: inputs
        })
      }
    );

    if (response.status === 204 || response.ok) {
      return NextResponse.json({ success: true });
    } else {
      const error = await response.json().catch(() => ({ message: 'Unknown error' }));
      return NextResponse.json(
        { error: error.message || response.statusText },
        { status: response.status }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
