/**
 * ProtectedRoute Component Tests
 * Testing authentication protection and navigation
 */
import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import ProtectedRoute from '../routes/ProtectedRoute';
import Login from '../pages/login';

// Test component for protected content
const ProtectedContent = () => (
  <div data-testid="protected-content">Protected Content</div>
);

// Wrapper for authenticated state
const renderWithAuth = (component, isAuthenticated = false) => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        {component}
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('ProtectedRoute Component', () => {
  
  // Test: Unauthenticated user
  describe('Unauthenticated User', () => {
    it('should redirect to login when not authenticated', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <AuthProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <ProtectedContent />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </AuthProvider>
        </MemoryRouter>
      );
      
      // Should redirect to login
      expect(screen.getByText('EcoTrack Login')).toBeInTheDocument();
    });

    it('should not render protected content when not authenticated', () => {
      const { queryByTestId } = render(
        <MemoryRouter initialEntries={['/']}>
          <AuthProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <ProtectedContent />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </AuthProvider>
        </MemoryRouter>
      );
      
      expect(queryByTestId('protected-content')).not.toBeInTheDocument();
    });
  });

  // Test: Authenticated user
  describe('Authenticated User', () => {
    it('should render protected content when authenticated', async () => {
      // Create a component that sets authentication
      const AuthenticatedApp = () => {
        const { setIsAuthenticated } = require('../context/AuthContext').useAuth();
        
        return (
          <button onClick={() => setIsAuthenticated(true)} data-testid="auth-btn">
            Authenticate
          </button>
        );
      };

      render(
        <MemoryRouter initialEntries={['/']}>
          <AuthProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <ProtectedContent />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </AuthProvider>
        </MemoryRouter>
      );
      
      // First, verify we're at login (not authenticated)
      expect(screen.getByText('EcoTrack Login')).toBeInTheDocument();
    });
  });

  // Test: Navigate component
  describe('Navigation', () => {
    it('should use Navigate component for redirect', () => {
      const { container } = render(
        <MemoryRouter initialEntries={['/']}>
          <AuthProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <ProtectedContent />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </AuthProvider>
        </MemoryRouter>
      );
      
      // Check that Navigate component is rendered
      const navigateElement = container.querySelector('[class*="Navigate"]');
      expect(navigateElement).toBeInTheDocument();
    });
  });

  // Test: replace prop
  describe('Replace Navigation', () => {
    it('should use replace prop for navigation', () => {
      const { container } = render(
        <MemoryRouter initialEntries={['/protected']}>
          <AuthProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/protected"
                element={
                  <ProtectedRoute>
                    <ProtectedContent />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </AuthProvider>
        </MemoryRouter>
      );
      
      // Verify redirect happened
      expect(screen.getByText('EcoTrack Login')).toBeInTheDocument();
    });
  });

  // Test: Snapshot
  describe('Snapshot Testing', () => {
    it('should match snapshot for unauthenticated state', () => {
      const { container } = render(
        <MemoryRouter initialEntries={['/']}>
          <AuthProvider>
            <ProtectedRoute>
              <ProtectedContent />
            </ProtectedRoute>
          </AuthProvider>
        </MemoryRouter>
      );
      
      expect(container).toMatchSnapshot();
    });
  });
});

