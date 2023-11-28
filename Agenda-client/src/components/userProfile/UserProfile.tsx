import { FC, useEffect, useState } from 'react';
import logoutIcon from '../../assets/fi-rs-sign-out.svg';
import User from './interfaces/User';
import userData from './data/userData.json';
import { ProgressBar } from '../cirruculumProgress/ProgressBar';

export const UserProfile: FC = () => {
  const [user, setUser] = useState<User>({} as User);
  // const [avatar, setAvatar] = useState<string>('');

  useEffect(() => {
    // TODO fetch user data from backend
    const user: User = {
      id: userData.userDetails.id,
      firstName: userData.userDetails.firstName,
      lastName: userData.userDetails.lastName,
      email: userData.userDetails.email,
      avatar: userData.userDetails.avatar,
      cirriculumProgress: userData.userDetails.cirriculumProgress,
    };
    setUser(user);
  }, []);

  const handleLogout = () => {
    // TODO logout user
    console.log('logout');
  };

  // const createInitialsAvatar = (user: User) => {
  //   const initials = user.firstName[0] + user.lastName[0];
  //   const canvas = document.createElement('canvas');
  //   canvas.width = 100;
  //   canvas.height = 100;
  //   const context = canvas.getContext('2d');
  //   if (context) {
  //     context.fillStyle = '#FC6F2A';
  //     context.fillRect(0, 0, canvas.width, canvas.height);
  //     context.font = '50px Arial';
  //     context.textAlign = 'center';
  //     context.fillStyle = '#FFFFFF';
  //     context.fillText(initials, 50, 70);
  //   }
  //   return canvas.toDataURL();
  // };

  const getAvatar = (user: User) => {
    // TODO fetch avatar from backend
    if (user.avatar) return user.avatar;

    // return createInitialsAvatar(user);
  };

  return (
    <div
      data-testid="userProfile"
      className="flex flex-col bg-white justify-between rounded-[20px] border min-w-[400px] h-fit p-2 m-4"
    >
      <div className="profile flex justify-between gap-2">
        <div className="avatar rounded-lg border bg-[#FEE2D4] flex-shrink-0">
          <img src={getAvatar(user)} width={100} height={100} alt="Profile" />
        </div>
        <div className="userInfo">
          <h2>
            {user.firstName} {user.lastName}
          </h2>
          <p>{user.email}</p>
        </div>
        <div className="logout">
          <button
            className="flex justify-center items-center gap-1 flex-shrink-0 bg-gradient-to-r from-[#FEE2D4] from-[-7%] to-[#FC6F2A] to-45% hover:bg-[#FC6F2A] text-white w-[41px] h-[41px] rounded-bl-[20px] rounded-tr-[20px]"
            onClick={handleLogout}
          >
            <img src={logoutIcon} width={18} height={18} />
          </button>
        </div>
      </div>
      <ProgressBar progress={user.cirriculumProgress} />
    </div>
  );
};
