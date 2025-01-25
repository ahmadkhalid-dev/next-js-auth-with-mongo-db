import nodemailer from 'nodemailer';

export const sendMail = async({ to, subject, text, html }) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: true,
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.MAIL_FROM_ADDRESS,
            to: to,
            subject: subject,
            html: text,
            html: html
        }

        const response = await transporter.sendMail(mailOptions);
        return response;
    } catch (error) {
        throw new Error(error.message);
    }
}