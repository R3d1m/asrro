import { NextResponse } from "next/server";
import { query, initDb } from "@/lib/db";
import { requireAuth } from "@/lib/auth";
import { sendDecisionEmail } from "@/lib/email";

export async function GET(request: Request) {
  try {
    const session = await requireAuth(["committee", "admin"]);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    await initDb();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    let sql = `SELECT * FROM membership_applications ORDER BY created_at DESC`;
    let params: any[] = [];

    if (status && ["pending", "approved", "rejected"].includes(status)) {
      sql = `SELECT * FROM membership_applications WHERE status = $1 ORDER BY created_at DESC`;
      params = [status];
    }

    const applications = await query(sql, params);
    return NextResponse.json({ success: true, applications });
  } catch (error: any) {
    console.error("Fetch Applications Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to fetch applications." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await requireAuth(["committee", "admin"]);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    await initDb();
    const body = await request.json();
    const { 
      id, 
      status, 
      reviewNotes,
      sendEmail = false,
      emailSubject,
      emailBody
    } = body;

    if (!id || !["pending", "approved", "rejected"].includes(status)) {
      return NextResponse.json(
        { error: "Valid ID and status (pending, approved, rejected) are required." },
        { status: 400 }
      );
    }

    const targetRows = await query(`SELECT * FROM membership_applications WHERE id = $1`, [id]);
    if (targetRows.length === 0) {
      return NextResponse.json({ error: "Application not found." }, { status: 404 });
    }
    const applicant = targetRows[0];

    let emailDispatched = false;
    let emailStatusNote = applicant.email_status;
    let emailErrorMessage = "";

    if (sendEmail) {
      const emailResult = await sendDecisionEmail({
        recipientName: applicant.full_name,
        recipientEmail: applicant.email,
        studentId: applicant.student_id,
        department: applicant.department,
        batch: applicant.batch,
        subteam: applicant.subteam,
        status: status as "approved" | "rejected",
        customSubject: emailSubject,
        customMessage: emailBody,
      });

      if (emailResult.success) {
        emailDispatched = true;
        emailStatusNote = `${status}_email_sent`;
      } else {
        emailErrorMessage = emailResult.message;
        emailStatusNote = `email_error: ${emailResult.message.slice(0, 100)}`;
      }
    }

    const updated = await query(
      `UPDATE membership_applications 
       SET status = $1, 
           review_notes = $2, 
           reviewed_by = $3, 
           email_status = $4,
           email_sent_at = CASE WHEN $5::boolean THEN CURRENT_TIMESTAMP ELSE email_sent_at END,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $6
       RETURNING *`,
      [status, reviewNotes || null, session.name, emailStatusNote, emailDispatched, id]
    );

    return NextResponse.json({
      success: true,
      application: updated[0],
      emailDispatched,
      emailError: emailErrorMessage || undefined,
      message: `Application marked as ${status}.${
        sendEmail 
          ? emailDispatched 
            ? ` Official decision email dispatched to ${applicant.email}.`
            : ` Notice: Status updated, but email dispatch failed (${emailErrorMessage}).`
          : ""
      }`,
    });
  } catch (error: any) {
    console.error("Update Application Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to update application." },
      { status: 500 }
    );
  }
}

/**
 * Direct email trigger endpoint to resend/send a custom email to an applicant at any time.
 */
export async function POST(request: Request) {
  try {
    const session = await requireAuth(["committee", "admin"]);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    await initDb();
    const body = await request.json();
    const { id, subject, message } = body;

    if (!id || !subject || !message) {
      return NextResponse.json(
        { error: "Application ID, subject, and message are required." },
        { status: 400 }
      );
    }

    const targetRows = await query(`SELECT * FROM membership_applications WHERE id = $1`, [id]);
    if (targetRows.length === 0) {
      return NextResponse.json({ error: "Application not found." }, { status: 404 });
    }
    const applicant = targetRows[0];

    const emailResult = await sendDecisionEmail({
      recipientName: applicant.full_name,
      recipientEmail: applicant.email,
      studentId: applicant.student_id,
      department: applicant.department,
      batch: applicant.batch,
      subteam: applicant.subteam,
      status: (applicant.status as "approved" | "rejected") || "approved",
      customSubject: subject,
      customMessage: message,
    });

    if (emailResult.success) {
      const updated = await query(
        `UPDATE membership_applications 
         SET email_status = 'custom_email_sent',
             email_sent_at = CURRENT_TIMESTAMP,
             updated_at = CURRENT_TIMESTAMP
         WHERE id = $1
         RETURNING *`,
        [id]
      );

      return NextResponse.json({
        success: true,
        application: updated[0],
        message: `Official email successfully delivered to ${applicant.email}.`,
      });
    } else {
      return NextResponse.json(
        { 
          success: false, 
          error: `Email delivery failed: ${emailResult.message}`,
        },
        { status: 502 }
      );
    }
  } catch (error: any) {
    console.error("Direct Email Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to dispatch email." },
      { status: 500 }
    );
  }
}
