import { z } from 'zod';

export const createChatSchema = z.object({
  recipientId: z.string().trim().nonempty('recipient id is required'),
});

export const createGroupSchema = z.object({
  recipientId: z.array(z.string().trim().nonempty('recipient id is required')),
  groupName: z.string().trim().nonempty('group name id is required'),
});
