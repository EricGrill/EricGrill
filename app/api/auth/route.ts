import { NextRequest, NextResponse } from "next/server";

const CLIENT_ID = process.env.GITHUB_OAUTH_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_OAUTH_CLIENT_SECRET;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    // Redirect to GitHub OAuth
    const redirectUri = `${process.env.NEXT_PUBLIC_SITE_URL || "https://ericgrill.com"}/api/auth`;
    const scope = "repo,user";
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}`;
    return NextResponse.redirect(authUrl);
  }

  // Exchange code for token
  try {
    const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      return new NextResponse(
        `<html><body><script>
          window.opener.postMessage(
            "authorization:github:error:${tokenData.error_description || tokenData.error}",
            window.opener.location.origin
          );
          window.close();
        </script></body></html>`,
        { headers: { "Content-Type": "text/html" } }
      );
    }

    // Send token back to CMS in Decap's expected format
    const message = JSON.stringify({ token: tokenData.access_token, provider: "github" });
    return new NextResponse(
      `<html><body><script>
        window.opener.postMessage(
          "authorization:github:success:${message.replace(/"/g, '\\"')}",
          window.opener.location.origin
        );
        window.close();
      </script></body></html>`,
      { headers: { "Content-Type": "text/html" } }
    );
  } catch (error) {
    return new NextResponse(
      `<html><body><script>
        window.opener.postMessage(
          "authorization:github:error:Authentication failed",
          window.opener.location.origin
        );
        window.close();
      </script></body></html>`,
      { headers: { "Content-Type": "text/html" } }
    );
  }
}
