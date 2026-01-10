import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const CLIENT_ID = process.env.GITHUB_OAUTH_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_OAUTH_CLIENT_SECRET;
// Allowed GitHub usernames (comma-separated in env, defaults to EricGrill)
const ALLOWED_USERS = (process.env.ADMIN_GITHUB_USERS || 'EricGrill').split(',').map(u => u.trim().toLowerCase());

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const storedState = request.cookies.get('oauth_state')?.value;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ericgrill.com';

  // Verify state to prevent CSRF
  if (!state || state !== storedState) {
    return NextResponse.redirect(`${siteUrl}/admin-login?error=invalid_state`);
  }

  if (!code) {
    return NextResponse.redirect(`${siteUrl}/admin-login?error=no_code`);
  }

  if (!CLIENT_ID || !CLIENT_SECRET) {
    return NextResponse.redirect(`${siteUrl}/admin-login?error=not_configured`);
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      console.error('[Admin Auth] Token error:', tokenData.error);
      return NextResponse.redirect(`${siteUrl}/admin-login?error=token_failed`);
    }

    const accessToken = tokenData.access_token;

    // Get user info from GitHub
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!userResponse.ok) {
      console.error('[Admin Auth] Failed to get user info');
      return NextResponse.redirect(`${siteUrl}/admin-login?error=user_fetch_failed`);
    }

    const userData = await userResponse.json();
    const username = userData.login?.toLowerCase();

    console.log('[Admin Auth] GitHub user:', username);

    // Check if user is allowed
    if (!ALLOWED_USERS.includes(username)) {
      console.warn('[Admin Auth] Unauthorized user attempted login:', username);
      return NextResponse.redirect(`${siteUrl}/admin-login?error=unauthorized`);
    }

    // Create a secure session token
    const sessionToken = crypto.randomBytes(32).toString('hex');
    const sessionData = JSON.stringify({
      username: userData.login,
      id: userData.id,
      created: Date.now(),
    });

    // Set auth cookie
    const response = NextResponse.redirect(`${siteUrl}/admin`);

    // Clear OAuth state cookie
    response.cookies.delete('oauth_state');

    // Set admin auth cookie with session info
    response.cookies.set('admin_auth', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });

    // Store username for display
    response.cookies.set('admin_user', userData.login, {
      httpOnly: false, // Allow client-side read for display
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24,
      path: '/',
    });

    console.log('[Admin Auth] Login successful for:', username);

    return response;
  } catch (error) {
    console.error('[Admin Auth] Error:', error);
    return NextResponse.redirect(`${siteUrl}/admin-login?error=auth_failed`);
  }
}
