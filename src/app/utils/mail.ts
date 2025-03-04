import nodemailer, { Transporter } from "nodemailer";
import path from "path";
import { handleError } from "../utils/handleError";

class Mail {
  private createTransporter(): Transporter {
    return nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: parseInt(process.env.MAIL_PORT || "587"),
      secure: process.env.MAIL_SECURE === "true",
      auth: {
        user: process.env.NEXT_PUBLIC_MAIL_AUTH_USER,
        pass: process.env.NEXT_PUBLIC_MAIL_AUTH_PASSWORD
      },
      tls: {
        rejectUnauthorized: process.env.MAIL_TLS_REJECT_UNAUTHORIZED === "true",
      },
    });
  }

  async sendMail(
    mailTo: string[],
    mailBcc: string[],
    mailFrom: string,
    subject: string,
    mailContent: string,
    imageName?: string,
  ): Promise<Response> {
    try {
      const transporter = this.createTransporter();
      let mailOptions = null;
  
      if (imageName) {
        const imagePath: string = `${getPublicImagePath()}/${imageName}`;
  
        mailOptions = {
          to: mailTo,
          bcc: mailBcc,
          from: mailFrom,
          subject: subject,
          html: mailContent,
          attachments: [
            {
              filename: imageName,
              path: imagePath,
              cid: "btcore",
            },
          ],
        };
      } else {
        mailOptions = {
          to: mailTo,
          bcc: mailBcc,
          from: mailFrom,
          subject: subject,
          html: mailContent,
        };
      }
  
      const info = await transporter.sendMail(mailOptions);
  
      return new Response(JSON.stringify(info.messageId), { status: 200 });
    } catch (error) {
      handleError("sendMail", "post", error)
      console.error("Error in sendMail:", error)
      return new Response(JSON.stringify({ message: error }), { status: 500 });
    }
  }
}

const getPublicImagePath = () => {
  return path.join(
    process.cwd(),
    process.env.NODE_ENV === "development" ? "public/assets/image" : "/images"
  );
};

export default new Mail();
