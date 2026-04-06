import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { formatTime } from '../../src/utils';
import { getCurrentLanguage } from '../../src/services/i18n';

// Mock i18n module
vi.mock('../../src/services/i18n', () => ({
  getCurrentLanguage: vi.fn(() => 'en'),
}));

describe('formatTime', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-01-15T12:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('formats seconds correctly', () => {
    const date = new Date('2024-01-15T11:59:30Z'); // 30 seconds ago
    expect(formatTime(date)).toMatch(/30.*second/);
  });

  it('formats minutes correctly', () => {
    const date = new Date('2024-01-15T11:45:00Z'); // 15 minutes ago
    expect(formatTime(date)).toMatch(/15.*minute/);
  });

  it('formats hours correctly', () => {
    const date = new Date('2024-01-15T06:00:00Z'); // 6 hours ago
    expect(formatTime(date)).toMatch(/6.*hour/);
  });

  it('formats days correctly', () => {
    const date = new Date('2024-01-10T12:00:00Z'); // 5 days ago
    expect(formatTime(date)).toMatch(/5.*day/);
  });

  it('handles future dates gracefully', () => {
    // For future dates, diff is negative. Intl.RelativeTimeFormat with numeric: 'auto'
    // returns "in X days" format. Just verify it returns a non-empty string.
    const date = new Date('2024-01-20T12:00:00Z'); // Future
    const result = formatTime(date);
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });
});

describe('formatTime edge cases', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-01-15T12:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('handles invalid dates', () => {
    const invalidDate = new Date('invalid');
    const result = formatTime(invalidDate);
    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
  });
});
