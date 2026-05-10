import axios from 'axios';

export const GAS_URL = "https://script.google.com/macros/s/AKfycbx686vcsGSqDlrFwvTZj8yJ879f3hASos6lDMa4e8gY5ExgfnNsbcEgs4WmAWZoWALh/exec";

export const api = axios.create({
  baseURL: GAS_URL,
  headers: {
    'Content-Type': 'text/plain;charset=utf-8',
  },
});

export const getFromGAS = async (action: string, params: Record<string, string> = {}) => {
  const queryParams = new URLSearchParams({ action, ...params }).toString();
  const response = await fetch(`${GAS_URL}?${queryParams}`);
  return await response.json();
};

export const postToGAS = async (action: string, data: any) => {
  // Use fetch with no-cors for simple POST to GAS to avoid preflight issues if needed,
  // or use the standard api (axios) which is already configured.
  // The GAS script must handle the action and data appropriately.
  try {
    const response = await fetch(GAS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: JSON.stringify({ action, ...data }),
    });
    return { success: true, status: 'success' };
  } catch (error) {
    console.error('GAS Post Error:', error);
    throw error;
  }
};
