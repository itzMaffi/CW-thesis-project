import { useEffect } from 'react';
import { Params, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

//TODO: use to get user:
// import { UserProgressDB } from '../cirruculumProgress/data/userProgressDb';
// import layoutsDB from '../../utils/layoutsDB';

// Note: This will be reworked later after demo :)
export default function Token() {
  const navigate = useNavigate();
  const { token }: Readonly<Params<string>> = useParams();

  useEffect(() => {
    (async () => {
      if (token !== undefined) {
        const tokenDecoded = atob(token);
        localStorage.setItem('token', tokenDecoded);

        //TODO: get user here?
        // const parsedtoken = JSON.parse(tokenDecoded);
        // const data = await fetch(
        //   `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${parsedtoken.access_token}`
        // );
    
        // const { given_name, family_name, picture, sub } = await data.json();
       
        // const dbInstance = UserProgressDB.GetInstance();
        // dbInstance.user = { firstName:given_name, lastName:family_name, avatar:picture, id:sub };
        // layoutsDB.setUser(sub);
        navigate('/');
      }
    })();
  }, [token, navigate]);
  return <div></div>;
}
