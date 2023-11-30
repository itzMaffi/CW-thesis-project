import IUser from '../utils/types';

export const createInitialsAvatar = (user: IUser) => {
  if (!user.firstName || !user.lastName)
    throw new Error('User must have a first and last name');

  const initials = user.firstName[0] + user.lastName[0];
  const canvas = document.createElement('canvas');
  canvas.width = 100;
  canvas.height = 100;
  const context = canvas.getContext('2d');
  if (context) {
    // Note: HTML canvas expects a standard CSS color value, not custom Tailwind colors
    context.fillStyle = '#FFE6D8';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.font = '50px Arial';
    context.textAlign = 'center';
    context.fillStyle = '#FF7B10';
    context.fillText(initials, 50, 70);
  }
  return canvas.toDataURL();
};
