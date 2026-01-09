import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // TODO: Integrate with email service (Resend, SendGrid, etc.)
    // For now, just log and return success
    console.log("Contact form submission:", { name, email, message });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
