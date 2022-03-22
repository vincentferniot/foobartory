import { screen } from '@testing-library/react';
import { renderWithAllProviders, renderWithProvider } from 'helpers/tests';
import Factory from '.';
import { MinerContext } from 'contexts/miner';

describe('Factory', () => {
  it('should render', () => {
    renderWithAllProviders(Factory);
    expect(screen.getByTestId('factory')).toBeInTheDocument();
  });

  it('should have message hidden with hasReachedMaxFoobars returning false', () => {
    renderWithProvider(
      <Factory />,
      {
        providerProps: {
          value: {
            hasReachedMaxFoobars: () => false,
          }
        }
      },
      MinerContext.Provider
    );
    expect(screen.queryByTestId('factory-message')).not.toBeInTheDocument();
  });

  it('should have message displayed with hasReachedMaxFoobars returning true', () => {
    renderWithProvider(
      <Factory />,
      {
        providerProps: {
          value: {
            hasReachedMaxFoobars: () => true,
          }
        }
      },
      MinerContext.Provider
    );
    expect(screen.getByTestId('factory-message')).toBeInTheDocument();
  });
});
