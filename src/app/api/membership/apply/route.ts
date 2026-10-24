import { NextResponse } from "next/server";
import { query, initDb } from "@/lib/db";
import { sendMembershipConfirmationEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    await initDb();
    const body = await request.json();
    const {
      fullName,
      studentId,
      department,
      batch,
      email,
      phone,
      subteam,
      skills = "",
      motivation = "",
    } = body;

    if (!fullName || !studentId || !department || !batch || !email || !phone || !subteam) {
      return NextResponse.json(
        { error: "Please provide all required fields." },
        { status: 400 }
      );
    }

    const inserted = await query<{ id: number }>(
      `INSERT INTO membership_applications 
       (full_name, student_id, department, batch, email, phone, subteam, skills, motivation, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'pending')
       RETURNING id`,
      [
        fullName.trim(),
        studentId.trim(),
        department.trim(),
        batch.trim(),
        email.trim().toLowerCase(),
        phone.trim(),
        subteam.trim(),
        skills.trim(),
        motivation.trim(),
      ]
    );

    const applicationId = inserted[0]?.id;

    // Send automated email via Nodemailer (runs asynchronously without blocking response failure)
    sendMembershipConfirmationEmail({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      studentId: studentId.trim(),
      department: department.trim(),
      batch: batch.trim(),
      subteam: subteam.trim(),
    }).catch((err) => console.error("Email dispatch background error:", err));

    return NextResponse.json({
      success: true,
      applicationId,
      message: "Membership application successfully submitted! A confirmation email has been dispatched.",
    });
  } catch (error: any) {
    console.error("Membership Application Error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error submitting application." },
      { status: 500 }
    );
  }
}
