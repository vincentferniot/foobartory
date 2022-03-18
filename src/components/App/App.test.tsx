import { render, screen } from '@testing-library/react';
import App from '.';
import { MinerProvider } from 'contexts/miner';

// Helper function to render App within its context
function renderApp() {
  return render(
    <MinerProvider>
      <App />
    </MinerProvider>
  );
}

describe('App', () => {
  it('should render', async () => {
    renderApp();
    expect(screen.getByTestId('app')).toBeInTheDocument();
  });

  it('should render with Header', async () => {
    renderApp();
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('should render with 2 foobars at start', async () => {
    renderApp();
    expect(screen.getAllByTestId('foobar')).toHaveLength(2);
  });
});
