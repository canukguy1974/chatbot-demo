# Vercel Deployment Instructions for AI Chatbot Widget

This document provides step-by-step instructions for deploying your AI Chatbot Widget to Vercel.

## What's Included in This Package

- Fully configured React + TypeScript project
- Webpack setup optimized for Vercel deployment
- Vercel configuration file (vercel.json)
- All chatbot features including configurable response buttons

## Deployment Steps

### Option 1: Deploy via Vercel CLI (Recommended)

1. **Install Vercel CLI** (if not already installed)
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Navigate to the project directory** (where you extracted this zip file)
   ```bash
   cd path/to/extracted/folder
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Deploy to Vercel**
   ```bash
   vercel --prod
   ```

6. **Follow the CLI prompts** to complete deployment

### Option 2: Deploy via Vercel Web Interface

1. **Go to [vercel.com](https://vercel.com)** and log in

2. **Click "New Project"**

3. **Import your GitHub repository** or upload this project directly

4. **Configure the project settings:**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

5. **Click "Deploy"**

## Troubleshooting

If you encounter any issues during deployment:

1. **Check the Vercel build logs** for specific error messages

2. **Verify Node.js version**
   - This project works best with Node.js 14.x or higher
   - You can specify the Node.js version in the Vercel project settings

3. **Package installation issues**
   - Try using `npm install --legacy-peer-deps` if you encounter dependency conflicts

4. **White page after deployment**
   - This package has been configured to automatically inject scripts
   - If you still see a white page, check the browser console for errors
   - Verify that the bundle.js file is being properly served

## Testing Your Deployment

After successful deployment, your chatbot widget will be available at the Vercel-provided URL. You can:

1. Configure your business information
2. Select a personality
3. Add knowledge base content
4. Create response buttons with trigger keywords
5. Test the chat interface
6. Get the embed code for your website

## Customization

To customize the widget further:

- Edit styles in the `src/styles` directory
- Modify components in the `src/components` directory
- Update the API integration in `src/services/ApiService.ts`

## Need Help?

If you need additional assistance with your Vercel deployment, please reach out for support.
