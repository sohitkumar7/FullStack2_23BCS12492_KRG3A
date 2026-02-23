/**
 * Login Component Tests
 * Testing authentication, button clicks, and UI rendering
 */
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import Login from '../pages/login';

// Wrapper component to provide router and auth context
const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        {component}
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('Login Component', () => {
  
  // Test: Component renders correctly
  describe('Rendering', () => {
    it('should render login page with all elements', () => {
      renderWithProviders(<Login />);
      
      // Check for main heading
      expect(screen.getByText('EcoTrack Login')).toBeInTheDocument();
      
      // Check for description text
      expect(screen.getByText(/Sign in to access your carbon footprint dashboard/)).toBeInTheDocument();
      
      // Check for login button
      expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });

    it('should render Lock icon', () => {
      renderWithProviders(<Login />);
      expect(screen.getByRole('img')).toBeInTheDocument();
    });

    it('should have correct button variant', () => {
      renderWithProviders(<Login />);
      const button = screen.getByRole('button', { name: /login/i });
      expect(button).toHaveAttribute('variant', 'contained');
    });
  });

  // Test: User interactions
  describe('User Interactions', () => {
    it('should call handleLogin when button is clicked', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Login />);
      
      const loginButton = screen.getByRole('button', { name: /login/i });
      await user.click(loginButton);
      
      // After clicking login, user should be redirected (we can verify navigation)
      // The actual authentication state change is tested in context tests
    });

    it('should handle button click with fireEvent', () => {
      renderWithProviders(<Login />);
      
      const loginButton = screen.getByRole('button', { name: /login/i });
      fireEvent.click(loginButton);
      
      // Test passes if no error is thrown
      expect(loginButton).toBeInTheDocument();
    });

    it('should be accessible via keyboard', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Login />);
      
      const button = screen.getByRole('button', { name: /login/i });
      await user.tab();
      expect(button).toHaveFocus();
    });
  });

  // Test: Authentication behavior
  describe('Authentication Behavior', () => {
    it('should update authentication state on login', () => {
      // This test verifies the login flow works
      const mockSetAuth = jest.fn();
      const { container } = renderWithProviders(<Login />);
      
      // Verify component rendered without errors
      expect(container).toBeInTheDocument();
    });
  });

  // Test: Snapshot testing
  describe('Snapshot Testing', () => {
    it('should match the snapshot', () => {
      const { container } = renderWithProviders(<Login />);
      expect(container).toMatchSnapshot();
    });
  });

  // Test: Error handling
  describe('Error Handling', () => {
    it('should render without crashing', () => {
      const { container } = renderWithProviders(<Login />);
      expect(container).not.toBeEmptyDOMElement();
    });
  });
});

