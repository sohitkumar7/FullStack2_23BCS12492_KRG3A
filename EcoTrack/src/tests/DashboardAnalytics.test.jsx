/**
 * DashboardAnalytics Component Tests
 * Testing analytics calculations, data distribution, and UI rendering
 */
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import DashboardAnalutics from '../pages/DashboardAnalutics';

// Wrapper for providers
const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        {component}
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('DashboardAnalytics Component', () => {
  
  // Test: Rendering
  describe('Rendering', () => {
    it('should render DashboardAnalytics component', () => {
      const { container } = renderWithProviders(<DashboardAnalutics />);
      expect(container).toBeInTheDocument();
    });

    it('should render Analytics Overview heading', () => {
      renderWithProviders(<DashboardAnalutics />);
      expect(screen.getByText('Analytics Overview')).toBeInTheDocument();
    });
  });

  // Test: High impact activities
  describe('High Impact Activities', () => {
    it('should display high impact count', () => {
      renderWithProviders(<DashboardAnalutics />);
      // High impact: carbon >= 5 (Electricity Usage = 6)
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('(≥5 carbon units)')).toBeInTheDocument();
    });

    it('should display High Impact Activities label', () => {
      renderWithProviders(<DashboardAnalutics />);
      expect(screen.getByText('High Impact Activities')).toBeInTheDocument();
    });
  });

  // Test: Low impact activities
  describe('Low Impact Activities', () => {
    it('should display low impact count', () => {
      renderWithProviders(<DashboardAnalutics />);
      // Low impact: carbon === 0 (Cycling = 0)
      expect(screen.getAllByText('1')[0]).toBeInTheDocument();
      expect(screen.getByText('(0 carbon units)')).toBeInTheDocument();
    });

    it('should display Low Impact Activities label', () => {
      renderWithProviders(<DashboardAnalutics />);
      expect(screen.getByText('Low Impact Activities')).toBeInTheDocument();
    });
  });

  // Test: Carbon distribution
  describe('Carbon Distribution', () => {
    it('should render Carbon Distribution section', () => {
      renderWithProviders(<DashboardAnalutics />);
      expect(screen.getByText('Carbon Distribution')).toBeInTheDocument();
    });

    it('should display activity names with carbon values', () => {
      renderWithProviders(<DashboardAnalutics />);
      expect(screen.getByText(/Electricity Usage/)).toBeInTheDocument();
      expect(screen.getByText(/Car Travel/)).toBeInTheDocument();
    });

    it('should display percentage values', () => {
      renderWithProviders(<DashboardAnalutics />);
      // Electricity Usage: 6/10 = 60%
      expect(screen.getByText(/60%/)).toBeInTheDocument();
    });
  });

  // Test: Progress bars
  describe('Progress Bars', () => {
    it('should render LinearProgress components', () => {
      renderWithProviders(<DashboardAnalutics />);
      const progressBars = document.querySelectorAll('[class*="MuiLinearProgress"]');
      expect(progressBars.length).toBeGreaterThan(0);
    });
  });

  // Test: Alert for high carbon
  describe('Alert Display', () => {
    it('should not show alert when carbon is below threshold', () => {
      renderWithProviders(<DashboardAnalutics />);
      // Total carbon = 10, which is not > 10
      const alerts = screen.queryByRole('alert');
      // Alert should not be present (or we check the text)
      expect(alerts).not.toBeInTheDocument();
    });
  });

  // Test: Async testing
  describe('Async Testing', () => {
    it('should wait for analytics data to render', async () => {
      const { container } = renderWithProviders(<DashboardAnalutics />);
      
      await waitFor(() => {
        expect(container.querySelector('[class*="MuiCard"]')).toBeInTheDocument();
      });
    });

    it('should find content using findBy', async () => {
      renderWithProviders(<DashboardAnalutics />);
      const heading = await screen.findByText('Analytics Overview');
      expect(heading).toBeInTheDocument();
    });
  });

  // Test: Snapshot
  describe('Snapshot Testing', () => {
    it('should match the snapshot', () => {
      const { container } = renderWithProviders(<DashboardAnalutics />);
      expect(container).toMatchSnapshot();
    });
  });
});

