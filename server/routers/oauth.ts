import { Router } from 'express';
const router = Router();
import dotenv from 'dotenv';
dotenv.config();
import { OAuth2Client } from 'google-auth-library';
import { GetTokenResponse } from 'google-auth-library/build/src/auth/oauth2client';

const FRONTEND_URL = process.env.FRONTEND_URL ?? 'http://localhost:5173';
const BACKEND_URL = process.env.BACKEND_URL ?? 'http://127.0.0.1:3000';

/* GET home page */
router.get('/', async (req, res, next) => {
  const code = req.query.code;

  try {
    const redirectUrl = `${BACKEND_URL}/oauth`;
    const oAuth2Client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      redirectUrl
    );
    let token = '';
    if (typeof code === 'string') {
      const res = (await oAuth2Client.getToken(code)) as GetTokenResponse;
      await oAuth2Client.setCredentials(res.tokens);
    } else {
      console.error('Code is not a string');
    }

    const user = oAuth2Client.credentials;

    if (user) {
      const encoded = Buffer.from(JSON.stringify(user), 'binary').toString(
        'base64'
      );
      res.redirect(303, `${FRONTEND_URL}/token/${encoded}`);
    } else {
      console.error('Access token is not available');
    }
  } catch (err) {
    console.error('Error logging in with OAuth2 user', err);
  }
});

router.get('/verify', async (req, res) => {
  const authClient = new OAuth2Client();
  try {
    if (!req.headers.authorization)
      throw new Error('No authorization token provided');

    const token = req.headers.authorization.split(' ')[1];
    const ticket = await authClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    res.send(ticket.getPayload());
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      error.message === 'No authorization token provided'
    )
      res.status(400).send({
        message: 'Something went wrong while validating your token',
        error: error.message,
      });
    console.log(error);
    if (error instanceof Error)
      res.status(500).send({
        message: 'We could not validate your token',
        error: error.message,
      });
  }
});

export default router;
