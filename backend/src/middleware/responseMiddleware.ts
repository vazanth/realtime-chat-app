import { NextFunction, Request, Response } from 'express';
import { CustomResponse } from '../types';
import { commonResponseMessages } from '../data/constants';
import AppResponse from '../helpers/AppResponse';

const sendResponse = (result: CustomResponse, res: Response) => {
  if (result?.isOperational) {
    const statusCode: number = Number(result?.statusCode);
    // Trusted resultors that we know
    res.status(statusCode).json({
      status: result.status,
      message: result.message,
      data: result.data,
    });
  } else {
    res.status(500).json({
      // Unknown errors
      status: 'error',
      message: 'Something Went Wrong!!',
    });
  }
};

const handleJWTError = () =>
  new AppResponse(commonResponseMessages.INVALID_TOKEN);

const handleJWTExpiredError = () =>
  new AppResponse(commonResponseMessages.EXPIRED_TOKEN);

const responseMiddleware = (
  result: CustomResponse,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let response = result;
  if (response instanceof AppResponse) {
    sendResponse(response, res);
    return;
  }
  if (result?.message === 'jwt expired') {
    response = handleJWTExpiredError();
  }
  if (
    result?.message === 'invalid token' ||
    result?.message === 'invalid signature'
  ) {
    response = handleJWTError();
  }

  sendResponse(response, res);
};

export default responseMiddleware;
