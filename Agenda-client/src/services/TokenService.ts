interface IBearerToken {
  access_token: string;
  expiry_date: number;
  id_token: string;
  refresh_token: string;
  scope: string;
  token_type: string;
}

const processToken = (): boolean => {
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

  return true;
};

export default processToken;
