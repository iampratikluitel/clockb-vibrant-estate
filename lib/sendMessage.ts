import nodemailer from "nodemailer";

interface messageDetails {
  subject: string;
  message: string;
}

export const sendMessage = async (
  recipientEmail: string,
  messageDetails: messageDetails
) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      to: recipientEmail,
      subject: `${messageDetails.subject}`,
      html: `<p> ${messageDetails.message}</p>`,
    };

    const mailresponse = await transporter.sendMail(mailOptions);
    return mailresponse;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred.");
    }
  }
};
