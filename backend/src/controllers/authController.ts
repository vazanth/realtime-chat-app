import { NextFunction, Request, Response } from 'express';
import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import AppResponse from '../helpers/AppResponse';
import catchError from '../helpers/catchError';
import { readFile } from '../helpers/fileOperations';
import { commonResponseMessages } from '../data/constants';
import { CustomRequest, JwtPayload, UserModel } from '../types';

const { JWT_EXPIRES_IN, JWT_SECRET_KEY } = config;

const signToken = (user: any, res: Response, next: NextFunction) => {
  if (JWT_SECRET_KEY) {
    const token = jwt.sign(user, JWT_SECRET_KEY, {
      expiresIn: JWT_EXPIRES_IN,
    });
    // eslint-disable-next-line no-unused-vars
    const { password: _password, ...rest } = user;
    const successResponse = new AppResponse(
      commonResponseMessages.CREATED_SUCCESSFULLY,
      {
        ...rest,
        token,
      }
    );

    return next(successResponse);
  }
};

const verifyToken = catchError(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    if (!req?.headers?.authorization?.startsWith('Bearer')) {
      return next(new AppResponse(commonResponseMessages.NOT_LOGGED_IN));
    }
    const [, token] = req.headers.authorization.split(' ');

    // verify token signature
    if (JWT_SECRET_KEY) {
      const decodeToken = jwt.verify(token, JWT_SECRET_KEY) as JwtPayload;

      const userData: UserModel = await readFile();
      const currentUser = userData.users.find(
        (user: any) => user.id === decodeToken?.id
      );

      if (!currentUser) {
        return next(new AppResponse(commonResponseMessages.NOT_FOUND));
      }

      req.user = currentUser;
      req.userId = currentUser.id;
      next();
    }
  }
);

export { signToken, verifyToken };
