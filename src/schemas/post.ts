import { z } from 'zod';

export type FileResponse = z.infer<typeof FileResponseSchema>;

export const FileResponseSchema = z.object({
  fileName: z.string(),
  fileType: z.union([z.string(), z.literal('images'), z.literal('files')]),
  fileUrl: z.string(),
  postFileId: z.number().int(),
});
