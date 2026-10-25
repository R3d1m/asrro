import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { verifySmtpConnection, isEmailConfigured } from "@/lib/email";

export async function GET() {
  try {
    const session = await requireAuth(["committee", "admin"]);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const verification = await verifySmtpConnection();
    return NextResponse.json({
      configured: isEmailConfigured(),
      ...verification,
    });
  } catch (error: any) {
    console.error("SMTP Test Error:", error);
    return NextResponse.json({ error: error?.message || "Internal server error" }, { status: 500 });
  }
}
