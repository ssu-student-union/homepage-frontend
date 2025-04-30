import { z } from 'zod';

export const LoginSchemaRegister = z.object({
  name: z
    .string()
    .min(1, 'onboarding_validation.name_required')
    .max(50, 'onboarding_validation.name_max')
    .regex(/^[가-힣a-zA-Z]+$/, 'onboarding_validation.name_regex'),
  studentId: z
    .string()
    .length(8, 'onboarding_validation.studentId_length')
    .regex(/^\d+$/, 'onboarding_validation.studentId_regex'),
  memberCode: z.string(),
  majorCode: z.string(),
});

export const LoginSchemaScouncil = z.object({
  accountId: z
    .string()
    .min(5, 'onboarding_validation.accountId_min')
    .max(25, 'onboarding_validation.accountId_max')
    .regex(/^[a-zA-Z0-9]+$/, 'onboarding_validation.accountId_regex'),
  password: z.string().min(4, 'onboarding_validation.password_min'),
});

export const LoginSchemaCertify = z.object({
  name: z
    .string()
    .min(1, 'onboarding_validation.name_required')
    .max(10, 'onboarding_validation.name_max')
    .regex(/^[가-힣a-zA-Z]+$/, 'onboarding_validation.name_regex'),
  email: z.string().email('onboarding_validation.email_format').min(1, 'onboarding_validation.email_required'),
  id: z
    .string()
    .length(8, 'onboarding_validation.studentId_length')
    .regex(/^\d+$/, 'onboarding_validation.studentId_regex'),
  inquiry: z.string().min(1, 'onboarding_validation.inquiry_required'),
});

export type LoginType = z.infer<typeof LoginSchemaRegister>;
export type LoginCertifyType = z.infer<typeof LoginSchemaCertify>;
export type LoginScouncilType = z.infer<typeof LoginSchemaScouncil>;
