import { useMemo } from 'react';
import { DEVICE_ID_KEY } from '@/constants/core';

function generateDeviceId(length = 16): string {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
}

export function useDeviceId(forceRenew?: boolean): string {
  return useMemo(() => {
    if (typeof window === 'undefined') return ''; // SSR protection

    if (forceRenew) {
      const newId = generateDeviceId();
      localStorage.setItem(DEVICE_ID_KEY, newId);

      return newId;
    }

    const existing = localStorage.getItem(DEVICE_ID_KEY);
    if (existing) return existing;

    const newId = generateDeviceId();
    localStorage.setItem(DEVICE_ID_KEY, newId);

    return newId;
  }, [forceRenew]);
}
