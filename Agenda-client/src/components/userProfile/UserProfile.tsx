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
      className="flex flex-col justify-around w-full h-full p-[1px]"
    >
      <div className="profile flex justify-between gap-1">
        <div className="avatar grow flex-shrink-0">
          <img
            className="rounded-lg"
            src={avatar}
            width={63}
            height={63}
            alt="Profile"
          />
        </div>
        <div className="userInfo text-sm flex flex-col self-end justify-center grow">
          <h2>
            {user.firstName} {user.lastName}
          </h2>
          <p>{user.email}</p>
        </div>
        <div className="flex flex-end grow-0 shrink-0">
          <button
            data-testid="logoutButton"
            className="text-white p-2 h-fit rounded-lg bg-gradient-to-r from-cw-light-orange from-[-7%] to-cw-orange to-45% hover:bg-cw-orange active:scale-90 shadow-lg active:shadow-inner"
            onClick={handleLogout}
          >
            <img src={logoutIcon} width={16} height={16} />
          </button>
        </div>
      </div>
      <CurriculumProgress progress={user.cirriculumProgress} />
    </div>
  );
};