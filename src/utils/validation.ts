export const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isValidPAN = (pan: string) => /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan.toUpperCase());

export const isValidGSTIN = (gstin: string) =>
  /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(gstin.toUpperCase());

export const isValidPIN = (pin: string) => /^[1-9][0-9]{5}$/.test(pin);

export const isPositiveAmount = (amount: number | "") => typeof amount === "number" && amount > 0;

export const isValidDate = (date: string) => {
  const d = new Date(date);
  return !isNaN(d.getTime()) && date.length === 10;
};
