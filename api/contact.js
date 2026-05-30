import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Allow only POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` });
  }

  const { name, email, subject, message } = req.body;

  // Basic validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: 'Invalid email address' });
  }

  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT, 10) || 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.SMTP_TO || 'bereket2553@gmail.com';

  // Check if SMTP environment variables are set
  if (!host || !user || !pass) {
    console.error('SMTP configuration missing in environment variables');
    return res.status(500).json({ 
      success: false, 
      message: 'Email service configuration error. Please contact the administrator.' 
    });
  }

  // Configure Nodemailer transporter
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for other ports (using STARTTLS)
    auth: {
      user,
      pass,
    },
    tls: {
      // Do not fail on invalid certs (common for custom domain email providers)
      rejectUnauthorized: false
    }
  });

  // Construct a premium HTML email template with matching portfolio colors (#00d4aa)
  const mailOptions = {
    from: `"${name} (Portfolio)" <${user}>`,
    to,
    replyTo: email,
    subject: `Portfolio Contact: ${subject}`,
    text: `New contact form submission from your portfolio website.\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Portfolio Message</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              color: #2d3436;
              background-color: #fafafa;
              margin: 0;
              padding: 0;
              line-height: 1.6;
            }
            .container {
              max-width: 600px;
              margin: 30px auto;
              background: #ffffff;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 8px 30px rgba(0,0,0,0.05);
              border: 1px solid #e0e0e0;
            }
            .header {
              background: #0a0a0f;
              padding: 30px 40px;
              text-align: center;
              border-bottom: 3px solid #00d4aa;
            }
            .header h1 {
              color: #ffffff;
              font-size: 24px;
              margin: 0;
              font-weight: 600;
              letter-spacing: 0.5px;
            }
            .header span {
              color: #00d4aa;
            }
            .content {
              padding: 40px;
            }
            .field-group {
              margin-bottom: 25px;
              border-bottom: 1px dashed #e0e0e0;
              padding-bottom: 15px;
            }
            .field-group:last-child {
              border-bottom: none;
              padding-bottom: 0;
              margin-bottom: 0;
            }
            .field-label {
              font-size: 12px;
              text-transform: uppercase;
              letter-spacing: 1px;
              color: #636e72;
              font-weight: 600;
              margin-bottom: 6px;
            }
            .field-value {
              font-size: 16px;
              color: #2d3436;
              font-weight: 500;
            }
            .message-box {
              background-color: #f0f0f0;
              border-left: 4px solid #00d4aa;
              padding: 20px;
              border-radius: 4px;
              margin-top: 10px;
              font-size: 15px;
              color: #2d3436;
              white-space: pre-wrap;
            }
            .footer {
              background: #f0f0f0;
              padding: 20px 40px;
              text-align: center;
              font-size: 12px;
              color: #636e72;
              border-top: 1px solid #e0e0e0;
            }
            .footer a {
              color: #00d4aa;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Bereket<span>Sahlemariam</span> Portfolio</h1>
            </div>
            <div class="content">
              <div class="field-group">
                <div class="field-label">Sender Name</div>
                <div class="field-value">${name}</div>
              </div>
              <div class="field-group">
                <div class="field-label">Sender Email</div>
                <div class="field-value"><a href="mailto:${email}" style="color: #6c5ce7; text-decoration: none;">${email}</a></div>
              </div>
              <div class="field-group">
                <div class="field-label">Subject</div>
                <div class="field-value">${subject}</div>
              </div>
              <div class="field-group" style="border: none;">
                <div class="field-label">Message</div>
                <div class="message-box">${message}</div>
              </div>
            </div>
            <div class="footer">
              This email was automatically generated and sent from your <a href="https://bereket-shalemariam-personal-portfolio.vercel.app/" target="_blank">Portfolio Website Contact Form</a>.
            </div>
          </div>
        </body>
      </html>
    `
  };

  // Construct a premium Auto-Reply HTML email template to send to the visitor
  const autoReplyOptions = {
    from: `"Bereket Sahlemariam" <${user}>`,
    to: email,
    subject: `Thank you for reaching out! - Bereket Sahlemariam`,
    text: `Hi ${name},\n\nThank you for reaching out! I have successfully received your message regarding: "${subject}".\n\nI will review it and get back to you as soon as possible.\n\nBest regards,\nBereket Sahlemariam\nFull Stack Developer`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thank You for Contacting Me</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              color: #2d3436;
              background-color: #fafafa;
              margin: 0;
              padding: 0;
              line-height: 1.6;
            }
            .container {
              max-width: 600px;
              margin: 30px auto;
              background: #ffffff;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 8px 30px rgba(0,0,0,0.05);
              border: 1px solid #e0e0e0;
            }
            .header {
              background: #0a0a0f;
              padding: 30px 40px;
              text-align: center;
              border-bottom: 3px solid #00d4aa;
            }
            .header h1 {
              color: #ffffff;
              font-size: 24px;
              margin: 0;
              font-weight: 600;
              letter-spacing: 0.5px;
            }
            .header span {
              color: #00d4aa;
            }
            .content {
              padding: 40px;
            }
            .greeting {
              font-size: 18px;
              font-weight: 600;
              margin-bottom: 15px;
              color: #0a0a0f;
            }
            .body-text {
              font-size: 15px;
              color: #2d3436;
              margin-bottom: 25px;
            }
            .message-summary {
              background-color: #f9f9fb;
              border: 1px solid #e0e0e0;
              border-radius: 8px;
              padding: 20px;
              margin-bottom: 30px;
            }
            .summary-title {
              font-size: 13px;
              text-transform: uppercase;
              letter-spacing: 0.8px;
              color: #636e72;
              font-weight: 600;
              margin-bottom: 10px;
              border-bottom: 1px solid #e8e8e8;
              padding-bottom: 8px;
            }
            .summary-subject {
              font-weight: 600;
              color: #2d3436;
              margin-bottom: 8px;
            }
            .summary-message {
              font-style: italic;
              color: #636e72;
              font-size: 14px;
              white-space: pre-wrap;
            }
            .btn-wrapper {
              text-align: center;
              margin-bottom: 35px;
            }
            .btn {
              display: inline-block;
              background-color: #0a0a0f;
              color: #ffffff;
              padding: 12px 25px;
              border-radius: 6px;
              font-weight: 600;
              text-decoration: none;
              font-size: 14px;
              border-bottom: 2px solid #00d4aa;
              transition: transform 0.2s;
            }
            .sign-off {
              font-size: 15px;
              border-top: 1px solid #e8e8e8;
              padding-top: 20px;
              color: #2d3436;
            }
            .footer {
              background: #f0f0f0;
              padding: 25px 40px;
              text-align: center;
              font-size: 12px;
              color: #636e72;
              border-top: 1px solid #e0e0e0;
            }
            .social-links {
              margin-top: 10px;
            }
            .social-links a {
              color: #00d4aa;
              text-decoration: none;
              margin: 0 10px;
              font-weight: 600;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Bereket<span>Sahlemariam</span> Portfolio</h1>
            </div>
            <div class="content">
              <div class="greeting">Hi ${name},</div>
              <div class="body-text">
                Thank you for reaching out! This email confirms that I have successfully received your message. I am excited to connect and will review your inquiry shortly.
              </div>
              <div class="message-summary">
                <div class="summary-title">Summary of your message</div>
                <div class="summary-subject">Subject: ${subject}</div>
                <div class="summary-message">"${message}"</div>
              </div>
              <div class="btn-wrapper">
                <a href="https://bereket-shalemariam-personal-portfolio.vercel.app/" class="btn" target="_blank">Visit My Portfolio Website</a>
              </div>
              <div class="sign-off">
                Best regards,<br/>
                <strong>Bereket Sahlemariam</strong><br/>
                <span style="font-size: 13px; color: #636e72;">Full Stack Developer</span>
              </div>
            </div>
            <div class="footer">
              If you have any questions, feel free to reply directly to this email.
              <div class="social-links">
                <a href="https://github.com/beki255" target="_blank">GitHub</a> | 
                <a href="https://www.linkedin.com/in/bereket-sahlemariam-69a669362/" target="_blank">LinkedIn</a> |
                <a href="https://twitter.com/@beki2553" target="_blank">Twitter</a>
              </div>
            </div>
          </div>
        </body>
      </html>
    `
  };

  try {
    // 1. Send the primary email notification to you (the website owner)
    await transporter.sendMail(mailOptions);
    console.log(`Primary email successfully sent to owner from ${email}`);

    // 2. Send the auto-reply receipt to the sender in the background
    // We wrap this in a separate try-catch so if the auto-reply fails (e.g. invalid visitor email),
    // it doesn't block the main contact submission from returning success to the frontend!
    try {
      await transporter.sendMail(autoReplyOptions);
      console.log(`Auto-reply email successfully sent to visitor: ${email}`);
    } catch (autoReplyError) {
      console.error('Failed to send auto-reply confirmation email:', autoReplyError);
      // We don't throw this error, we just log it, so the main response is still successful!
    }

    return res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('SMTP sendMail error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to dispatch email. Please check server logs or SMTP configuration.' 
    });
  }
}
