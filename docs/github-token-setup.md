# GitHub Personal Access Token Setup

## Step-by-Step Guide

### 1. Go to GitHub Settings
- Visit: https://github.com/settings/tokens
- Or navigate: GitHub.com → Your Profile → Settings → Developer settings → Personal access tokens

### 2. Generate New Token
- Click "Generate new token (classic)"
- Give it a name like "RetailMax CI/CD"

### 3. Select Permissions
Check these permissions:
- ✅ **repo** (Full control of private repositories)
- ✅ **admin:repo_hook** (Full control of repository hooks)
- ✅ **workflow** (Update GitHub Action workflows)

### 4. Generate and Copy Token
- Click "Generate token"
- **IMPORTANT**: Copy the token immediately (you won't see it again!)
- Save it securely (we'll add it to .env file)

### 5. Add to Environment File
Add this to your `.env` file:
```
GITHUB_TOKEN=ghp_your_token_here
```

## Security Notes
- Keep your token secure and never commit it to git
- The token has access to your repositories, so treat it like a password
- You can revoke the token anytime from GitHub settings 