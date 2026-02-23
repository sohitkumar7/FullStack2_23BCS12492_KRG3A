/**
 * Unit Tests for Utility Functions
 * Testing carbon calculations and data validation
 */
import { logs } from '../data/logs';

// Test Suite: Carbon Calculation Functions
describe('Carbon Calculation Utilities', () => {
  
  // Test: Calculate total carbon from logs
  describe('calculateTotalCarbon', () => {
    const calculateTotalCarbon = (logs) => {
      return logs.reduce((sum, log) => sum + log.carbon, 0);
    };

    it('should calculate total carbon correctly', () => {
      const result = calculateTotalCarbon(logs);
      expect(result).toBe(10); // 4 + 6 + 0 = 10
    });

    it('should return 0 for empty logs array', () => {
      const result = calculateTotalCarbon([]);
      expect(result).toBe(0);
    });

    it('should handle single log entry', () => {
      const singleLog = [{ id: 1, activity: 'Test', carbon: 5 }];
      const result = calculateTotalCarbon(singleLog);
      expect(result).toBe(5);
    });

    it('should handle negative carbon values', () => {
      const negativeLogs = [{ id: 1, activity: 'Test', carbon: -5 }];
      const result = calculateTotalCarbon(negativeLogs);
      expect(result).toBe(-5);
    });
  });

  // Test: Calculate average carbon
  describe('calculateAverageCarbon', () => {
    const calculateAverageCarbon = (logs) => {
      if (logs.length === 0) return 0;
      const total = logs.reduce((sum, log) => sum + log.carbon, 0);
      return (total / logs.length).toFixed(2);
    };

    it('should calculate average carbon correctly', () => {
      const result = calculateAverageCarbon(logs);
      expect(result).toBe('3.33'); // 10/3 = 3.33...
    });

    it('should return 0 for empty logs array', () => {
      const result = calculateAverageCarbon([]);
      expect(result).toBe(0);
    });

    it('should handle single entry', () => {
      const singleLog = [{ id: 1, activity: 'Test', carbon: 10 }];
      const result = calculateAverageCarbon(singleLog);
      expect(result).toBe('10.00');
    });
  });

  // Test: Find highest carbon activity
  describe('findHighestCarbonActivity', () => {
    const findHighestCarbonActivity = (logs) => {
      if (logs.length === 0) return null;
      return logs.reduce((max, log) => (log.carbon > max.carbon ? log : max), logs[0]);
    };

    it('should find the activity with highest carbon', () => {
      const result = findHighestCarbonActivity(logs);
      expect(result.activity).toBe('Electricity Usage');
      expect(result.carbon).toBe(6);
    });

    it('should return null for empty logs', () => {
      const result = findHighestCarbonActivity([]);
      expect(result).toBeNull();
    });

    it('should handle logs with same carbon values', () => {
      const sameLogs = [
        { id: 1, activity: 'A', carbon: 5 },
        { id: 2, activity: 'B', carbon: 5 }
      ];
      const result = findHighestCarbonActivity(sameLogs);
      expect(result.carbon).toBe(5);
    });
  });

  // Test: Filter logs by carbon threshold
  describe('filterByCarbonThreshold', () => {
    const filterByCarbonThreshold = (logs, threshold) => {
      return logs.filter(log => log.carbon >= threshold);
    };

    it('should filter high impact activities (>=5)', () => {
      const result = filterByCarbonThreshold(logs, 5);
      expect(result).toHaveLength(1);
      expect(result[0].activity).toBe('Electricity Usage');
    });

    it('should filter low impact activities (=0)', () => {
      const result = filterByCarbonThreshold(logs, 0);
      expect(result).toHaveLength(3); // All have carbon >= 0
    });

    it('should return empty array when no matches', () => {
      const result = filterByCarbonThreshold(logs, 100);
      expect(result).toHaveLength(0);
    });
  });

  // Test: Data validation
  describe('validateLogData', () => {
    const validateLogData = (log) => {
      const errors = [];
      
      if (!log.id) errors.push('ID is required');
      if (!log.activity || typeof log.activity !== 'string') errors.push('Activity must be a string');
      if (typeof log.carbon !== 'number') errors.push('Carbon must be a number');
      if (log.carbon < 0) errors.push('Carbon cannot be negative');
      
      return {
        isValid: errors.length === 0,
        errors
      };
    };

    it('should validate correct log data', () => {
      const validLog = { id: 1, activity: 'Test', carbon: 5 };
      const result = validateLogData(validLog);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should detect missing ID', () => {
      const logWithoutId = { activity: 'Test', carbon: 5 };
      const result = validateLogData(logWithoutId);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('ID is required');
    });

    it('should detect missing activity', () => {
      const logWithoutActivity = { id: 1, carbon: 5 };
      const result = validateLogData(logWithoutActivity);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Activity must be a string');
    });

    it('should detect negative carbon', () => {
      const logWithNegative = { id: 1, activity: 'Test', carbon: -5 };
      const result = validateLogData(logWithNegative);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Carbon cannot be negative');
    });
  });

  // Test: Calculate carbon percentage
  describe('calculateCarbonPercentage', () => {
    const calculateCarbonPercentage = (log, totalCarbon) => {
      if (totalCarbon === 0) return 0;
      return ((log.carbon / totalCarbon) * 100).toFixed(1);
    };

    it('should calculate percentage correctly', () => {
      const result = calculateCarbonPercentage(logs[1], 10); // 6/10 = 60%
      expect(result).toBe('60.0');
    });

    it('should return 0 when total is 0', () => {
      const result = calculateCarbonPercentage({ carbon: 5 }, 0);
      expect(result).toBe(0);
    });
  });

  // Test: Jest matchers examples
  describe('Jest Matcher Examples', () => {
    it('demonstrates toBe matcher', () => {
      expect(5 + 5).toBe(10);
    });

    it('demonstrates toEqual matcher', () => {
      const obj = { name: 'test' };
      expect(obj).toEqual({ name: 'test' });
    });

    it('demonstrates toBeTruthy and toBeFalsy', () => {
      expect(true).toBeTruthy();
      expect(false).toBeFalsy();
      expect(0).toBeFalsy();
      expect(1).toBeTruthy();
    });

    it('demonstrates toContain matcher', () => {
      const fruits = ['apple', 'banana', 'orange'];
      expect(fruits).toContain('banana');
      expect(fruits).not.toContain('grape');
    });

    it('demonstrates toHaveLength matcher', () => {
      expect([1, 2, 3]).toHaveLength(3);
      expect('hello').toHaveLength(5);
    });

    it('demonstrates toThrow matcher', () => {
      const throwError = () => {
        throw new Error('Test error');
      };
      expect(throwError).toThrow('Test error');
    });

    it('demonstrates toBeGreaterThan and toBeLessThan', () => {
      expect(10).toBeGreaterThan(5);
      expect(5).toBeLessThan(10);
    });

    it('demonstrates array containing', () => {
      const users = [
        { name: 'John', age: 25 },
        { name: 'Jane', age: 30 }
      ];
      expect(users).toContainEqual({ name: 'John', age: 25 });
    });
  });
});

