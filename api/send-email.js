import nodemailer from "nodemailer";
import multer from "multer";
import { IncomingForm } from "formidable";

// Configure CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Helper function to create professional email template
const createEmailTemplate = (data, type) => {
  const isConsultation = type === "consultation";
  const title = isConsultation ? "New Consultation Request" : "New Contact Form Submission";

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f8f9fa; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px 20px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; font-weight: 600; }
        .content { padding: 30px 20px; }
        .field { margin-bottom: 20px; padding: 15px; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #10b981; }
        .field-label { font-weight: 600; color: #059669; margin-bottom: 5px; text-transform: uppercase; font-size: 12px; letter-spacing: 0.5px; }
        .field-value { color: #333; font-size: 16px; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e9ecef; }
        .priority { background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; padding: 10px 20px; border-radius: 25px; display: inline-block; font-weight: 600; margin-bottom: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🌿 Lifelong Wellness</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">${title}</p>
        </div>
        <div class="content">
          ${isConsultation ? '<div class="priority">🚨 PRIORITY: Consultation Request</div>' : ""}
          
          <div class="field">
            <div class="field-label">Full Name</div>
            <div class="field-value">${data.fullName || `${data.name || ""} ${data.surname || ""}`.trim()}</div>
          </div>
          
          <div class="field">
            <div class="field-label">Email Address</div>
            <div class="field-value">${data.email}</div>
          </div>
          
          <div class="field">
            <div class="field-label">Phone Number</div>
            <div class="field-value">${data.phone}</div>
          </div>
          
          ${
            data.consultationType
              ? `
          <div class="field">
            <div class="field-label">Consultation Type</div>
            <div class="field-value">${data.consultationType}</div>
          </div>
          `
              : ""
          }
          
          ${
            data.message
              ? `
          <div class="field">
            <div class="field-label">Message / Health Concerns</div>
            <div class="field-value">${data.message}</div>
          </div>
          `
              : ""
          }
          
          ${
            data.type === "consultation"
              ? `
          <div class="field">
            <div class="field-label">Request Type</div>
            <div class="field-value">50% OFF Consultation Booking</div>
          </div>
          `
              : ""
          }
        </div>
        <div class="footer">
          <p style="margin: 0; color: #6b7280;">
            📧 Received at: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
          </p>
          <p style="margin: 10px 0 0 0; color: #6b7280; font-size: 14px;">
            Please respond within 24 hours for consultation requests
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Helper function for auto-reply email
const createAutoReplyTemplate = (data, type) => {
  const isConsultation = type === "consultation";
  const name = data.fullName || `${data.name || ""} ${data.surname || ""}`.trim();

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank You - Lifelong Wellness</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f8f9fa; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px 20px; text-align: center; }
        .content { padding: 30px 20px; }
        .highlight { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 15px 20px; border-radius: 8px; margin: 20px 0; text-align: center; }
        .contact-info { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e9ecef; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🌿 Lifelong Wellness</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Thank You for Reaching Out!</p>
        </div>
        <div class="content">
          <h2 style="color: #059669; margin-bottom: 20px;">Dear ${name},</h2>
          
          <p>Thank you for your interest in our holistic wellness services! We have received your ${isConsultation ? "consultation request" : "message"} and are excited to help you on your journey to optimal health.</p>
          
          ${
            isConsultation
              ? `
          <div class="highlight">
            <h3 style="margin: 0 0 10px 0;">🎉 Your 50% OFF Consultation is Reserved!</h3>
            <p style="margin: 0;">We'll contact you within 24 hours to schedule your personalized consultation.</p>
          </div>
          `
              : `
          <div class="highlight">
            <h3 style="margin: 0 0 10px 0;">📞 We'll Be In Touch Soon!</h3>
            <p style="margin: 0;">Our team will respond to your inquiry within 2 hours.</p>
          </div>
          `
          }
          
          <h3 style="color: #059669;">What Happens Next?</h3>
          <ul style="padding-left: 20px;">
            <li>Our wellness coordinator will contact you shortly</li>
            <li>We'll discuss your health goals and concerns</li>
            <li>Schedule your ${isConsultation ? "discounted consultation" : "appointment"} at your convenience</li>
            <li>Begin your personalized healing journey</li>
          </ul>
          
          <div class="contact-info">
            <h4 style="color: #059669; margin-bottom: 15px;">📞 Contact Information</h4>
            <p><strong>Phone:</strong> +91 94210 69326</p>
            <p><strong>WhatsApp:</strong> +91 94210 69326 (24x7 Support)</p>
            <p><strong>Email:</strong> meghahshaha@gmail.com</p>
            <p><strong>Working Hours:</strong> Mon-Sat: 9 AM - 7 PM, Sun: 10 AM - 4 PM</p>
          </div>
          
          <p>If you have any urgent questions, please don't hesitate to call or WhatsApp us directly.</p>
          
          <p style="margin-top: 30px;">
            Warm regards,<br>
            <strong>Dr. Megha Shaha</strong><br>
            <em>Holistic Wellness Practitioner</em><br>
            Lifelong Wellness
          </p>
        </div>
        <div class="footer">
          <p style="margin: 0; color: #6b7280; font-size: 14px;">
            This is an automated response. Please do not reply to this email.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Parse form data including files
const parseForm = (req) => {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm({
      maxFileSize: 5 * 1024 * 1024, // 5MB
      allowEmptyFiles: false,
      multiples: false,
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
        return;
      }

      // Convert fields to simple object (formidable returns arrays)
      const parsedFields = {};
      Object.keys(fields).forEach(key => {
        parsedFields[key] = Array.isArray(fields[key]) ? fields[key][0] : fields[key];
      });

      resolve({ fields: parsedFields, files });
    });
  });
};

export default async function handler(req, res) {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return res.status(200).json({ message: "OK" });
  }

  // Set CORS headers
  Object.keys(corsHeaders).forEach(key => {
    res.setHeader(key, corsHeaders[key]);
  });

  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    console.log("📧 Received email request");

    // Parse form data
    const { fields, files } = await parseForm(req);
    const { name, surname, fullName, email, phone, message, consultationType, type } = fields;

    // Validate required fields
    if (!email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Email and phone are required fields",
      });
    }

    // Determine email type
    const emailType = type === "consultation" || consultationType ? "consultation" : "contact";

    // Prepare email data
    const emailData = {
      fullName: fullName || `${name || ""} ${surname || ""}`.trim(),
      email,
      phone,
      message: message || "",
      consultationType: consultationType || "",
      type,
    };

    // Create transporter
    const transporter = createTransporter();

    // Email options for admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: "meghahshaha@gmail.com",
      subject:
        emailType === "consultation"
          ? `🚨 NEW CONSULTATION REQUEST - ${emailData.fullName}`
          : `📧 New Contact Form Submission - ${emailData.fullName}`,
      html: createEmailTemplate(emailData, emailType),
      attachments: [],
    };

    // Add payment screenshot if uploaded
    if (files.paymentScreenshot) {
      const file = Array.isArray(files.paymentScreenshot) 
        ? files.paymentScreenshot[0] 
        : files.paymentScreenshot;
      
      if (file && file.filepath) {
        adminMailOptions.attachments.push({
          filename: `payment-screenshot-${emailData.fullName.replace(/\s+/g, "-")}.${file.originalFilename?.split(".").pop() || "jpg"}`,
          path: file.filepath,
        });
      }
    }

    // Auto-reply email options
    const autoReplyOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject:
        emailType === "consultation"
          ? "🌿 Your Consultation Request Received - Lifelong Wellness"
          : "🌿 Thank You for Contacting Us - Lifelong Wellness",
      html: createAutoReplyTemplate(emailData, emailType),
    };

    // Send admin email
    const adminResult = await transporter.sendMail(adminMailOptions);
    console.log("✅ Admin email sent:", adminResult.messageId);

    // Send auto-reply email
    const autoReplyResult = await transporter.sendMail(autoReplyOptions);
    console.log("✅ Auto-reply sent:", autoReplyResult.messageId);

    res.status(200).json({
      success: true,
      message: "Email sent successfully",
      adminMessageId: adminResult.messageId,
      autoReplyMessageId: autoReplyResult.messageId,
    });
  } catch (error) {
    console.error("❌ Email sending error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send email",
      error: error.message,
    });
  }
}