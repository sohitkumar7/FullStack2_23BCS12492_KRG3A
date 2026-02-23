/**
 * AuthContext Tests
 * Testing authentication state, provider, and useAuth hook
 */
import { render, screen, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '../context/AuthContext';
import React, { useState } from 'react';

// Test component to access auth context
const TestComponent = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [message, setMessage] = useState('');

  const handleLogin = () => {
    setIsAuthenticated(true);
    setMessage('Logged in');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setMessage('Logged out');
  };

  return (
    <div>
      <span data-testid="auth-status">
        {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
      </span>
      <button onClick={handleLogin} data-testid="login-btn">Login</button>
      <button onClick={handleLogout} data-testid="logout-btn">Logout</button>
      <span data-testid="message">{message}</span>
    </div>
  );
};

describe('AuthContext', () => {
  
  // Test: Initial state
  describe('Initial State', () => {
    it('should have isAuthenticated as false initially', () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
      
      expect(screen.getByTestId('auth-status')).toHaveTextContent('Not Authenticated');
    });
  });

  // Test: Login functionality
  describe('Login Functionality', () => {
    it('should update authentication state to true on login', async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
      
      const loginButton = screen.getByTestId('login-btn');
      
      await act(async () => {
        loginButton.click();
      });
      
      expect(screen.getByTestId('auth-status')).toHaveTextContent('Authenticated');
      expect(screen.getByTestId('message')).toHaveTextContent('Logged in');
    });

    it('should allow multiple state changes', async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
      
      const loginButton = screen.getByTestId('login-btn');
      const logoutButton = screen.getByTestId('logout-btn');
      
      // Login
      await act(async () => {
        loginButton.click();
      });
      expect(screen.getByTestId('auth-status')).toHaveTextContent('Authenticated');
      
      // Logout
      await act(async () => {
        logoutButton.click();
      });
      expect(screen.getByTestId('auth-status')).toHaveTextContent('Not Authenticated');
    });
  });

  // Test: Logout functionality
  describe('Logout Functionality', () => {
    it('should update authentication state to false on logout', async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
      
      // First login
      const loginButton = screen.getByTestId('login-btn');
      await act(async () => {
        loginButton.click();
      });
      
      // Then logout
      const logoutButton = screen.getByTestId('logout-btn');
      await act(async () => {
        logoutButton.click();
      });
      
      expect(screen.getByTestId('auth-status')).toHaveTextContent('Not Authenticated');
      expect(screen.getByTestId('message')).toHaveTextContent('Logged out');
    });
  });

  // Test: useAuth hook
  describe('useAuth Hook', () => {
    it('should provide auth context to child components', () => {
      const { isAuthenticated } = useAuth();
      
      // This test verifies that useAuth can be called within AuthProvider
      expect(isAuthenticated).toBeDefined();
    });

    it('should throw error when useAuth is used outside provider', () => {
      // Suppress console.error for this test
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      expect(() => {
        render(<TestComponent />);
      }).toThrow('useAuth must be used within an AuthProvider');
      
      consoleSpy.mockRestore();
    });
  });

  // Test: Context value
  describe('Context Value', () => {
    it('should provide setIsAuthenticated function', () => {
      const TestComponent2 = () => {
        const { setIsAuthenticated } = useAuth();
        return (
          <button onClick={() => setIsAuthenticated(true)}>Set Auth</button>
        );
      };

      render(
        <AuthProvider>
          <TestComponent2 />
        </AuthProvider>
      );

      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });
});

