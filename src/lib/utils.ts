import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import axios, { AxiosError } from 'axios';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(fullname: string) {
  const words = fullname.trim().split(/\s+/);

  return words[0].slice(0, 2).toUpperCase();
}

interface ValueLabelOption {
  value: string;
  label: string;
}

interface ApiDataItem {
  [key: string]: unknown;
}

export function transformApiDataToSelectOptions(
  data: unknown,
  valueKey: string,
  labelKey: string,
): ValueLabelOption[] {
  // Early return with proper validation
  if (!Array.isArray(data) || data.length === 0) {
    return [];
  }

  return data
    .filter(
      (item): item is ApiDataItem =>
        typeof item === 'object' &&
        item !== null &&
        valueKey in item &&
        labelKey in item,
    )
    .map((item) => ({
      value: item[valueKey],
      label: item[labelKey],
    }))
    .filter(
      (item): item is ValueLabelOption =>
        (typeof item.value === 'string' || typeof item.value === 'number') &&
        typeof item.label === 'string' &&
        item.label.trim().length > 0, // Ensure label is not empty
    );
}

type ErrorResponse = {
  message?: string;
  [key: string]: unknown;
};

export function getErrorMessage(error: unknown): string {
  // Handle Axios error
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ErrorResponse>;

    // Retrieve message from response.data.message if available
    const message = axiosError.response?.data?.message;

    if (typeof message === 'string') return message;

    // Fallback to error.message
    return (
      axiosError.message || 'An error occurred while processing the request'
    );
  }

  // Handle standard Error
  if (error instanceof Error) {
    return error.message || 'An error occurred';
  }

  // Final fallback for unknown error
  return 'An unknown error occurred';
}

export function ucwords(str: string): string {
  // Convert the string to lowercase to ensure consistent capitalization, then split it into words
  return String(str)
    .toLowerCase()
    .split(' ')
    .map((word) => {
      // Capitalize the first letter of each word and concatenate it with the remaining characters
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' '); // Join the capitalized words back into a single string
}

/**
 * Converts a number into a Rupiah-formatted string.
 * @param {number | string} amount - The numeric value to be formatted.
 * @returns {string} - Rupiah-formatted string, e.g. "Rp 1.234.567".
 */
export function formatRupiah(amount: number | string): string {
  if (amount === null || amount === undefined || amount === '') {
    return 'Rp 0';
  }

  // Convert input to number if it is a string
  const numericAmount =
    typeof amount === 'string' ? parseFloat(amount) : amount;

  // Best practice: use Intl.NumberFormat for currency formatting.
  // This is a standard browser/Node.js API that handles localization correctly.
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0, // Do not display decimals
    maximumFractionDigits: 0,
  });

  return formatter.format(numericAmount);
}

export function uid() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
