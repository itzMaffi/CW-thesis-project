import { FC, useEffect, useState } from 'react';
import logoutIcon from '../../assets/fi-rs-sign-out.svg';
import User from '../../utils/types';
import userData from './data/userData.json';
import { CurriculumProgress } from '../cirruculumProgress/CurriculumProgress';
import { createInitialsAvatar } from '../../utils/createInitialsAvatar';

export const UserProfile: FC = () => {
  const [user, setUser] = useState<User>({} as User);
  const [avatar, setAvatar] = useState<string>('');

  useEffect(() => {
    const user: User = {
      id: userData.userDetails.id,
      firstName: userData.userDetails.firstName,
      lastName: userData.userDetails.lastName,
      email: userData.userDetails.email,
      avatar: userData.userDetails.avatar,
      cirriculumProgress: userData.userDetails.cirriculumProgress,
    };
    setUser(user);

    if (user.avatar) setAvatar(user.avatar);

    setAvatar(createInitialsAvatar(user));
  }, []);

  const handleLogout = () => {
    // TODO logout user
    console.log('logout');
  };

  return (
    <div
      data-testid="userProfile"
      className="flex flex-col justify-around w-full h-full p-1"
    >
      <div className="profile flex justify-between h-1/2">
        <div className="avatar w-2/4">
          <img
            className="rounded-lg"
            src={avatar}
            width={100}
            height={100}
            alt="Profile"
          />
        </div>
        <div className="userInfo w-2/4 flex flex-col justify-center">
          <h2>
            {user.firstName} {user.lastName}
          </h2>
          <p>{user.email}</p>
        </div>
        <div className="flex justify-center w-1/4">
          <button
            data-testid="logoutButton"
            className="text-white p-2 w-[41px] h-[41px] rounded-lg bg-gradient-to-r from-[#FEE2D4] from-[-7%] to-[#FC6F2A] to-45% hover:bg-[#FC6F2A]"
            onClick={handleLogout}
          >
            <img src={logoutIcon} width={18} height={18} />
          </button>
        </div>
      </div>
      <CurriculumProgress progress={user.cirriculumProgress} />
    </div>
  );
};
