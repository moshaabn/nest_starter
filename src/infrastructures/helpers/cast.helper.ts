import Decimal from 'decimal.js';

interface ToNumberOptions {
  default?: number;
  min?: number;
  max?: number;
}

export function toString(value: any): string {
  return value.toString() || '';
}

export function toLowerCase(value: string): string {
  return value.toLowerCase() || '';
}

export function trim(value: string): string {
  return value.trim();
}

export function toDate(value: string): Date {
  return new Date(value);
}

export function toBoolean(value: string): boolean {
  value = value.toLowerCase();

  return value === 'true' || value === '1' ? true : false;
}

export function toNumber(value: string, opts: ToNumberOptions = {}): number {
  let newValue: number = Number.parseInt(value || String(opts.default), 10);

  if (Number.isNaN(newValue)) {
    newValue = opts.default;
  }

  if (opts.min) {
    if (newValue < opts.min) {
      newValue = opts.min;
    }

    if (newValue > opts.max) {
      newValue = opts.max;
    }
  }

  return newValue;
}

// loop object attribute and convert any number string to number
export function toNumberObject(obj: any): any {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      // check if string is a number
      if (typeof value === 'string' && !Number.isNaN(Number(value))) {
        obj[key] = Number(value);
      }
    }
  }
  return obj;
}

export function decimalToString(value: Decimal, decimals = 2): string {
  return value?.toFixed(decimals);
}
