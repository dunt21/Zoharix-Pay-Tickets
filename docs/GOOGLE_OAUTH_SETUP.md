# Google OAuth Setup Guide

Follow these steps to generate the necessary keys for "Sign in with Google".

## Step 1: Create a Project
1.  Go to the [Google Cloud Console](https://console.cloud.google.com/).
2.  Click the project dropdown (top left) and select **"New Project"**.
3.  Name it `Z-Events-Dev` and click **Create**.
4.  Select the newly created project.

## Step 2: Configure Consent Screen
1.  In the left sidebar, go to **APIs & Services > OAuth consent screen**.
2.  Select **External** user type and click **Create**.
3.  Fill in the required fields:
    - **App Information**: App name (Z-Events), User support email (your email).
    - **Developer Contact Information**: Your email.
4.  Click **Save and Continue** (you can skip Scopes and Test Users for now).

## Step 3: Create Credentials
1.  In the left sidebar, go to **Credentials**.
2.  Click **+ CREATE CREDENTIALS** (top) and select **OAuth client ID**.
3.  **Application type**: Select **Web application**.
4.  **Name**: `Z-Events React App`
5.  **Authorized JavaScript origins**:
    - `http://localhost:5173`
6.  **Authorized redirect URIs**:
    - `http://localhost:5000/api/v1/auth/google/callback`
7.  Click **Create**.

## Step 4: Get Your Keys
1.  A popup will show your **Client ID** and **Client Secret**.
2.  Copy these keys.

## Step 5: Update Enviroment Variables
Provide these keys to me, or update your `backend/.env` file directly:

```env
GOOGLE_CLIENT_ID=your_copied_client_id
GOOGLE_CLIENT_SECRET=your_copied_client_secret
FRONTEND_URL=http://localhost:5173
```
