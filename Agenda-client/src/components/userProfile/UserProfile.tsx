import { FC, useEffect, useState } from 'react';
import logoutIcon from '../../assets/fi-rs-sign-out.svg';
import IUser from '../../utils/types';
import userData from './data/userData.json';
import { CurriculumProgress } from '../cirruculumProgress/CurriculumProgress';
import { createInitialsAvatar } from '../../utils/createInitialsAvatar';

export const UserProfile: FC = () => {
  const [user, setUser] = useState<IUser>();
  const [avatar, setAvatar] = useState<string>('');

  useEffect(() => {
    const user: IUser = {
      id: userData.userDetails.id,
      firstName: userData.userDetails.firstName,
      lastName: userData.userDetails.lastName,
      email: userData.userDetails.email,
      avatar: userData.userDetails.avatar,
      cirriculumProgress: userData.userDetails.cirriculumProgress,
    };
    setUser(user);

    if (!user.avatar) setAvatar(createInitialsAvatar(user));
    else setAvatar(user.avatar);
  }, []);

  const handleLogout = () => {
    // TODO logout user
    console.log('logout');
  };

  return user ? (
    <div
      data-testid="userProfile"
      className="flex flex-col justify-around w-full h-full p-2 overflow-hidden"
    >
      <div className="profile flex justify-between pt-1">
        <div className="avatar grow flex-shrink-0 pl-2">
          <img
            className="rounded-[0.5rem]"
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
            className="text-white p-2 h-fit rounded-[0.5rem] bg-gradient-to-r from-cw-light-orange from-[-7%] to-cw-orange to-45% hover:bg-cw-orange active:scale-90 shadow-lg active:shadow-inner"
            onClick={handleLogout}
          >
            <img src={logoutIcon} width={16} height={16} />
          </button>
        </div>
      </div>
      <CurriculumProgress progress={user.cirriculumProgress} />
    </div>
  ) : (
    <div>loading..</div>
  );
};
