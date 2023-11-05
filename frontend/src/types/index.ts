export type UserMap = {
  id: string;
  fullname: string;
  email: string;
  password: string;
  username: string;
};

export type ChatMap = {
  id: string;
  participantId: string[];
  participantName: string[];
  chatName?: string;
  isGroupChat: boolean;
};

export type MessageMap = {
  id: string;
  chatId: string;
  sender: string;
  content:
    | string
    | {
        filename: string;
        downloadUrl: string;
      };
  timestamp?: string;
};

export type ChildrenProp = {
  children: string | JSX.Element;
};
