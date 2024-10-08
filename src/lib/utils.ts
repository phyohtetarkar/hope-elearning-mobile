import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export function formatNumber(value?: number | bigint) {
  if (typeof value === 'undefined') {
    return '';
  }

  return Intl.NumberFormat('en-US').format(value);
}

export function formatAbbreviate(value?: number) {
  if (!value) {
    return '0';
  }

  if (value < 1e3) {
    return formatNumber(value);
  } else if (value < 1e6) {
    return formatNumber(Math.floor(value / 1e2) / 10) + 'K'; // Formats thousands
  } else if (value < 1e9) {
    return formatNumber(Math.floor(value / 1e5) / 10) + 'M'; // Formats millions
  } else {
    return formatNumber(Math.floor(value / 1e8) / 10) + 'B'; // Formats billions
  }

  // return Intl.NumberFormat('en-US', { notation: 'compact' }).format(value);
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
  const result = Math.round(wpm / 60);
  return result > 0 ? result : 1;
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

export function uppercaseFirstChar(v?: string) {
  if (!v || v.length === 1) {
    return v;
  }

  return `${v[0].toUpperCase()}${v.substring(1)}`;
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

export function buildQueryParams(params: any) {
  if (typeof params !== 'object' || params instanceof Array) {
    return '';
  }

  let query = '';

  for (const p in params) {
    const value = params[p];
    if (value === undefined || value === null) {
      continue;
    }

    const delimiter = query.length > 0 ? '&' : '?';

    if (value instanceof Array) {
      query += delimiter + value.map(v => `${p}=${v}`).join('&');
    } else {
      query += delimiter + `${p}=${value}`;
    }
  }

  return query;
}
