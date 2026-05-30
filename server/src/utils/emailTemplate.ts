export const forgetPasswordEmailTemplate = (url: string) => `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>Reset Your Password</title>
    <style type="text/css">
        body { margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #f9f9f9; color: #000000; }
        table { border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
        a { text-decoration: none; color: #ffffff; }
        .content-table { width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; margin-top: 50px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
        .header { background-color: #000000; padding: 40px; text-align: center; }
        .body-content { padding: 40px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; }
        .btn-container { text-align: center; margin: 30px 0; }
        .reset-btn { background-color: #000000; color: #ffffff !important; padding: 15px 30px; border-radius: 5px; font-weight: bold; display: inline-block; font-size: 16px; }
        .footer { padding: 20px; text-align: center; font-size: 12px; color: #888888; background-color: #f1f1f1; }
    </style>
    </head>
    <body>
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
        <td align="center">
            <table class="content-table" border="0" cellspacing="0" cellpadding="0">
            <!-- Header -->
            <tr>
                <td class="header">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Reset Password</h1>
                </td>
            </tr>
            
            <!-- Body -->
            <tr>
                <td class="body-content">
                <h2 style="margin-top: 0;">Hello,</h2>
                <p>We received a request to reset the password for your account. No changes have been made yet.</p>
                <p>You can reset your password by clicking the button below:</p>
                
                <div class="btn-container">
                    <a href="${url}" target="_blank" class="reset-btn">Reset My Password</a>
                </div>
                
                <p>If you did not request a password reset, please ignore this email or contact support if you have questions.</p>
                <p>This link will expire in 1 hour for security reasons.</p>
                <br />
                <p>Best regards,<br /><strong>Your Brand Team</strong></p>
                </td>
            </tr>

            <!-- Footer -->
            <tr>
                <td class="footer">
                <p>&copy; 2026 Your Store Name. All rights reserved.</p>
                <p>If the button doesn't work, copy and paste this link: <br /> 
                <a href="${url}" style="color: #007bff; text-decoration: underline;">${url}</a></p>
                </td>
            </tr>
            </table>
        </td>
        </tr>
    </table>
    </body>
</html>
`;