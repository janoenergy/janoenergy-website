export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPhone(phone: string): boolean {
  return /^1[3-9]\d{9}$/.test(phone);
}

export function isRequired(value: string): boolean {
  return value.trim().length > 0;
}

export function minLength(value: string, length: number): boolean {
  return value.length >= length;
}

export function maxLength(value: string, length: number): boolean {
  return value.length <= length;
}
