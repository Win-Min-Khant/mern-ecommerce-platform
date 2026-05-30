import nodemailer from "nodemailer";

interface EmailOptions {
    email: string;
    subject: string;
    html: string;
}

const sendEmail = async (options: EmailOptions) => {
    // ၁။ Transporter ကို Create လုပ်မယ် (Mailtrap connection)
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    // ၂။ Email options တွေကို သတ်မှတ်မယ်
    const mailOptions = {
        from: `Your Store <${process.env.EMAIL_FROM}>`,
        to: options.email,
        subject: options.subject,
        html: options.html,
    };

    // ၃။ Email ကို ပို့မယ်
    await transporter.sendMail(mailOptions);
};

export default sendEmail;