import { FC, useEffect, useState } from 'react';
import IUser from '../../utils/types';
import userData from './data/userData.json';
import { createInitialsAvatar } from '../../utils/createInitialsAvatar';
import LogoutButton from './LogoutButton';

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

  return user ? (
    <div className="profile flex justify-between w-full h-full p-2 overflow-hidden">
      <div className="flex gap-4 justify-between items-center">
        <div className="avatar grow flex-shrink-0">
          <img
            className="rounded-[0.5rem]"
            src={avatar}
            width={84}
            height={84}
            alt="Profile"
          />
        </div>
        <div className="userInfo text-sm flex flex-col justify-center grow">
          <h2>
            {user.firstName} {user.lastName}
          </h2>
          <p>{user.email}</p>
        </div>
      </div>
      <div className="flex flex-end grow-0 shrink-0">
        <LogoutButton></LogoutButton>
      </div>
    </div>
  ) : (
    <div>loading..</div>
  );
};
