import { postToGAS } from './config';

export const CheckinService = {
  submitCheckin: (data: any) => postToGAS('submitCheckin', data),
};
