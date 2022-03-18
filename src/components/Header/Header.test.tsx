import { screen, fireEvent } from '@testing-library/react';
import { renderWithAllProviders, renderWithProvider } from 'helpers/tests';
import Header from '.';
import { MinerContext } from 'contexts/miner';

describe('Header', () => {
  it('should render', () => {
    renderWithAllProviders(Header);
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('should have display 0 foo and 0 bar', () => {
    renderWithAllProviders(Header);
    expect(screen.getByText('foo: 0')).toBeInTheDocument();
    expect(screen.getByText('bar: 0')).toBeInTheDocument();
  });
  
  it('should have build button disabled at first render', () => {
    renderWithAllProviders(Header);
    expect(screen.getByTestId('build-foobar')).toBeDisabled();
  });

  it('should have build button disabled with canBuildOrBuyFoobar returning false', () => {
    renderWithProvider(<Header />, { providerProps: { value: { canBuildOrBuyFoobar: () => false, state: {} }}}, MinerContext.Provider);
    expect(screen.getByTestId('build-foobar')).toBeDisabled();
  });

  it('should have build button enabled with canBuildOrBuyFoobar returning true', () => {
    renderWithProvider(<Header />, { providerProps: { value: { canBuildOrBuyFoobar: () => true, state: {} }}}, MinerContext.Provider);
    expect(screen.getByTestId('build-foobar')).toBeEnabled();
  });
});
