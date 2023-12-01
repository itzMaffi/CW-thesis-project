import { Router } from 'express';
const router = Router();
import dotenv from 'dotenv';
dotenv.config();
import { OAuth2Client } from 'google-auth-library';
import { GetTokenResponse } from 'google-auth-library/build/src/auth/oauth2client';

async function getUserData(access_token: string) {
  const res = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token${access_token}`);
  const data = await res.json();
  // TODO remove this before release
  console.log('data from res.json', data);
}

/* GET home page */
router.get('/', async (req, res, next) => {
  const code = req.query.code;
  // TODO remove this before release
  console.log({ code });
  try {
    // TODO if you change this here, you must also change it in the Google Console too
    const redirectUrl = 'http://127.0.0.1:3000/oauth';
    const oAuth2Client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, redirectUrl);
    let token = '';
    if (typeof code === 'string') {
      const res = (await oAuth2Client.getToken(code)) as GetTokenResponse;
      await oAuth2Client.setCredentials(res.tokens);
      console.log('Tokens acquired');
    } else {
      console.error('Code is not a string');
    }
    console.log('Tokens acquired');

    const user = oAuth2Client.credentials;
    console.log('Credentials:', user);

    if (user.access_token) {
      const encoded = Buffer.from(JSON.stringify(user), 'binary').toString('base64');
      res.redirect(303, `http://localhost:5173/token/${encoded}`);
    } else {
      console.error('Access token is not available');
    }
  } catch (err) {
    console.error('Error logging in with OAuth2 user', err);
  }

  // if user.access_token
  // TODO change this for prod URL
});

export default router;
