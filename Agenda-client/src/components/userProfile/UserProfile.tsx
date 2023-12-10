import { FC, useEffect, useState } from 'react';
import { IUser } from '../../utils/types';
import { createInitialsAvatar } from '../../utils/createInitialsAvatar';
import LogoutButton from './LogoutButton';
import { UserProgressDB } from '../cirruculumProgress/data/userProgressDb';

export const UserProfile: FC = () => {
  const [user, setUser] = useState<IUser>();
  const [avatar, setAvatar] = useState<string>('');

  async function getUserInfo() {
    try {
      const user = UserProgressDB.GetInstance().user;
      if (!user) return;

      setUser(user);

      if (!user.avatar) setAvatar(createInitialsAvatar(user));
      else setAvatar(user.avatar);
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  return user ? (
    <div className="profile flex justify-between w-full h-full p-2 overflow-hidden">
      <div className="flex gap-4 justify-between items-center">
        <div className="avatar grow flex-shrink-0 ">
          <img
            className="rounded-[0.5rem]"
            src={avatar}
            width={84}
            height={84}
            alt="Profile"
          />
        </div>
        <div className="userInfo text-lg font-bold flex flex-col grow text-cp-blue">
          <h2>{user.firstName}</h2>
          <h2>{user.lastName}</h2>
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
