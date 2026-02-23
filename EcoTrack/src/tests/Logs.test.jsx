/**
 * Logs Component Tests
 * Testing list rendering, data display, and UI elements
 */
import { render, screen } from '@testing-library/react';
import Logs from '../pages/logs';

// Sample test data
const mockLogs = [
  { id: 1, activity: 'Car Travel', carbon: 4 },
  { id: 2, activity: 'Electricity Usage', carbon: 6 },
  { id: 3, activity: 'Cycling', carbon: 0 },
];

describe('Logs Component', () => {
  
  // Test: Rendering with data
  describe('Rendering with Data', () => {
    it('should render Logs component', () => {
      const { container } = render(<Logs logs={mockLogs} />);
      expect(container).toBeInTheDocument();
    });

    it('should render Activity Logs heading', () => {
      render(<Logs logs={mockLogs} />);
      expect(screen.getByText('Activity Logs')).toBeInTheDocument();
    });

    it('should render all log items', () => {
      render(<Logs logs={mockLogs} />);
      expect(screen.getByText('Car Travel')).toBeInTheDocument();
      expect(screen.getByText('Electricity Usage')).toBeInTheDocument();
      expect(screen.getByText('Cycling')).toBeInTheDocument();
    });

    it('should display carbon values for each log', () => {
      render(<Logs logs={mockLogs} />);
      expect(screen.getByText('4 carbon units')).toBeInTheDocument();
      expect(screen.getByText('6 carbon units')).toBeInTheDocument();
      expect(screen.getByText('0 carbon units')).toBeInTheDocument();
    });

    it('should display total logs count', () => {
      render(<Logs logs={mockLogs} />);
      expect(screen.getByText('Total logs: 3')).toBeInTheDocument();
    });
  });

  // Test: Rendering with empty data
  describe('Rendering with Empty Data', () => {
    it('should render empty list without errors', () => {
      const { container } = render(<Logs logs={[]} />);
      expect(container).toBeInTheDocument();
    });

    it('should display Total logs: 0 for empty array', () => {
      render(<Logs logs={[]} />);
      expect(screen.getByText('Total logs: 0')).toBeInTheDocument();
    });
  });

  // Test: Using findBy queries (async testing)
  describe('Async Testing with findBy', () => {
    it('should find element using findByText', async () => {
      render(<Logs logs={mockLogs} />);
      const activity = await screen.findByText('Car Travel');
      expect(activity).toBeInTheDocument();
    });

    it('should find all activities using findAllByText', async () => {
      render(<Logs logs={mockLogs} />);
      const activities = await screen.findAllByText(/carbon units/);
      expect(activities).toHaveLength(3);
    });
  });

  // Test: DOM querying
  describe('DOM Querying', () => {
    it('should query element by text', () => {
      render(<Logs logs={mockLogs} />);
      const element = screen.queryByText('Non-existent');
      expect(element).not.toBeInTheDocument();
    });

    it('should get element by role', () => {
      render(<Logs logs={mockLogs} />);
      const list = screen.getByRole('list');
      expect(list).toBeInTheDocument();
    });

    it('should get elements by role', () => {
      render(<Logs logs={mockLogs} />);
      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toHaveLength(3);
    });
  });

  // Test: Snapshot
  describe('Snapshot Testing', () => {
    it('should match snapshot with mock data', () => {
      const { container } = render(<Logs logs={mockLogs} />);
      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with empty data', () => {
      const { container } = render(<Logs logs={[]} />);
      expect(container).toMatchSnapshot();
    });
  });
});

