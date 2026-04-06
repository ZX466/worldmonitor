import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getFeedScope, parseFeedScope, getPersistentFeedKey, isFeedOnCooldown } from '../../src/services/rss';
import { feedFailures } from '../../src/services/rss';

// Note: These tests require careful setup since rss.ts uses module-level state
// For full isolation, consider refactoring to dependency injection

describe('RSS Feed Utilities', () => {
  describe('getFeedScope', () => {
    it('combines feed name and language correctly', () => {
      expect(getFeedScope('BBC', 'en')).toBe('BBC::en');
    });

    it('handles different languages', () => {
      expect(getFeedScope('Al Jazeera', 'ar')).toBe('Al Jazeera::ar');
      expect(getFeedScope('Al Jazeera', 'zh')).toBe('Al Jazeera::zh');
    });
  });

  describe('parseFeedScope', () => {
    it('parses scoped feed correctly', () => {
      const result = parseFeedScope('BBC::en');
      expect(result.feedName).toBe('BBC');
      expect(result.lang).toBe('en');
    });

    it('defaults to English for unscoped feeds', () => {
      const result = parseFeedScope('CNN');
      expect(result.feedName).toBe('CNN');
      expect(result.lang).toBe('en');
    });

    it('handles feed names with special characters', () => {
      const result = parseFeedScope('Tech::Crunch::en');
      expect(result.feedName).toBe('Tech::Crunch');
      expect(result.lang).toBe('en');
    });
  });

  describe('getPersistentFeedKey', () => {
    it('generates correct cache key format', () => {
      expect(getPersistentFeedKey('BBC::en')).toBe('feed:BBC::en');
      expect(getPersistentFeedKey('CNN')).toBe('feed:CNN');
    });
  });
});

describe('Feed Failure Tracking', () => {
  // Reset state before each test
  beforeEach(() => {
    feedFailures.clear();
  });

  it('tracks feed failure counts', () => {
    const state = feedFailures.get('test::en');
    // Initially undefined
    expect(state).toBeUndefined();
  });
});
