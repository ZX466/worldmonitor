import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { chunkArray, debounce, throttle, rafSchedule } from '../../src/utils';

describe('chunkArray', () => {
  it('splits array into chunks of specified size', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7];
    const chunks = chunkArray(arr, 3);
    expect(chunks).toEqual([[1, 2, 3], [4, 5, 6], [7]]);
  });

  it('handles empty arrays', () => {
    expect(chunkArray([], 5)).toEqual([]);
  });

  it('handles chunk size of 1', () => {
    const arr = [1, 2, 3];
    const chunks = chunkArray(arr, 1);
    expect(chunks).toEqual([[1], [2], [3]]);
  });

  it('handles chunk size larger than array', () => {
    const arr = [1, 2, 3];
    const chunks = chunkArray(arr, 10);
    expect(chunks).toEqual([[1, 2, 3]]);
  });

  it('ensures minimum chunk size of 1', () => {
    const arr = [1, 2, 3];
    const chunks = chunkArray(arr, 0);
    expect(chunks).toEqual([[1], [2], [3]]);
  });
});

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('delays function execution', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced();
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('only calls function once for rapid invocations', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced();
    debounced();
    debounced();

    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('passes arguments to the debounced function', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced('arg1', 'arg2');
    vi.advanceTimersByTime(100);

    expect(fn).toHaveBeenCalledWith('arg1', 'arg2');
  });
});

describe('throttle', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('limits function execution rate', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);

    throttled();
    expect(fn).toHaveBeenCalledTimes(1);

    throttled();
    throttled();
    expect(fn).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(100);
    throttled();
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('executes immediately on first call', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);

    throttled();
    expect(fn).toHaveBeenCalledTimes(1);
  });
});

describe('rafSchedule', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('schedules function for next animation frame', async () => {
    const fn = vi.fn();
    const scheduled = rafSchedule(fn);

    scheduled();
    expect(fn).not.toHaveBeenCalled();

    await vi.advanceTimersByTimeAsync(0);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('batches multiple rapid calls into single execution', async () => {
    const fn = vi.fn();
    const scheduled = rafSchedule(fn);

    scheduled('a');
    scheduled('b');
    scheduled('c');

    await vi.advanceTimersByTimeAsync(0);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('c'); // Last arguments
  });
});
