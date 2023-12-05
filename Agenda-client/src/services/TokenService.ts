interface IBearerToken {
  access_token: string;
  expiry_date: number;
  id_token: string;
  refresh_token: string;
  scope: string;
  token_type: string;
}

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

  return await verifyIDToken(token.id_token);
};

async function verifyIDToken(idToken: string): Promise<boolean> {
  try {
    const data = await fetch('http://localhost:3000/oauth/verify', {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });
    const response = await data.json();
    if (data.ok) return true;
    else {
      alert(response.message);
      return false;
    }
  } catch (error) {
    if (error instanceof Error) alert(`An error occured while validating your token: ${error.message}`);
    return false;
  }
}

export default processToken;
