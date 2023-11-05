import { User } from '../types';
import dayjs from 'dayjs';

const users: User[] = [];

export const constructMessage = (username: string, text: string) => {
  return {
    username,
    text,
    time: dayjs().format('h:mm a'),
  };
};

export const addUser = (user: User) => {
  users.push(user);
  return user;
};

export const getActiveRoomUsers = (room: string) => {
  return users.filter((user: User) => user.room === room);
};

export const getActiveUser = (id: string) => {
  return users.find((user: User) => user.id === id);
};

export const exitRoom = (id: string) => {
  const index = users.findIndex((user: User) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};
