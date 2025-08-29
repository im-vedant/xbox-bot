import { DynamicTool } from "@langchain/core/tools";
import nodemailer from 'nodemailer';

interface EmailInput {
  email: string;
  phone?: string;
  gamePass?: boolean;
  userMessage?: string;
  chatContext?: string;
}

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail', // You can change this to your preferred email service
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS, // Your app password
    },
  });
};

// Custom email tool for sending contact details
export const emailTool = new DynamicTool({
  name: "send_contact_details",
  description: `Send contact details and chat context via email, and optionally send a dummy Xbox Game Pass. 
  Use this tool when a user provides their email address and wants to receive information, be contacted, get personalized Xbox gaming recommendations, or requests an Xbox Game Pass.
  Input should be a JSON string with mandatory 'email' field, and optional 'phone', 'gamePass', 'userMessage', and 'chatContext' fields.
  Examples: 
  - {"email": "user@example.com", "phone": "+1234567890", "userMessage": "I want info about Xbox Series X", "chatContext": "User asked about console specs and pricing"}
  - {"email": "user@example.com", "gamePass": true, "userMessage": "Send me Game Pass please"}
  - {"email": "user@example.com", "chatContext": "User interested in gaming recommendations for RPG games"}`,
  
  func: async (input: string) => {
    try {
      // Parse the input JSON
      let contactData: EmailInput;
      try {
        contactData = JSON.parse(input);
      } catch (parseError) {
        return "Error: Please provide contact details in JSON format with 'email' and 'phone' fields.";
      }

      const { email, phone, gamePass = false, userMessage, chatContext } = contactData;

      // Validate input - only email is mandatory
      if (!email) {
        return "Error: Email address is required.";
      }

      // Email validation regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return "Error: Please provide a valid email address.";
      }

      // Check if email credentials are configured
      if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        return "Error: Email service is not configured. Please contact support.";
      }

      const transporter = createTransporter();

      // Generate dummy Game Pass code if requested
      const gamePassCode = gamePass ? `XBOX-${Math.random().toString(36).substring(2, 8).toUpperCase()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}` : null;

      // Send only one email based on scenario
      if (gamePass && gamePassCode) {
        // Send Game Pass email to user only
        const userMailOptions = {
          from: process.env.EMAIL_USER,
          to: email, // Send to the user's email
          subject: '🎮 Your Xbox Game Pass Demo Code - Xbox Gaming Assistant',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: linear-gradient(135deg, #107C41 0%, #0078d4 100%); padding: 30px; border-radius: 12px; text-align: center; color: white; margin-bottom: 20px;">
                <h1 style="margin: 0; font-size: 28px;">🎮 Xbox Game Pass</h1>
                <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Demo Code Delivery</p>
              </div>
              
              <div style="background-color: #f8f9fa; padding: 25px; border-radius: 8px; margin: 20px 0; text-align: center;">
                <h2 style="color: #333; margin-top: 0;">Your Demo Game Pass Code</h2>
                <div style="background-color: #107C41; color: white; padding: 20px; border-radius: 8px; margin: 15px 0;">
                  <p style="margin: 0 0 10px 0; font-size: 14px;">Demo Code:</p>
                  <p style="margin: 0; font-size: 24px; font-weight: bold; letter-spacing: 3px; font-family: 'Courier New', monospace;">${gamePassCode}</p>
                </div>
                <p style="color: #666; font-size: 14px; margin: 15px 0;">
                  ⚠️ <strong>Important:</strong> This is a demonstration code for illustration purposes only.<br>
                  This is not a real Xbox Game Pass code.
                </p>
              </div>
              
              ${userMessage ? `
              <div style="background-color: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107;">
                <h3 style="color: #333; margin-top: 0;">💬 Your Message</h3>
                <p style="margin: 0; color: #333; font-style: italic;">"${userMessage}"</p>
              </div>
              ` : ''}
              
              <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px; border-left: 4px solid #107C41;">
                <h3 style="color: #333; margin-top: 0;">What's Next?</h3>
                <p style="margin: 5px 0; color: #333;">
                  📞 Our Xbox gaming specialists will contact you within 24-48 hours<br>
                  🎮 Get personalized game recommendations<br>
                  💡 Learn about real Xbox Game Pass benefits<br>
                  🛍️ Discover the best Xbox console for your needs
                </p>
              </div>
              
              <div style="text-align: center; margin: 25px 0;">
                <div style="background-color: #0078d4; color: white; padding: 15px; border-radius: 8px; display: inline-block;">
                  <p style="margin: 0; font-size: 14px;">
                    <strong>Real Xbox Game Pass includes:</strong><br>
                    📚 100+ high-quality games • 🎯 Day-one releases • ☁️ Cloud gaming • 💰 Member discounts
                  </p>
                </div>
              </div>
              
              <div style="margin-top: 30px; padding: 15px; background-color: #f1f1f1; border-radius: 8px; text-align: center;">
                <p style="margin: 0; font-size: 12px; color: #666;">
                  Thank you for your interest in Xbox Gaming!<br>
                  Generated by Xbox Gaming Assistant • ${new Date().toLocaleString()}
                </p>
              </div>
            </div>
          `,
          text: `
🎮 Xbox Game Pass Demo Code

Hi there!

Thank you for your interest in Xbox Game Pass. Here's your demo code:

Demo Code: ${gamePassCode}

⚠️ IMPORTANT: This is a demonstration code for illustration purposes only.
This is not a real Xbox Game Pass code.

${userMessage ? `Your Message: "${userMessage}"` : ''}

What's Next?
📞 Our Xbox gaming specialists will contact you within 24-48 hours
🎮 Get personalized game recommendations  
💡 Learn about real Xbox Game Pass benefits
🛍️ Discover the best Xbox console for your needs

Real Xbox Game Pass includes:
📚 100+ high-quality games
🎯 Day-one releases
☁️ Cloud gaming
💰 Member discounts

Thank you for your interest in Xbox Gaming!
Generated by Xbox Gaming Assistant • ${new Date().toLocaleString()}
          `.trim()
        };

        await transporter.sendMail(userMailOptions);
        
      } else {
        // Send contact details email to your team only
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: process.env.EMAIL_USER, // Send to your own email
          subject: 'New Contact Details from Xbox Gaming Assistant',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #107C41; border-bottom: 2px solid #107C41; padding-bottom: 10px;">
                🎮 New Contact Request - Xbox Gaming Assistant
              </h2>
              
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #333; margin-top: 0;">Contact Information</h3>
                <p style="margin: 10px 0;"><strong>📧 Email:</strong> <a href="mailto:${email}">${email}</a></p>
                ${phone ? `<p style="margin: 10px 0;"><strong>📱 Phone:</strong> <a href="tel:${phone}">${phone}</a></p>` : ''}
              </div>
              
              ${userMessage ? `
              <div style="background-color: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107;">
                <h3 style="color: #333; margin-top: 0;">💬 User's Message</h3>
                <p style="margin: 0; color: #333; font-style: italic;">"${userMessage}"</p>
              </div>
              ` : ''}
              
              ${chatContext ? `
              <div style="background-color: #d1ecf1; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0dcaf0;">
                <h3 style="color: #333; margin-top: 0;">🗨️ Chat Context</h3>
                <p style="margin: 0; color: #333;">${chatContext}</p>
              </div>
              ` : ''}
              
              <div style="background-color: #e8f5e8; padding: 15px; border-radius: 8px; border-left: 4px solid #107C41;">
                <p style="margin: 0; color: #333;">
                  <strong>Note:</strong> This contact request was submitted through the Xbox Gaming Assistant chatbot.
                  The user may be interested in Xbox consoles, gaming services, Game Pass, or gaming recommendations.
                </p>
              </div>
              
              <div style="margin-top: 20px; padding: 15px; background-color: #f1f1f1; border-radius: 8px;">
                <p style="margin: 0; font-size: 12px; color: #666;">
                  Timestamp: ${new Date().toLocaleString()}<br>
                  Source: Xbox Gaming Assistant Bot<br>
                  Auto-generated by Xbox Gaming Assistant API
                </p>
              </div>
            </div>
          `,
          text: `
New Contact Request - Xbox Gaming Assistant

Contact Information:
Email: ${email}
${phone ? `Phone: ${phone}` : 'Phone: Not provided'}

${userMessage ? `User's Message: "${userMessage}"` : ''}

${chatContext ? `Chat Context: ${chatContext}` : ''}

Note: This contact request was submitted through the Xbox Gaming Assistant chatbot.
The user may be interested in Xbox consoles, gaming services, Game Pass, or gaming recommendations.

Timestamp: ${new Date().toLocaleString()}
Source: Xbox Gaming Assistant Bot
          `.trim()
        };

        await transporter.sendMail(mailOptions);
      }

      return `✅ ${gamePass ? 'Xbox Game Pass demo code sent!' : 'Contact details successfully sent!'}
      
${gamePass ? `� Great news! I've sent your demo Xbox Game Pass code directly to ${email}. Please check your inbox!

Your demo code: ${gamePassCode} ✨

⚠️ Note: This is a demonstration code to show how our system works. Our team will contact you with information about real Xbox Game Pass subscriptions.

` : `Thank you for providing your contact information. I've forwarded your details to our team:
- Email: ${email}
${phone ? `- Phone: ${phone}` : ''}

Someone from our team will reach out to you soon with personalized Xbox gaming recommendations and information. You can expect to hear from us within 24-48 hours.

`}Is there anything else about Xbox gaming, consoles, or services that I can help you with right now?`;

    } catch (error) {
      console.error('Email tool error:', error);
      
      if (error instanceof Error) {
        // Handle specific email errors
        if (error.message.includes('Invalid login')) {
          return "Error: Email authentication failed. Please contact support.";
        }
        if (error.message.includes('Network')) {
          return "Error: Network issue while sending email. Please try again later.";
        }
      }
      
      return "Error: Unable to send contact details at the moment. Please try again later or contact support directly.";
    }
  },
});
