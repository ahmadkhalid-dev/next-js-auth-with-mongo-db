// /src/emailTemplates/EmailTemplate.tsx

import React from 'react';

interface EmailTemplateProps {
  subject: string;
  userName: string;
  emailBody: string;
  actionUrl?: string;
  actionText?: string;
}

const EmailTemplate: React.FC<EmailTemplateProps> = ({
  subject,
  userName,
  emailBody,
  actionUrl,
  actionText
}) => {
  return (
    <html>
      <head>
        <title>{subject}</title>
        <style>
          {`
            body {
              font-family: Arial, sans-serif;
              background-color: #f9f9f9;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 8px;
            }
            .content {
              padding: 20px;
              font-size: 14px;
              color: #333;
            }
            .button {
              background-color: #4CAF50;
              color: white;
              text-decoration: none;
              padding: 10px 20px;
              border-radius: 5px;
            }
          `}
        </style>
      </head>
      <body>
        <div className="container">
          <div className="content">
            <p>Hi {userName},</p>
            <p>{emailBody}</p>
            {actionUrl && actionText && (
              <a href={actionUrl} className="button">{actionText}</a>
            )}
          </div>
        </div>
      </body>
    </html>
  );
};

export default EmailTemplate;