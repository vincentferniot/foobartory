import { screen, fireEvent } from '@testing-library/react';
import { renderWithAllProviders, renderWithProvider } from 'helpers/tests';
import Foobar from '.';
import { MinerContext } from 'contexts/miner';

describe('Foobar', () => {
  it('should render', () => {
    renderWithAllProviders(Foobar);
    expect(screen.getByTestId('foobar')).toBeInTheDocument();
  });

  it('should have 3 buttons', () => {
    renderWithAllProviders(Foobar);
    expect(screen.getAllByRole('button')).toHaveLength(3);
  });
  
  it('should have build button disabled at first render', () => {
    renderWithAllProviders(Foobar);
    expect(screen.getByTestId('build-foobar')).toBeDisabled();
  });

  it('should have build button disabled with canBuildOrBuyFoobar returning false', () => {
    renderWithProvider(<Foobar />, { providerProps: { value: { canBuildOrBuyFoobar: () => false }}}, MinerContext.Provider);
    expect(screen.getByTestId('build-foobar')).toBeDisabled();
  });

  it('should have build button enabled with canBuildOrBuyFoobar returning true', () => {
    renderWithProvider(<Foobar />, { providerProps: { value: { canBuildOrBuyFoobar: () => true }}}, MinerContext.Provider);
    expect(screen.getByTestId('build-foobar')).toBeEnabled();
  });

  it('should display `Transferring...` when click on foo button', async () => {
    renderWithAllProviders(Foobar);
    const button = screen.getByTestId('mine-foo');

    expect(screen.queryByText('Transferring...')).not.toBeInTheDocument();
    fireEvent.click(button);
    expect(screen.getByText('Transferring...')).toBeInTheDocument();
    
    // TODO: fix this test, simulate a timeout
    // expect(await screen.findByText('Transferring...')).not.toBeInTheDocument();
  });
});
