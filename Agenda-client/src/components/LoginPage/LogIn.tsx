import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';

export const Login: FC = () => {
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate('/dashboard');
  };

  const handleLoginSuccess = () => {
    ////send tocken to the backen
    navigate('/dashboard');
  };

  const handleLoginFailure = () => {
    console.log('login failed');
  };

  return (
    <div className=" w-full h-screen -mt-14 flex flex-col justify-center items-center">
      <div className="flex justify-center items-center">
        <div className="text-cw-orange text-5xl font-sans animate-slideUpFadeIn">
          Welcome to Codeworks
        </div>
        <div className=" h-14 bg-white bg-opacity-30 -ml-[550px] mt-[90px] w-[600px] backdrop-blur-25"></div>
      </div>

      <div
        onClick={clickHandler}
        className="w-[200px] rounded-md border shadow-md border-cw-light-orange mt-4 flex
       justify-center items-center gap-2 p-2  cursor-pointer  hover:bg-cw-light-orange active:scale-90 active:shadow-inner"
      >
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M1.02388 14.431L4.38721 11.859C4.1949 11.2749 4.09091 10.65 4.09091 10C4.09091 9.35004 4.1949 8.72516 4.38721 8.14105L1.02388 5.56909C0.367906 6.90275 0 8.40634 0 10C0 11.5937 0.367906 13.0973 1.02388 14.431Z"
              fill="#FBBC05"
            />
            <path
              d="M4.38725 8.14102C5.16325 5.78407 7.3773 4.09091 10 4.09091C11.4091 4.09091 12.6819 4.59091 13.6819 5.40909L16.591 2.5C14.8182 0.954545 12.5455 0 10 0C6.04828 0 2.6505 2.2621 1.02393 5.56906L4.38725 8.14102Z"
              fill="#EA4335"
            />
            <path
              d="M9.99993 19.9999C6.04707 19.9999 2.6485 17.7366 1.02246 14.4281L4.38442 11.8506C5.15795 14.2119 7.37411 15.909 9.99993 15.909C11.2848 15.909 12.4233 15.6064 13.3249 15.0374L16.5179 17.5094C14.77 19.1346 12.439 19.9999 9.99993 19.9999Z"
              fill="#34A853"
            />
            <path
              d="M10 8.18188H19.3182C19.4545 8.77279 19.5455 9.40916 19.5455 10.0001C19.5455 13.2594 18.3531 15.8033 16.5179 17.5096L13.325 15.0376C14.369 14.3787 15.0953 13.3626 15.3636 12.0455H10V8.18188Z"
              fill="#4285F4"
            />
          </svg>
        </div>

        <div>Sign in with Google</div>
      </div>

      <GoogleLogin
        clientId="YOUR_GOOGLE_CLIENT_ID"
        buttonText="Sign in with Google"
        onSuccess={handleLoginSuccess}
        onFailure={handleLoginFailure}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
};
