import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import AppResponse from '../helpers/AppResponse';
import { extractValidationErrors } from '../helpers/parseSchemaError';
import { searchQuerySchema, signInSchema, signUpSchema } from '../schema/userSchema';
import { createChatSchema, createGroupSchema } from '../schema/chatSchema';
import { downloadFileSchema, fetchMessageSchema, sendMessageSchema } from '../schema/messageSchema';

function createValidationMiddleware(schema: z.ZodObject<any, any, any> | z.ZodString) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: unknown) {
      if (error instanceof Error) {
        const validationErrors = extractValidationErrors(error);
        next(new AppResponse(validationErrors, null, 400));
      }
    }
  };
}

export const validateSignUp = createValidationMiddleware(signUpSchema);
export const validateSignIn = createValidationMiddleware(signInSchema);
export const validateQuery = createValidationMiddleware(searchQuerySchema);
export const validateUserChat = createValidationMiddleware(createChatSchema);
export const validateGroupCreation = createValidationMiddleware(createGroupSchema);
export const validateFetchMessage = createValidationMiddleware(fetchMessageSchema);
export const validateSendMessage = createValidationMiddleware(sendMessageSchema);
export const validateDownloadFile = createValidationMiddleware(downloadFileSchema);
