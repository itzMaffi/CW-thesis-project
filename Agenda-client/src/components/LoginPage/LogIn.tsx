import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import processToken from '../../services/TokenService';
import { useEffect } from 'react';
import googleButton from '../../assets/google_signin_assets/Web/svg/light/web_light_rd_SI.svg';

const BACKEND_URL = process.env.VITE_BACKEND_URL ?? 'http://localhost:3000';

export const LogIn: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isTokenValid = processToken();
    if (isTokenValid) navigate('/dashboard');
  }, []);

  // TODO: OAuth - remove
  function navi(url: string) {
    window.location.href = url;
  }

  // TODO change this to BE url
  async function auth() {
    const response = await fetch(`${BACKEND_URL}/request`, {
      method: 'post',
    });

    const data = await response.json();
    console.log('data from App.tsx:', data);

    navi(data.url);
  }

  return (
    <div className=" w-full h-screen -mt-14 flex flex-col justify-center items-center">
      <div className="flex justify-center items-center">
        <div className="text-cw-orange text-5xl font-sans animate-slideUpFadeIn">
          Welcome to Codeworks
        </div>
        <div className=" h-14 bg-white bg-opacity-30 -ml-[550px] mt-[90px] w-[600px] backdrop-blur-25"></div>
      </div>

      <button className="btn-auth " type="button" onClick={() => auth()}>
        <img
          className="btn-auth-img active:scale-90 "
          src={googleButton}
          alt="google sign in"
        />
      </button>
    </div>
  );
};
