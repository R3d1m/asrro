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

    // Send automated confirmation email via Nodemailer (awaited so serverless execution doesn't terminate before dispatch)
    let emailResult = { success: false, message: "Email dispatch bypassed" };
    try {
      emailResult = await sendMembershipConfirmationEmail({
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        studentId: studentId.trim(),
        department: department.trim(),
        batch: batch.trim(),
        subteam: subteam.trim(),
      });

      if (emailResult.success) {
        await query(
          `UPDATE membership_applications SET email_status = 'confirmation_sent', email_sent_at = CURRENT_TIMESTAMP WHERE id = $1`,
          [applicationId]
        );
      } else {
        await query(
          `UPDATE membership_applications SET email_status = $1 WHERE id = $2`,
          [emailResult.message.slice(0, 140), applicationId]
        );
      }
    } catch (err: any) {
      console.error("Email dispatch caught error:", err);
      emailResult = { success: false, message: err?.message || "Email dispatch failed" };
    }

    return NextResponse.json({
      success: true,
      applicationId,
      emailSent: emailResult.success,
      emailMessage: emailResult.message,
      message: "Membership application successfully submitted!",
    });
  } catch (error: any) {
    console.error("Membership Application Error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error submitting application." },
      { status: 500 }
    );
  }
}
