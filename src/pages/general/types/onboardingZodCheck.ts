import i18n from '@/translate/i18n';
import { z } from 'zod';

export const LoginSchemaRegister = z.object({
  name: z
    .string()
    .min(1, i18n.t('onboarding_validation.name_required'))
    .max(50, i18n.t('onboarding_validation.name_max'))
    .regex(/^[^!@#$%^&*()\-_=+[\]{};:'",.<>?/\\|`~]+$/, i18n.t('onboarding_validation.name_regex')),
  studentId: z
    .string()
    .length(8, i18n.t('onboarding_validation.studentId_length'))
    .regex(/^\d+$/, i18n.t('onboarding_validation.studentId_regex')),
  memberCode: z.string(),
  majorCode: z.string(),
});

export const LoginSchemaScoucil = z.object({
  accountId: z
    .string()
    .min(5, i18n.t('onboarding_validation.accountId_min'))
    .max(25, i18n.t('onboarding_validation.accountId_max'))
    .regex(/^[a-zA-Z0-9]+$/, i18n.t('onboarding_validation.accountId_regex')),
  password: z.string().min(4, i18n.t('onboarding_validation.password_min')),
});

export const LoginSchemaCertify = z.object({
  name: z
    .string()
    .min(1, i18n.t('onboarding_validation.name_required'))
    .max(10, i18n.t('onboarding_validation.name_max'))
    .regex(/^[가-힣a-zA-Z]+$/, i18n.t('onboarding_validation.name_regex')),
  email: z
    .string()
    .email(i18n.t('onboarding_validation.email_format'))
    .min(1, i18n.t('onboarding_validation.email_required')),
  id: z
    .string()
    .length(8, i18n.t('onboarding_validation.studentId_length'))
    .regex(/^\d+$/, i18n.t('onboarding_validation.studentId_regex')),
  inquiry: z.string().min(1, i18n.t('onboarding_validation.inquiry_required')),
});

export type LoginType = z.infer<typeof LoginSchemaRegister>;
export type LoginCertifyType = z.infer<typeof LoginSchemaCertify>;
export type LoginScoucilType = z.infer<typeof LoginSchemaScoucil>;
