import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export function formatNumber(value?: number | bigint) {
  if (typeof value === 'undefined') {
    return '';
  }

  return Intl.NumberFormat('en-US').format(value);
}

export function formatAbbreviate(value?: number | bigint) {
  if (!value) {
    return '0';
  }

  return Intl.NumberFormat('en-US', { notation: 'compact' }).format(value);
}

export function formatTimestamp(timestamp?: number | string, withTime = false) {
  if (!timestamp) {
    return '';
  }

  const date = dayjs(timestamp);
  if (withTime) {
    return date.format('MMM DD, YYYY hh:mm A');
  }

  return date.format('MMM DD, YYYY');
}

export function formatRelativeTimestamp(
  timestamp?: number | string,
  withTime = false,
) {
  if (!timestamp) {
    return '';
  }

  const date = dayjs(timestamp);

  const now = dayjs();

  const diff = now.diff(date, 'day', false);

  if (diff < 7) {
    return date.fromNow();
  }

  const df = 'MMM DD, YYYY';
  // const df = now.isSame(date, 'year') ? 'MMM DD' : 'MMM DD, YYYY';

  if (withTime) {
    return date.format(`${df} hh:mm A`);
  }

  return date.format(df);
}

export function wordPerMinute(wordCount: number) {
  const averageWordPerMinute = 200;
  const wpm = (wordCount * 60) / averageWordPerMinute;
  return Math.round(wpm / 60);
}

export function pluralize(
  count: number | bigint,
  label: string,
  plural?: string,
) {
  if (count > 1) {
    return `${formatNumber(count)} ${plural ? plural : label + 's'}`;
  }

  return `${formatNumber(count)} ${label}`;
}

export function generateRandomRGB() {
  const randomBetween = (min: number, max: number) => {
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  const r = randomBetween(0, 255);
  const g = randomBetween(0, 255);
  const b = randomBetween(0, 255);
  return `rgb(${r},${g},${b})`;
}
