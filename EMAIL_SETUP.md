# Portfolio Contact Form Email Setup

This guide will help you set up the email functionality for your portfolio contact form.

## Prerequisites

1. **Node.js and npm/pnpm installed**
2. **An email account** (Gmail, Outlook, Yahoo, or custom SMTP)
3. **App password** (for Gmail) or SMTP credentials

## Setup Instructions

### 1. Install Dependencies

The required dependencies should already be installed:
```bash
npm install nodemailer
npm install --save-dev @types/nodemailer
```

### 2. Environment Variables

Create a `.env.local` file in your project root and add your email configuration:

```env
# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=your-email@gmail.com
EMAIL_TO=your-email@gmail.com
```

### 3. Email Provider Settings

#### Gmail Setup
1. Enable 2-factor authentication on your Google account
2. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Generate an app password for "Mail"
4. Use this app password in `EMAIL_PASS` (not your regular password)

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-character-app-password
```

#### Outlook/Hotmail Setup
```env
EMAIL_HOST=smtp.live.com
EMAIL_PORT=587
EMAIL_USER=your-email@outlook.com
EMAIL_PASS=your-password
```

#### Yahoo Setup
```env
EMAIL_HOST=smtp.mail.yahoo.com
EMAIL_PORT=587
EMAIL_USER=your-email@yahoo.com
EMAIL_PASS=your-app-password
```

#### Custom SMTP
```env
EMAIL_HOST=your-smtp-server.com
EMAIL_PORT=587
EMAIL_USER=your-username
EMAIL_PASS=your-password
```

### 4. Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the contact section of your portfolio
3. Fill out and submit the contact form
4. Check your email for the message

## Features

### ✅ What's Included

- **Form Validation**: Client and server-side validation
- **Rate Limiting**: 3 emails per hour per IP address
- **Spam Protection**: Basic keyword filtering
- **Toast Notifications**: User feedback for success/error states
- **Responsive Design**: Works on all device sizes
- **HTML Email Templates**: Professional-looking emails
- **Reply-To Setup**: Easy to respond to contact form submissions

### 🔧 API Endpoints

- `POST /api/contact` - Sends contact form emails

### 📧 Email Template Features

- Professional HTML formatting
- Sender information clearly displayed
- Timestamp of submission
- Reply-to address set to sender's email
- Anti-spam measures

## Security Features

1. **Input Validation**: All fields are validated for type and length
2. **Rate Limiting**: Prevents spam by limiting emails per IP
3. **Spam Detection**: Basic keyword filtering
4. **XSS Prevention**: Input sanitization
5. **CSRF Protection**: Next.js built-in protection

## Troubleshooting

### Common Issues

1. **"Authentication failed"**
   - Double-check your email and password
   - For Gmail, ensure you're using an app password, not your regular password
   - Verify 2FA is enabled for Gmail

2. **"Connection timeout"**
   - Check your EMAIL_HOST and EMAIL_PORT settings
   - Ensure your firewall isn't blocking outgoing connections
   - Try different port (465 for secure, 587 for TLS)

3. **"Invalid email format"**
   - Ensure EMAIL_USER contains a valid email address
   - Check for typos in environment variables

### Environment Variables Not Loading

1. Ensure `.env.local` is in the project root
2. Restart your development server after adding env variables
3. Check that variable names match exactly (case-sensitive)

### Testing Email Delivery

Use a service like [Mailtrap](https://mailtrap.io/) for testing during development:

```env
EMAIL_HOST=smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_USER=your-mailtrap-username
EMAIL_PASS=your-mailtrap-password
```

## Production Deployment

### Vercel
Add environment variables in your Vercel dashboard under Settings > Environment Variables.

### Netlify
Add environment variables in your Netlify dashboard under Site settings > Environment variables.

### Other Platforms
Add the environment variables through your hosting platform's interface or configuration files.

## File Structure

```
portfolio/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts          # API endpoint for contact form
│   └── layout.tsx                # Includes Toaster component
├── components/
│   ├── Contact.tsx               # Contact form component
│   └── ui/
│       └── toaster.tsx           # Toast notifications
├── utils/
│   └── sendEmail.tsx             # Email sending utility
├── .env.local                    # Your environment variables
└── .env.example                  # Example environment file
```

## Support

If you encounter any issues:

1. Check the browser console for errors
2. Check the server logs for email sending errors
3. Verify your environment variables are correct
4. Test with a different email provider if needed

---

**Note**: Never commit your `.env.local` file to version control. It contains sensitive information like passwords.
