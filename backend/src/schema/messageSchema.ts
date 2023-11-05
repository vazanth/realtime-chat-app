import { z } from 'zod';

export const fetchMessageSchema = z.object({
  chatId: z.string().trim().nonempty('chatId id is required'),
});

export const sendMessageSchema = z.object({
  sender: z.string().trim().nonempty('sender is required'),
  content: z.string().trim().nonempty('content is required'),
  id: z.string().trim().nonempty('id is required'),
});

export const downloadFileSchema = z.object({
  file_id: z.string().trim().nonempty('file id is required'),
});
