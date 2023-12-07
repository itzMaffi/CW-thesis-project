import { Router } from 'express';
const router = Router();
import dotenv from 'dotenv';
dotenv.config();
import { OAuth2Client } from 'google-auth-library';

const FRONTEND_URL = process.env.FRONTEND_URL ?? 'http://localhost:5173';
const BACKEND_URL = process.env.BACKEND_URL ?? 'http://127.0.0.1:3000';

/* OAuth */
router.post('/', async (req, res, next) => {
  res.header('Access-Control-Allow-Origin', `${FRONTEND_URL}`);
  res.header('Referrer-Policy', 'no-referrer-when-downgrade');

  const redirectUrl = `${BACKEND_URL}/oauth`;

  const oAuth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    redirectUrl
  );

  const authorizeUrl = oAuth2Client.generateAuthUrl({
    // for testing should remain 'offline'
    access_type: 'offline',
    scope: 'https://www.googleapis.com/auth/userinfo.profile openid',
    prompt: 'consent',
  });

  res.json({ url: authorizeUrl });
});

export default router;
