/**
 * DashboardSummary Component Tests
 * Testing carbon calculations, summary display, and UI rendering
 */
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import DashboardSummary from '../pages/dashboardSummary';

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

describe('DashboardSummary Component', () => {
  
  // Test: Rendering
  describe('Rendering', () => {
    it('should render DashboardSummary component', () => {
      const { container } = renderWithProviders(<DashboardSummary />);
      expect(container).toBeInTheDocument();
    });

    it('should render Summary Overview heading', () => {
      renderWithProviders(<DashboardSummary />);
      expect(screen.getByText('Summary Overview')).toBeInTheDocument();
    });
  });

  // Test: Carbon calculations
  describe('Carbon Calculations', () => {
    it('should calculate total carbon correctly', () => {
      renderWithProviders(<DashboardSummary />);
      // Total carbon: 4 + 6 + 0 = 10
      expect(screen.getByText('10')).toBeInTheDocument();
    });

    it('should display carbon units label', () => {
      renderWithProviders(<DashboardSummary />);
      expect(screen.getByText('carbon units')).toBeInTheDocument();
    });

    it('should calculate average carbon correctly', () => {
      renderWithProviders(<DashboardSummary />);
      // Average: 10/3 = 3.33
      expect(screen.getByText('3.33')).toBeInTheDocument();
    });

    it('should display average label', () => {
      renderWithProviders(<DashboardSummary />);
      expect(screen.getByText('per activity')).toBeInTheDocument();
    });

    it('should display total activities count', () => {
      renderWithProviders(<DashboardSummary />);
      expect(screen.getByText('3')).toBeInTheDocument();
      expect(screen.getByText('total entries')).toBeInTheDocument();
    });
  });

  // Test: Highest impact activity
  describe('Highest Impact Activity', () => {
    it('should identify highest carbon activity', () => {
      renderWithProviders(<DashboardSummary />);
      expect(screen.getByText(/Highest Impact: Electricity Usage/)).toBeInTheDocument();
    });

    it('should display correct carbon value for highest impact', () => {
      renderWithProviders(<DashboardSummary />);
      expect(screen.getByText(/\(6 units\)/)).toBeInTheDocument();
    });
  });

  // Test: Async testing with waitFor
  describe('Async Testing with waitFor', () => {
    it('should wait for content to be rendered', async () => {
      const { container } = renderWithProviders(<DashboardSummary />);
      
      await waitFor(() => {
        expect(container.querySelector('[class*="MuiCard"]')).toBeInTheDocument();
      });
    });

    it('should wait for specific text using findBy', async () => {
      renderWithProviders(<DashboardSummary />);
      const totalCarbon = await screen.findByText('10');
      expect(totalCarbon).toBeInTheDocument();
    });
  });

  // Test: Logs component rendering
  describe('Logs Component Integration', () => {
    it('should render Activity Logs section', () => {
      renderWithProviders(<DashboardSummary />);
      expect(screen.getByText('Activity Logs')).toBeInTheDocument();
    });

    it('should render all log entries', () => {
      renderWithProviders(<DashboardSummary />);
      expect(screen.getByText('Car Travel')).toBeInTheDocument();
      expect(screen.getByText('Electricity Usage')).toBeInTheDocument();
      expect(screen.getByText('Cycling')).toBeInTheDocument();
    });
  });

  // Test: Snapshot
  describe('Snapshot Testing', () => {
    it('should match the snapshot', () => {
      const { container } = renderWithProviders(<DashboardSummary />);
      expect(container).toMatchSnapshot();
    });
  });
});

