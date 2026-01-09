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
      const errorMsg = tokenData.error_description || tokenData.error;
      return new NextResponse(
        `<!DOCTYPE html>
<html><head><title>Auth</title></head><body>
<script>
(function() {
  var msg = "authorization:github:error:" + ${JSON.stringify(errorMsg)};
  if (window.opener) {
    window.opener.postMessage(msg, "*");
  }
  window.close();
})();
</script>
</body></html>`,
        { headers: { "Content-Type": "text/html" } }
      );
    }

    // Send token back to CMS in Decap's expected format
    const token = tokenData.access_token;
    return new NextResponse(
      `<!DOCTYPE html>
<html><head><title>Auth</title></head><body>
<script>
(function() {
  var token = ${JSON.stringify(token)};
  var data = JSON.stringify({ token: token, provider: "github" });
  var msg = "authorization:github:success:" + data;
  if (window.opener) {
    window.opener.postMessage(msg, "*");
  }
  window.close();
})();
</script>
</body></html>`,
      { headers: { "Content-Type": "text/html" } }
    );
  } catch (error) {
    return new NextResponse(
      `<!DOCTYPE html>
<html><head><title>Auth</title></head><body>
<script>
(function() {
  var msg = "authorization:github:error:Authentication failed";
  if (window.opener) {
    window.opener.postMessage(msg, "*");
  }
  window.close();
})();
</script>
</body></html>`,
      { headers: { "Content-Type": "text/html" } }
    );
  }
}
