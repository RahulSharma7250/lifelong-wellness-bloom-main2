# Vercel Deployment Guide for Lifelong Wellness Website

## Step-by-Step Deployment Instructions

### 1. Prepare Your Code
✅ All necessary files have been created/updated:
- `api/send-email.js` - Vercel serverless function
- Updated all frontend files to use dynamic API URLs
- Added `vercel.json` configuration
- Added `formidable` dependency for file uploads

### 2. Set Up Environment Variables in Vercel

1. **Go to your Vercel dashboard**
2. **Select your project**
3. **Go to Settings → Environment Variables**
4. **Add these variables:**

   ```
   EMAIL_USER = your-email@gmail.com
   EMAIL_PASS = your-app-password
   ```

   **Important:** For Gmail, you need:
   - Enable 2-factor authentication on your Gmail account
   - Generate an "App Password" (not your regular password)
   - Use the app password in EMAIL_PASS

### 3. Gmail Setup for App Password

1. **Go to Google Account Settings**
2. **Security → 2-Step Verification** (enable if not already)
3. **Security → App passwords**
4. **Generate app password for "Mail"**
5. **Use this 16-character password in EMAIL_PASS**

### 4. Deploy to Vercel

#### Option A: Deploy via Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts
```

#### Option B: Deploy via Git Integration
1. **Push your code to GitHub**
2. **Connect your GitHub repo to Vercel**
3. **Vercel will auto-deploy on every push**

### 5. Verify Deployment

1. **Check your deployed URL**
2. **Test the contact forms**
3. **Check Vercel function logs for any errors**

### 6. File Structure After Deployment

```
your-project/
├── api/
│   └── send-email.js          # Vercel serverless function
├── src/
│   ├── components/            # Updated with dynamic API URLs
│   ├── pages/                 # Updated with dynamic API URLs
│   └── utils/
│       └── emailService.ts    # Updated with dynamic API URLs
├── vercel.json               # Vercel configuration
└── package.json              # Updated dependencies
```

### 7. Testing

After deployment:
1. **Visit your Vercel URL**
2. **Try submitting a contact form**
3. **Check if emails are received**
4. **Check Vercel function logs for debugging**

### 8. Troubleshooting

**If emails don't work:**
1. Check Vercel function logs
2. Verify environment variables are set correctly
3. Ensure Gmail app password is correct
4. Check spam folder for test emails

**Common Issues:**
- Wrong app password format
- Environment variables not set in Vercel
- Gmail security settings blocking the app

### 9. Local Development

For local development, you can still use:
```bash
npm run server:dev  # Runs local backend on port 3001
npm run dev         # Runs frontend on port 8080
```

The code automatically detects the environment and uses the appropriate API URL.

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| EMAIL_USER | Gmail address | drmeghashaha@gmail.com |
| EMAIL_PASS | Gmail app password | abcd efgh ijkl mnop |

## Support

If you encounter issues:
1. Check Vercel function logs
2. Verify all environment variables
3. Test email credentials locally first
4. Check Gmail security settings

Your website should now work perfectly on Vercel! 🚀