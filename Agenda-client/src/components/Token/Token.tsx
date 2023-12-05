import { useEffect } from 'react';
import { Params, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// Note: This will be reworked later after demo :)
export default function Token() {
  const navigate = useNavigate();
  const { token }: Readonly<Params<string>> = useParams();

  useEffect(() => {
    (async () => {
      if (token !== undefined) {
        const tokenDecoded = atob(token);
        localStorage.setItem('token', tokenDecoded);
        navigate('/');
      }
    })();
  }, [token, navigate]);
  return <div></div>;
}
