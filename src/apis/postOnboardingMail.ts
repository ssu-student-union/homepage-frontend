import { client } from '@/apis/client';

export const postOnboardingMail = (resBody: object) => {
  return client.post(`/onboarding/mail`, resBody, {});
};
