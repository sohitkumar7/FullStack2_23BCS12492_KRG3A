/**
 * Header Component Tests
 * Testing navigation links, branding, and UI rendering
 */
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../components/Header';

// Wrapper for BrowserRouter
const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Header Component', () => {
  
  // Test: Component renders
  describe('Rendering', () => {
    it('should render the Header component', () => {
      const { container } = renderWithRouter(<Header />);
      expect(container).toBeInTheDocument();
    });

    it('should render EcoTrack branding', () => {
      renderWithRouter(<Header />);
      expect(screen.getByText('EcoTrack')).toBeInTheDocument();
    });

    it('should render the Nature icon', () => {
      renderWithRouter(<Header />);
      // MUI icons render as svg elements
      const icons = document.querySelectorAll('svg');
      expect(icons.length).toBeGreaterThan(0);
    });
  });

  // Test: Navigation links
  describe('Navigation Links', () => {
    it('should render Dashboard link', () => {
      renderWithRouter(<Header />);
      expect(screen.getByRole('link', { name: /dashboard/i })).toBeInTheDocument();
    });

    it('should render Login link', () => {
      renderWithRouter(<Header />);
      expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument();
    });

    it('should have correct href for Dashboard link', () => {
      renderWithRouter(<Header />);
      const dashboardLink = screen.getByRole('link', { name: /dashboard/i });
      expect(dashboardLink).toHaveAttribute('href', '/');
    });

    it('should have correct href for Login link', () => {
      renderWithRouter(<Header />);
      const loginLink = screen.getByRole('link', { name: /login/i });
      expect(loginLink).toHaveAttribute('href', '/login');
    });
  });

  // Test: AppBar component
  describe('AppBar Properties', () => {
    it('should have static position', () => {
      renderWithRouter(<Header />);
      const appBar = document.querySelector('[class*="MuiAppBar"]');
      expect(appBar).toHaveAttribute('position', 'static');
    });
  });

  // Test: Button elements
  describe('Buttons', () => {
    it('should render two buttons', () => {
      renderWithRouter(<Header />);
      const buttons = screen.getAllByRole('link');
      expect(buttons.length).toBe(2);
    });

    it('should have Dashboard and Login buttons', () => {
      renderWithRouter(<Header />);
      const buttons = screen.getAllByRole('link');
      const buttonTexts = buttons.map(btn => btn.textContent);
      expect(buttonTexts).toContain('Dashboard');
      expect(buttonTexts).toContain('Login');
    });
  });

  // Test: Snapshot
  describe('Snapshot Testing', () => {
    it('should match the snapshot', () => {
      const { container } = renderWithRouter(<Header />);
      expect(container).toMatchSnapshot();
    });
  });
});

