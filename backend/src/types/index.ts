import { Request } from 'express';

export type EnvConfig = {
  SERVER_PORT: number;
  JWT_SECRET_KEY?: string;
  JWT_EXPIRES_IN?: string;
};

export type User = {
  id: string;
  username: string;
  room: string;
};

export type JwtPayload = {
  id: string;
};

export type CustomRequest = Request & {
  user?: any;
  userId: string;
};

export type CustomResponse = {
  message: string;
  statusCode: string;
  status: string;
  data: any;
  isOperational: boolean;
};

export type UserMap = {
  fullname: string;
  email: string;
  password: string;
  username: string;
};

export type UserUnion = UserMap & {
  id: string;
};

export type UserModel = {
  users: UserUnion[];
};

export type ChatMap = {
  id: string;
  participantId: string[];
  participantName: string[];
  isGroupChat: boolean;
  messages: MessageMap[];
};

export type ChatModel = {
  chats: ChatMap[];
};

export type MessageMap = {
  id: string;
  sender: string;
  content: string;
  timestamp?: string;
};

export type ErrorMap = { field: string; message: string };
