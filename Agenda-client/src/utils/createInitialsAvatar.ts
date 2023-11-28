import User from '../utils/types';

export const createInitialsAvatar = (user: User) => {
  if (!user.firstName || !user.lastName)
    throw new Error('User must have a first and last name');

  const initials = user.firstName[0] + user.lastName[0];
  const canvas = document.createElement('canvas');
  canvas.width = 100;
  canvas.height = 100;
  const context = canvas.getContext('2d');
  if (context) {
    context.fillStyle = '#FEE2D4';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.font = '50px Arial';
    context.textAlign = 'center';
    context.fillStyle = '#FC6F2A';
    context.fillText(initials, 50, 70);
  }
  return canvas.toDataURL();
};
