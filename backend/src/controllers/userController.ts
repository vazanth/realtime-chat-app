import { NextFunction, Request, Response } from 'express';
import * as argon2 from 'argon2';
import catchError from '../helpers/catchError';
import { readFile, writeFile } from '../helpers/fileOperations';
import { generateRandomId } from '../helpers/common';
import { commonResponseMessages } from '../data/constants';
import AppResponse from '../helpers/AppResponse';
import { CustomRequest, UserMap, UserModel } from '../types';
import { signToken } from './authController';

export const signUp = catchError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { fullname, email, password, username } = req.body;
    const userData: UserModel = await readFile();
    if (userData.users.find((user: UserMap) => user.email === email)) {
      throw new AppResponse(commonResponseMessages.EMAIL_EXIST);
    }
    const hashedPassword = await argon2.hash(password);

    const payload = {
      id: generateRandomId(21),
      fullname,
      email,
      username,
      password: hashedPassword,
    };

    userData.users.push(payload);
    await writeFile(JSON.stringify(userData));

    return next(
      new AppResponse(commonResponseMessages.REGISTERED_SUCCESSFULLY)
    );
  }
);

export const signIn = catchError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const userData: UserModel = await readFile();
    const user = userData.users.find(
      (userDetail: any) => userDetail.email === email
    );
    if (!user) {
      throw new AppResponse(commonResponseMessages.AUTH_INCORRECT);
    }
    const isPasswordMatch = await argon2.verify(user.password, password);
    if (!isPasswordMatch) {
      throw new AppResponse(commonResponseMessages.AUTH_INCORRECT);
    }
    signToken(user, res, next);
  }
);

export const fetchUsers = catchError(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const keyword = req.query.search;
    const userData = await readFile();

    if (!keyword) {
      return next(
        new AppResponse(
          commonResponseMessages.FETCHED_SUCCESSFULLY,
          userData.users
        )
      );
    }

    const users = userData.users.filter(
      (userDetail: any) =>
        userDetail.fullname.includes(keyword) && userDetail.id !== req.userId
    );

    if (users.length === 0) {
      throw new AppResponse(commonResponseMessages.NOT_FOUND);
    }

    return next(
      new AppResponse(commonResponseMessages.FETCHED_SUCCESSFULLY, users)
    );
  }
);
