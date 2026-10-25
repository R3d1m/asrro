import nodemailer from "nodemailer";

export interface ApplicantEmailData {
  fullName: string;
  email: string;
  studentId: string;
  department: string;
  batch: string;
  subteam: string;
}

export interface DecisionEmailOptions {
  recipientName: string;
  recipientEmail: string;
  studentId: string;
  department: string;
  batch: string;
  subteam: string;
  status: "approved" | "rejected";
  customSubject?: string;
  customMessage?: string;
}

export interface EmailDispatchResult {
  success: boolean;
  message: string;
  error?: string;
}

export function isEmailConfigured(): boolean {
  return Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);
}

function getTransporter() {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = parseInt(process.env.SMTP_PORT || "465", 10);
  const user = process.env.SMTP_USER?.trim();
  // Strip spaces in case user copied "abcd efgh ijkl mnop" format from Google App Passwords
  const pass = process.env.SMTP_PASS?.replace(/\s+/g, "");

  if (!user || !pass) return null;

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
    // Useful for serverless socket connection timeouts
    connectionTimeout: 8000,
    greetingTimeout: 8000,
  });
}

/**
 * Diagnostic utility to test whether SMTP credentials are accepted by the server.
 */
export async function verifySmtpConnection(): Promise<{ ok: boolean; message: string; user?: string }> {
  if (!isEmailConfigured()) {
    return {
      ok: false,
      message: "SMTP is not configured. Please set SMTP_USER and SMTP_PASS in Vercel Environment Variables.",
    };
  }

  const transporter = getTransporter();
  if (!transporter) {
    return {
      ok: false,
      message: "Unable to create nodemailer transport with provided credentials.",
    };
  }

  try {
    await transporter.verify();
    return {
      ok: true,
      message: `Successfully connected and authenticated with SMTP server for ${process.env.SMTP_USER}.`,
      user: process.env.SMTP_USER,
    };
  } catch (error: any) {
    console.error("SMTP Verification Failure:", error);
    return {
      ok: false,
      message: error?.message || "Failed to verify SMTP credentials.",
    };
  }
}

/**
 * Dispatches confirmation receipt to student upon initial /join form submission.
 */
export async function sendMembershipConfirmationEmail(applicant: ApplicantEmailData): Promise<EmailDispatchResult> {
  const transporter = getTransporter();
  const fromAddress = process.env.SMTP_FROM || `"${process.env.SMTP_FROM_NAME || "ASRRO CUET"}" <${process.env.SMTP_USER || "asrro@cuet.ac.bd"}>`;

  if (!transporter) {
    const note = "SMTP credentials (SMTP_USER / SMTP_PASS) not configured in Vercel.";
    console.log(`📧 [MOCK EMAIL DISPATCH] To: ${applicant.email} | Subject: Membership Application Received — ASRRO CUET (${note})`);
    return {
      success: false,
      message: "Mock dispatch: SMTP credentials are not configured in Vercel settings.",
      error: "NOT_CONFIGURED",
    };
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #070e14; color: #ffffff; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background-color: #09151f; border: 1px solid #06b6d4; border-radius: 8px; overflow: hidden; }
        .header { background: linear-gradient(135deg, #070e14 0%, #0e2a3a 100%); padding: 32px 24px; border-bottom: 2px solid #06b6d4; text-align: center; }
        .logo-text { font-size: 24px; font-weight: 900; letter-spacing: 2px; color: #ffffff; text-transform: uppercase; margin: 0; }
        .badge { display: inline-block; font-size: 11px; font-family: monospace; font-weight: bold; background-color: #06b6d4; color: #000000; padding: 4px 10px; margin-top: 8px; text-transform: uppercase; letter-spacing: 1px; }
        .content { padding: 32px 24px; color: #d1d5db; line-height: 1.6; }
        .greeting { font-size: 18px; color: #ffffff; font-weight: bold; margin-bottom: 16px; }
        .card { background-color: #070e14; border: 1px solid #1e293b; padding: 18px; border-radius: 6px; margin: 20px 0; font-family: monospace; font-size: 13px; }
        .card-row { margin-bottom: 6px; }
        .card-label { color: #94a3b8; text-transform: uppercase; font-size: 11px; }
        .card-value { color: #06b6d4; font-weight: bold; }
        .steps { background-color: #0c1824; border-left: 3px solid #06b6d4; padding: 16px; margin: 24px 0; border-radius: 4px; font-size: 13px; }
        .steps-title { color: #06b6d4; font-weight: bold; margin-bottom: 8px; font-family: monospace; text-transform: uppercase; }
        .footer { padding: 24px; text-align: center; font-size: 12px; color: #64748b; font-family: monospace; border-top: 1px solid #1e293b; }
        .footer-link { color: #06b6d4; text-decoration: none; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 class="logo-text">ASRRO CUET</h1>
          <span class="badge">APPLICATION TELEMETRY RECORDED</span>
        </div>
        
        <div class="content">
          <div class="greeting">Greetings, ${applicant.fullName}!</div>
          
          <p>Thank you for submitting your recruitment application to join the <strong>Andromeda Space & Robotics Research Organization (ASRRO)</strong> at Chittagong University of Engineering & Technology (CUET).</p>
          
          <p>Your application dossier has been safely logged in our central admissions database and is awaiting Executive Committee review.</p>
          
          <div class="card">
            <div style="font-weight: bold; color: #ffffff; margin-bottom: 12px; text-transform: uppercase; font-size: 11px; letter-spacing: 1px; border-bottom: 1px solid #1e293b; padding-bottom: 4px;">// Application Dossier Snapshot</div>
            <div class="card-row"><span class="card-label">Applicant Name:</span> <span class="card-value">${applicant.fullName}</span></div>
            <div class="card-row"><span class="card-label">Student ID:</span> <span class="card-value">${applicant.studentId}</span></div>
            <div class="card-row"><span class="card-label">Department:</span> <span class="card-value">${applicant.department} (Batch '${applicant.batch})</span></div>
            <div class="card-row"><span class="card-label">Preferred Subteam:</span> <span class="card-value">${applicant.subteam}</span></div>
            <div class="card-row"><span class="card-label">Review Status:</span> <span class="card-value" style="color: #38bdf8;">PENDING COMMITTEE APPROVAL</span></div>
          </div>
          
          <div class="steps">
            <div class="steps-title">// What Happens Next:</div>
            <ol style="margin: 0; padding-left: 20px; color: #94a3b8;">
              <li style="margin-bottom: 8px;"><strong style="color: #ffffff;">Executive Review:</strong> Wing leads review your subteam preference and motivation statement.</li>
              <li style="margin-bottom: 8px;"><strong style="color: #ffffff;">Official Acceptance Email:</strong> Upon committee approval, you will receive an official decision email with interview schedule & orientation details.</li>
              <li><strong style="color: #ffffff;">Fleet Onboarding:</strong> Admitted recruits will be formally inducted into active research projects.</li>
            </ol>
          </div>
          
          <p style="font-size: 13px; color: #94a3b8;">For queries, contact us at <a href="mailto:asrro@cuet.ac.bd" style="color: #06b6d4;">asrro@cuet.ac.bd</a>.</p>
        </div>
        
        <div class="footer">
          <div>Andromeda Space & Robotics Research Organization</div>
          <div>Chittagong University of Engineering & Technology (CUET), Raozan, Bangladesh</div>
          <div style="margin-top: 10px;">
            <a href="https://asrro-cuet.vercel.app" class="footer-link">Official Portal</a> • 
            <a href="mailto:asrro@cuet.ac.bd" class="footer-link">asrro@cuet.ac.bd</a>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: fromAddress,
      to: applicant.email,
      subject: "Application Received: Welcome to ASRRO CUET Recruitment",
      html: htmlContent,
    });
    console.log(`✅ Automated confirmation email dispatched to ${applicant.email}`);
    return { success: true, message: `Email dispatched to ${applicant.email}` };
  } catch (error: any) {
    console.error("❌ Failed to send confirmation email:", error);
    return {
      success: false,
      message: error?.message || "Failed to send confirmation email via SMTP.",
      error: error?.code || error?.message,
    };
  }
}

/**
 * Dispatches the official approval or decision email customized by the Admin.
 */
export async function sendDecisionEmail(options: DecisionEmailOptions): Promise<EmailDispatchResult> {
  const transporter = getTransporter();
  const fromAddress = process.env.SMTP_FROM || `"${process.env.SMTP_FROM_NAME || "ASRRO CUET"}" <${process.env.SMTP_USER || "asrro@cuet.ac.bd"}>`;

  if (!transporter) {
    const errorMsg = "SMTP credentials (SMTP_USER / SMTP_PASS) are not configured in Vercel.";
    console.warn("⚠️ [EMAIL NOT CONFIGURED]", errorMsg);
    return { success: false, message: errorMsg, error: "NOT_CONFIGURED" };
  }

  const isApproved = options.status === "approved";
  const defaultSubject = isApproved
    ? "Congratulations! Your ASRRO CUET Membership Application Has Been Approved"
    : "Update Regarding Your ASRRO CUET Recruitment Application";

  const subject = options.customSubject?.trim() || defaultSubject;

  // Build high-impact branded HTML email
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #070e14; color: #ffffff; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background-color: #09151f; border: 1px solid ${isApproved ? "#06b6d4" : "#64748b"}; border-radius: 8px; overflow: hidden; }
        .header { background: linear-gradient(135deg, #070e14 0%, #0e2a3a 100%); padding: 30px 24px; border-bottom: 2px solid ${isApproved ? "#06b6d4" : "#64748b"}; text-align: center; }
        .logo-text { font-size: 24px; font-weight: 900; letter-spacing: 2px; color: #ffffff; text-transform: uppercase; margin: 0; }
        .badge { display: inline-block; font-size: 11px; font-family: monospace; font-weight: bold; background-color: ${isApproved ? "#06b6d4" : "#475569"}; color: ${isApproved ? "#000000" : "#ffffff"}; padding: 4px 10px; margin-top: 8px; text-transform: uppercase; letter-spacing: 1px; }
        .content { padding: 30px 24px; color: #e2e8f0; line-height: 1.6; }
        .greeting { font-size: 18px; color: #ffffff; font-weight: bold; margin-bottom: 14px; }
        .card { background-color: #070e14; border: 1px solid #1e293b; padding: 16px; border-radius: 6px; margin: 18px 0; font-family: monospace; font-size: 13px; }
        .card-row { margin-bottom: 6px; }
        .card-label { color: #94a3b8; text-transform: uppercase; font-size: 11px; }
        .card-value { color: ${isApproved ? "#06b6d4" : "#cbd5e1"}; font-weight: bold; }
        .custom-body { background-color: #0c1824; border-left: 3px solid ${isApproved ? "#06b6d4" : "#94a3b8"}; padding: 16px; border-radius: 4px; font-size: 13px; color: #f1f5f9; white-space: pre-wrap; line-height: 1.6; }
        .footer { padding: 20px; text-align: center; font-size: 11px; color: #64748b; font-family: monospace; border-top: 1px solid #1e293b; }
        .footer-link { color: #06b6d4; text-decoration: none; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 class="logo-text">ASRRO CUET</h1>
          <span class="badge">${isApproved ? "OFFICIAL RECRUITMENT ACCEPTANCE" : "RECRUITMENT APPLICATION UPDATE"}</span>
        </div>
        
        <div class="content">
          <div class="greeting">Dear ${options.recipientName},</div>

          ${
            options.customMessage
              ? `<div class="custom-body">${options.customMessage.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>`
              : `<p>We are delighted to confirm that your application for recruitment to the <strong>Andromeda Space & Robotics Research Organization (ASRRO)</strong> at CUET has been evaluated and <strong>${isApproved ? "APPROVED" : "REVIEWED"}</strong> by the Executive Committee.</p>`
          }
          
          <div class="card">
            <div style="font-weight: bold; color: #ffffff; margin-bottom: 10px; text-transform: uppercase; font-size: 11px; letter-spacing: 1px; border-bottom: 1px solid #1e293b; padding-bottom: 4px;">// Dossier Specifications</div>
            <div class="card-row"><span class="card-label">Recruit Name:</span> <span class="card-value">${options.recipientName}</span></div>
            <div class="card-row"><span class="card-label">Student ID:</span> <span class="card-value">${options.studentId}</span></div>
            <div class="card-row"><span class="card-label">Department:</span> <span class="card-value">${options.department} (Batch '${options.batch})</span></div>
            <div class="card-row"><span class="card-label">Assigned Squad:</span> <span class="card-value">${options.subteam}</span></div>
            <div class="card-row"><span class="card-label">Status:</span> <span class="card-value" style="color: ${isApproved ? "#10b981" : "#ef4444"};">${options.status.toUpperCase()}</span></div>
          </div>

          <p style="font-size: 12px; color: #94a3b8; margin-top: 20px;">
            For inquiries regarding your orientation schedule, reply directly to this email or contact us at <a href="mailto:asrro@cuet.ac.bd" style="color: #06b6d4;">asrro@cuet.ac.bd</a>.
          </p>
        </div>
        
        <div class="footer">
          <div>Andromeda Space & Robotics Research Organization (ASRRO)</div>
          <div>Chittagong University of Engineering & Technology (CUET), Raozan, Bangladesh</div>
          <div style="margin-top: 8px;">
            <a href="https://asrro-cuet.vercel.app" class="footer-link">Official Portal</a> • 
            <a href="mailto:asrro@cuet.ac.bd" class="footer-link">asrro@cuet.ac.bd</a>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: fromAddress,
      to: options.recipientEmail,
      subject: subject,
      html: htmlContent,
      text: options.customMessage || `Greetings ${options.recipientName}, your ASRRO CUET application status is ${options.status}.`,
    });
    console.log(`✅ Official decision email dispatched to ${options.recipientEmail}`);
    return { success: true, message: `Email delivered to ${options.recipientEmail}` };
  } catch (error: any) {
    console.error("❌ Failed to send decision email:", error);
    return {
      success: false,
      message: error?.message || "Failed to send decision email via SMTP.",
      error: error?.code || error?.message,
    };
  }
}

