import z from 'zod';

export const LoginSchemaRegister = z.object({
  name:
    z
      .string()
      .min(1, '이름을 입력해주세요')
      .max(10, '이름은 10자 이내여야 합니다.')
      .regex(/^[가-힣]+$/, '이름은 한글만 입력해야 합니다.') || undefined,
  studentId:
    z.string().length(8, '학번은 8자리여야 합니다.').regex(/^\d+$/, '학번은 숫자만 입력해야 합니다.') || undefined,
  memberCode: z.string(),
  majorCode: z.string(),
});

export const LoginSchemaScoucil = z.object({
  accountId: z
    .string()
    .min(5, '아이디는 최소 5자 이상이어야 합니다.')
    .max(25, '아이디는 최대 25자 이내여야 합니다.')
    .regex(/^[a-zA-Z0-9]+$/, '아이디는 알파벳과 숫자만 포함해야 합니다.'),
  password: z.string().min(4, '비밀번호는 최소 4자 이상이어야 합니다.'),
});

export const LoginSchemaCertify = z.object({
  name: z
    .string()
    .min(1, '이름을 입력해주세요')
    .max(10, '이름은 10자 이내여야 합니다.')
    .regex(/^[가-힣]+$/, '이름은 한글만 입력해야 합니다.'),
  email: z.string().email('올바른 이메일 형식이 아닙니다.').min(1, '이메일을 입력해주세요'),
  id: z.string().length(8, '학번 8자리를 입력해주세요').regex(/^\d+$/, '학번은 숫자만 입력해야 합니다.'),
  inquiry: z.string().min(1, '문의내용을 입력해주세요'),
});

export type LoginType = z.infer<typeof LoginSchemaRegister>;
export type LoginCertifyType = z.infer<typeof LoginSchemaCertify>;
export type LoginScoucilType = z.infer<typeof LoginSchemaScoucil>;
