import ReactDOMServer from 'react-dom/server';
import EmailTemplate from '@/app/mail/emailTemplate';
import nodemailer from 'nodemailer';

export const genrateMailTemplate = ({
    subject,
    username,
    emailBody,
    actionUrl,
    actionText
}) => {
    const emailHtml = ReactDOMServer.renderToStaticMarkup(
        <EmailTemplate
            subject: { subject }
            username: { username }
            emailBody: { emailBody }
            actionUrl: { actionUrl }
            actionTxxt: { actionText }
    />
    );

    return emailHtml;
}

export const sendMail = async({ to, subject, html, text }) => {
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
            html: html,
            text: text,
        }

        const response = await transporter.sendMail(mailOptions);
        return response;
    } catch (error) {
        throw new Error(error.message);
    }
}