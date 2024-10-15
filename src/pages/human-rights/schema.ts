import z from 'zod';

export type MockHumanRightsPerson = z.infer<typeof MockHumanRightsPersonSchema>;
export type MockHumanRightsReporter = z.infer<typeof MockHumanRightsReporterSchema>;
export type MockHumanRightsPostEditRequest = z.infer<typeof MockHumanRightsPostEditRequestSchema>;

export const MockHumanRightsPersonSchema = z.object({
  name: z.string().min(1),
  studentId: z.string().min(1).optional(),
  department: z.string().min(1).optional(),
});

export const MockHumanRightsReporterSchema = MockHumanRightsPersonSchema.required().extend({
  contact: z.string().min(1),
});

export const MockHumanRightsPostEditRequestSchema = z.object({
  postId: z.number().optional(),
  title: z.string().min(1),
  metadata: z.object({
    reporter: MockHumanRightsReporterSchema,
    victims: MockHumanRightsPersonSchema.array().min(1),
    invaders: MockHumanRightsPersonSchema.array().min(1),
  }),
  content: z.string().min(1),
  postFileList: z.number().array().default([]),
});
