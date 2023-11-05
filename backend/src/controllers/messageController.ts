import { NextFunction, Request, RequestHandler, Response } from 'express';
import path from 'path';
import catchError from '../helpers/catchError';
import AppResponse from '../helpers/AppResponse';
import { readFile, writeFile } from '../helpers/fileOperations';
import { ChatModel, CustomRequest, MessageMap } from '../types';
import { commonResponseMessages } from '../data/constants';
import { generateRandomId } from '../helpers/common';
import { io } from '../server';

const chatPath = path.join(__dirname, '..', 'data', 'chat.json');

const downloadUrl = path.join(__dirname, '..', 'upload');

export const fetchMessage = catchError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { chatId } = req.params;
    const chatData: ChatModel = await readFile(chatPath);

    const chatIndex = chatData.chats.findIndex((chat) => chat.id === chatId);

    const conversation = chatData.chats[chatIndex].messages;

    if (conversation.length === 0) {
      return next(new AppResponse(commonResponseMessages.NO_DATA_FOUND));
    }
    return next(
      new AppResponse(commonResponseMessages.FETCHED_SUCCESSFULLY, conversation)
    );
  }
);

export const sendMessage = catchError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { sender, content, id } = req.body as MessageMap;

    const payload: MessageMap = {
      id: generateRandomId(21),
      sender,
      content,
      timestamp: new Date().toISOString(),
    };

    const chatData: ChatModel = await readFile(chatPath);

    const chatIndex = chatData.chats.findIndex((chat) => chat.id === id);

    chatData.chats[chatIndex].messages.push(payload);

    await writeFile(JSON.stringify(chatData), chatPath);

    return next(new AppResponse(commonResponseMessages.CREATED_SUCCESSFULLY));
  }
);

export const uploadFile = catchError(
  (req: CustomRequest, res: Response, next: NextFunction) => {
    io.emit('privateMessage', {
      id: generateRandomId(21),
      sender: req.user?.username,
      content: {
        filename: req.file?.filename,
      },
      timestamp: new Date().toISOString(),
    });
    return next(new AppResponse(commonResponseMessages.UPLOAD_SUCCESS));
  }
);

export const downloadFile = catchError(
  (req: CustomRequest, res: Response, next: NextFunction) => {
    const { file_id } = req.params;

    const requestedFile = `${downloadUrl}/${file_id}`;

    res.download(requestedFile, (err: Error) => {
      if (err) {
        return next(new AppResponse(commonResponseMessages.SERVER_ERROR));
      }
    });
  }
);
