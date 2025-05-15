# Deploying to Vercel

This guide explains how to deploy the Waste & Fraud Detection System to Vercel.

## Prerequisites

1. A [Vercel](https://vercel.com) account
2. Your project in a Git repository (GitHub, GitLab, or Bitbucket)
3. A Google Gemini API key

## Repository Preparation

Before deploying, ensure your repository is clean:

1. The project includes a `.gitignore` file to prevent unnecessary files from being committed
2. Make sure your `.env` file with your API key is not committed (it's already in `.gitignore`)
3. Only commit the files needed for the application to run
4. The project uses a hybrid approach for URLs:
   - Domain URLs (companyw-fds.vercel.app) for site navigation and canonical references
   - GitHub raw URLs (from bniladridas) for Open Graph images and other static assets
   - Update both sets of URLs if you're deploying to a different domain or GitHub account

## Deployment Steps

### 1. Connect Your Repository to Vercel

1. Log in to your Vercel account
2. Click "Add New..." and select "Project"
3. Import your Git repository
4. Select the repository containing this project

### 2. Configure Project Settings

1. **Framework Preset**: Select "Other"
2. **Build and Output Settings**: Leave as default (the `vercel.json` file handles this)
3. **Environment Variables**: Add the following:
   - Name: `GEMINI_API_KEY`
   - Value: Your Google Gemini API key
   - Environment: Production (and optionally Preview/Development)

   **Important**: Make sure to add this environment variable directly in the Vercel dashboard. The variable must be named exactly `GEMINI_API_KEY` for the application to work correctly.

### 3. Deploy

1. Click "Deploy"
2. Wait for the deployment to complete
3. Once deployed, Vercel will provide you with a URL to access your application

## Vercel Configuration

The project includes a `vercel.json` file that configures:

- Python runtime (3.9)
- Build settings for static files and the Python API
- Routing for API endpoints and static content
- Environment variable requirements

```json
{
  "version": 2,
  "builds": [
    {
      "src": "gemini_api.py",
      "use": "@vercel/python",
      "config": { "runtime": "python3.9", "requirementsPath": "requirements-vercel.txt" }
    },
    { "src": "*.html", "use": "@vercel/static" },
    { "src": "*.css", "use": "@vercel/static" },
    { "src": "*.js", "use": "@vercel/static" },
    { "src": "*.svg", "use": "@vercel/static" }
  ],
  "routes": [
    { "src": "/api/(.*)", "dest": "gemini_api.py" },
    { "src": "/(.*)", "dest": "/$1" }
  ]
}
```

Note: Environment variables are configured directly in the Vercel dashboard, not in the vercel.json file.

## Troubleshooting

### API Calls Not Working

If the frontend loads but API calls fail:

1. Check that the `GEMINI_API_KEY` environment variable is set correctly in Vercel
2. Verify that the API routes in `vercel.json` are correct
3. Check the Vercel deployment logs for Python errors

### Static Files Not Loading

If the HTML loads but CSS/JS/SVG files don't:

1. Ensure all static files are included in the repository
2. Check that the file paths in HTML are relative (not absolute)
3. Verify the static file configuration in `vercel.json`

## Updating Your Deployment

When you push changes to your repository:

1. Vercel will automatically rebuild and redeploy your application
2. You can view deployment logs in the Vercel dashboard
3. If needed, you can manually trigger a redeployment from the Vercel dashboard
