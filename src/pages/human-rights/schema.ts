import z from 'zod';

export type MockHumanRightsPerson = z.infer<typeof MockHumanRightsPersonSchema>;
export type MockHumanRightsReporter = z.infer<typeof MockHumanRightsReporterSchema>;
export type MockHumanRightsPostEditRequest = z.infer<typeof MockHumanRightsPostEditRequestSchema>;

export const MockHumanRightsPersonSchema = z.object({
  name: z.string(),
  studentId: z.string().optional(),
  department: z.string().optional(),
});

export const MockHumanRightsReporterSchema = MockHumanRightsPersonSchema.required().extend({
  contact: z.string(),
});

export const MockHumanRightsPostEditRequestSchema = z.object({
  postId: z.number(),
  studentId: z.string(),
  authorName: z.string(),
  title: z.string(),
  metadata: z.object({
    reporter: MockHumanRightsReporterSchema,
    victims: MockHumanRightsPersonSchema.array(),
    invaders: MockHumanRightsPersonSchema.array(),
  }),
  content: z.string(),
  createdAt: z.string().date(),
  lastEditedAt: z.string().date().nullable(),
  postFileList: z.number().array(),
});
