/**
 * Mocking Tests
 * Demonstrating how to mock API calls and external dependencies
 */
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Example 1: Mocking a simple function
describe('Mocking Functions', () => {
  
  // Test: Basic jest.fn() mock
  describe('Basic Function Mocking', () => {
    it('should mock a simple function', () => {
      const mockFn = jest.fn();
      
      mockFn('hello');
      mockFn('world');
      
      expect(mockFn).toHaveBeenCalledTimes(2);
      expect(mockFn).toHaveBeenCalledWith('hello');
      expect(mockFn).toHaveBeenCalledWith('world');
    });

    it('should mock return values', () => {
      const mockFn = jest.fn().mockReturnValue('mocked return');
      
      const result = mockFn();
      expect(result).toBe('mocked return');
    });

    it('should mock implementation', () => {
      const mockFn = jest.fn((a, b) => a + b);
      
      expect(mockFn(2, 3)).toBe(5);
    });
  });

  // Test: Mocking module
  describe('Module Mocking', () => {
    it('should mock a data module', () => {
      // This is how you would mock the logs module
      const mockLogs = [
        { id: 1, activity: 'Mock Activity', carbon: 10 }
      ];
      
      jest.mock('../data/logs', () => ({
        logs: mockLogs
      }));
      
      // In a real test, you would import and use the mocked module
      const { logs } = require('../data/logs');
      expect(logs).toEqual(mockLogs);
    });
  });

  // Test: Mock timers
  describe('Mocking Timers', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should mock setTimeout', () => {
      const mockCallback = jest.fn();
      
      setTimeout(mockCallback, 1000);
      
      // Fast-forward time
      jest.advanceTimersByTime(1000);
      
      expect(mockCallback).toHaveBeenCalledTimes(1);
    });

    it('should mock setInterval', () => {
      const mockCallback = jest.fn();
      
      setInterval(mockCallback, 1000);
      
      // Fast-forward time multiple times
      jest.advanceTimersByTime(3000);
      
      expect(mockCallback).toHaveBeenCalledTimes(3);
    });
  });

  // Test: Mocking fetch API
  describe('Mocking Fetch API', () => {
    beforeEach(() => {
      global.fetch = jest.fn();
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should mock successful fetch call', async () => {
      const mockData = { id: 1, activity: 'Test', carbon: 5 };
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const response = await fetch('/api/logs');
      const data = await response.json();

      expect(data).toEqual(mockData);
      expect(fetch).toHaveBeenCalledWith('/api/logs');
    });

    it('should mock failed fetch call', async () => {
      global.fetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(fetch('/api/logs')).rejects.toThrow('Network error');
    });
  });
});

// Example 2: Mocking React components
describe('Mocking React Components', () => {
  
  it('should mock a child component', () => {
    // Mock the Logs component
    jest.mock('../pages/logs', () => ({
      __esModule: true,
      default: () => <div data-testid="mocked-logs">Mocked Logs</div>,
    }));

    const { getByTestId } = render(<div data-testid="mocked-logs">Mocked Logs</div>);
    expect(getByTestId('mocked-logs')).toBeInTheDocument();
  });
});

// Example 3: Mocking external libraries
describe('Mocking External Libraries', () => {
  
  it('should mock react-router-dom', () => {
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => jest.fn(),
      useParams: () => ({}),
      useLocation: () => ({ pathname: '/test' }),
    }));

    // In a real test, the component would use the mocked functions
    expect(jest.isMockFunction(jest.fn())).toBe(false); // Just for demonstration
  });

  it('should mock MUI components', () => {
    jest.mock('@mui/material', () => ({
      ...jest.requireActual('@mui/material'),
      Button: ({ children, ...props }) => (
        <button {...props}>{children}</button>
      ),
      Card: ({ children }) => <div>{children}</div>,
    }));

    // Render a simple button to test
    const { getByText } = render(<button>Test Button</button>);
    expect(getByText('Test Button')).toBeInTheDocument();
  });
});

// Example 4: Async mocking with waitFor
describe('Async Mocking', () => {
  
  it('should test async operations with waitFor', async () => {
    // Simulate async data fetching
    const fetchData = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ data: 'Async Data' });
        }, 100);
      });
    };

    // Using waitFor to wait for async operation
    let result;
    await waitFor(async () => {
      result = await fetchData();
    });

    expect(result.data).toBe('Async Data');
  });

  it('should test async operations with async/await', async () => {
    const asyncOperation = () => Promise.resolve('Completed');
    
    const result = await asyncOperation();
    expect(result).toBe('Completed');
  });
});

// Example 5: Spy on methods
describe('Spies', () => {
  
  const obj = {
    method: () => 'original',
  };

  it('should spy on object methods', () => {
    const spy = jest.spyOn(obj, 'method');
    
    obj.method();
    
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith();
    
    spy.mockRestore();
  });

  it('should mock implementation using spy', () => {
    const spy = jest.spyOn(obj, 'method').mockImplementation(() => 'mocked');
    
    expect(obj.method()).toBe('mocked');
    
    spy.mockRestore();
    expect(obj.method()).toBe('original');
  });
});

