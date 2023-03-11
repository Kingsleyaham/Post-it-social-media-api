import { avatarStyles } from "./avatarStyles";

export const getRandomAvatarStyle = () => {
  return avatarStyles[Math.floor(Math.random() * avatarStyles.length)];
};
