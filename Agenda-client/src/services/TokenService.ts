import { UserProgressDB } from "../components/cirruculumProgress/data/userProgressDb";
import layoutsDB from "../utils/layoutsDB";

interface IBearerToken {
  access_token: string;
  expiry_date: number;
  id_token: string;
  refresh_token: string;
  scope: string;
  token_type: string;
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:3000';

const processToken = async (): Promise<boolean> => {
  //FIXME: returning undefined as a string from localStorage needs to be checked
  const tokenString = localStorage.getItem('token');
  if (tokenString === 'undefined' || tokenString === null) return false;

  const token = JSON.parse(tokenString) as IBearerToken;

  // Token invalid
  if (token === undefined || token === null) {
    localStorage.removeItem('token');
    return false;
  }

  // Token expired
  const currentMilliseconds = Date.now();
  if (currentMilliseconds > token.expiry_date) {
    alert(`Session has expired. You must login again!`);
    localStorage.removeItem('token');
    return false;
  }

  const result = await verifyIDToken(token.id_token);

  if (!result) return result;

  const data = await fetch(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token.access_token}`
  );

  const { given_name, family_name, picture, sub } = await data.json();

  const dbInstance = UserProgressDB.GetInstance();
  dbInstance.user = {
    firstName: given_name,
    lastName: family_name,
    avatar: picture,
    id: sub,
  };
  layoutsDB.setUser(sub);

  return result;
};

async function verifyIDToken(idToken: string): Promise<boolean> {
  try {
    const data = await fetch(`${BACKEND_URL}/oauth/verify`, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });
    const response = await data.json();
    if (data.ok) return true;
    else {
      alert(response.message + '\nClear your cache and try again');
      return false;
    }
  } catch (error) {
    if (error instanceof Error)
      alert(`An error occured while validating your token: ${error.message}`);
    return false;
  }
}

export default processToken;
